import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Award, Download, Search, FileText, Filter } from 'lucide-react';
import API from '../services/api';

const StudentCornerPage = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Study Material'); // 'Study Material' | 'Timetable' | 'Result' | 'Download'
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    fetchMaterials();
  }, [activeCategory, selectedDept]);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/student/materials?category=${activeCategory}&department=${selectedDept}`);
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'Study Material', label: 'Study Materials & Notes', icon: BookOpen },
    { id: 'Timetable', label: 'Class & Exam Timetables', icon: Calendar },
    { id: 'Result', label: 'Exam Results & Marks', icon: Award },
    { id: 'Download', label: 'Forms & Circular Downloads', icon: Download }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Student Portal & Resources
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          Student Corner Resource Hub
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Access course lecture notes, class timetables, exam results, and administrative forms.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-bold">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Department Filter */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700/60 max-w-4xl mx-auto">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-500" /> Filter Department:
        </span>
        <div className="flex items-center gap-2">
          {['All', 'Computer Science', 'Electronics', 'Management'].map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                selectedDept === dept
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading resources...</div>
      ) : materials.length === 0 ? (
        <div className="py-16 text-center text-slate-500">No resources found in this section.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {materials.map(item => (
            <div
              key={item._id}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700/60 flex items-start justify-between gap-4 hover:shadow-xl transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase">
                    {item.department}
                  </span>
                  {item.semester && (
                    <span className="text-[10px] text-slate-400 font-semibold">• {item.semester}</span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                )}
                <div className="text-[10px] text-slate-400 pt-1">
                  Uploaded by: <b>{item.uploadedBy || 'Administration'}</b>
                </div>
              </div>

              {item.fileUrl && (
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors shrink-0"
                  title="Download Resource"
                >
                  <Download className="w-5 h-5" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCornerPage;
