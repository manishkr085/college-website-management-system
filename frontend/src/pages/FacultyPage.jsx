import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Phone, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import API from '../services/api';

const FacultyPage = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await API.get('/faculty');
      setFacultyList(res.data);
    } catch (err) {
      console.error('Error fetching faculty:', err);
    } finally {
      setLoading(false);
    }
  };

  const departments = ['All', 'Computer Science', 'Electronics & Communication', 'Management'];

  const filteredFaculty = facultyList.filter(f => {
    const matchesDept = selectedDept === 'All' || f.department === selectedDept;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" /> Academic Faculty Directory
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          Distinguished Educators & Industry Researchers
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Learn from world-class professors holding doctorates from premier international universities.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty name or research topic..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDept === dept
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Faculty Cards */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading faculty directory...</div>
      ) : filteredFaculty.length === 0 ? (
        <div className="py-16 text-center text-slate-500">No faculty members found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFaculty.map(f => (
            <div
              key={f._id}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between hover:shadow-2xl hover:border-blue-500/50 transition-all space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-blue-500/20 shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{f.name}</h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">{f.designation}</p>
                    <span className="inline-block px-2.5 py-0.5 mt-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                      {f.department}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-t border-b border-slate-100 dark:border-slate-700/40 py-3">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <GraduationCap className="w-4 h-4 text-purple-500 shrink-0" />
                    <span><b>Qualification:</b> {f.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Briefcase className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><b>Experience:</b> {f.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <BookOpen className="w-4 h-4 text-amber-500 shrink-0" />
                    <span><b>Specialization:</b> {f.specialization}</span>
                  </div>
                </div>

                {f.bio && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2">
                    "{f.bio}"
                  </p>
                )}
              </div>

              <div className="pt-2 text-xs flex flex-col gap-1 text-slate-500 dark:text-slate-400">
                <a href={`mailto:${f.email}`} className="flex items-center gap-2 hover:text-blue-600">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <span>{f.email}</span>
                </a>
                {f.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{f.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyPage;
