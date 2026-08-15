import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, Clock, CheckCircle, GraduationCap, X, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(c => {
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    const matchesDept = selectedDept === 'All' || c.department === selectedDept;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Academic Programs
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          Undergraduate & Postgraduate Degree Courses
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Industry-aligned curricula designed with hands-on research and technical mastery.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search course title or code..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Level:
          </span>
          {['All', 'UG', 'PG', 'Diploma'].map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === level
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading academic catalog...</div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center text-slate-500 dark:text-slate-400">
          No courses match your selected filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course._id}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between group hover:shadow-2xl hover:border-blue-500/50 transition-all"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                    {course.code}
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {course.level}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {course.department}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-slate-100 dark:border-slate-700/40">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Duration</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{course.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Annual Fee</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{course.fees}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCourseModal(course)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/70 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all text-center"
                  >
                    Course Details
                  </button>
                  <Link
                    to="/admissions"
                    className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all text-center"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Detail Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 max-w-2xl w-full rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="relative h-48 overflow-hidden shrink-0">
              <img src={activeCourseModal.image} alt={activeCourseModal.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setActiveCourseModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {activeCourseModal.code} • {activeCourseModal.level}
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {activeCourseModal.department}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {activeCourseModal.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {activeCourseModal.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Duration</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{activeCourseModal.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Sanctioned Seats</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{activeCourseModal.seats} Seats</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Annual Fee</div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{activeCourseModal.fees}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Eligibility Criteria</h4>
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 font-medium">
                  {activeCourseModal.eligibility}
                </div>
              </div>

              {activeCourseModal.syllabusOverview && activeCourseModal.syllabusOverview.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Key Syllabus Modules</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeCourseModal.syllabusOverview.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <Link
                to="/admissions"
                onClick={() => setActiveCourseModal(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-2"
              >
                <span>Proceed to Admission Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
