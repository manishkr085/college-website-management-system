import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, UserCheck, Bell, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ courses: [], notices: [], faculty: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults({ courses: [], notices: [], faculty: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults({ courses: [], notices: [], faculty: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const [cRes, nRes, fRes] = await Promise.all([
          API.get('/courses'),
          API.get('/notices'),
          API.get('/faculty')
        ]);

        const q = query.toLowerCase();

        const filteredCourses = cRes.data.filter(c =>
          c.title.toLowerCase().includes(q) || c.department.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
        );

        const filteredNotices = nRes.data.filter(n =>
          n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
        );

        const filteredFaculty = fRes.data.filter(f =>
          f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q) || f.designation.toLowerCase().includes(q)
        );

        setResults({
          courses: filteredCourses.slice(0, 3),
          notices: filteredNotices.slice(0, 3),
          faculty: filteredFaculty.slice(0, 3)
        });
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  const totalResults = results.courses.length + results.notices.length + results.faculty.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, notices, faculty, departments..."
            className="w-full py-4 text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none placeholder:text-slate-400 text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-6">
          {loading && (
            <div className="py-8 text-center text-slate-400 text-sm">Searching records...</div>
          )}

          {!loading && query.length >= 2 && totalResults === 0 && (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400">
              No matching records found for "{query}".
            </div>
          )}

          {!loading && query.length < 2 && (
            <div className="py-6 text-center text-slate-400 text-sm">
              Type at least 2 characters to search across college databases.
            </div>
          )}

          {/* Courses */}
          {results.courses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Courses ({results.courses.length})
              </div>
              <div className="space-y-1">
                {results.courses.map(course => (
                  <div
                    key={course._id}
                    onClick={() => handleSelect('/courses')}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {course.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {course.code} • {course.department} • {course.duration}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notices */}
          {results.notices.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                <Bell className="w-3.5 h-3.5" /> Notices & Circulars ({results.notices.length})
              </div>
              <div className="space-y-1">
                {results.notices.map(notice => (
                  <div
                    key={notice._id}
                    onClick={() => handleSelect('/notices')}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {notice.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {notice.category} • {notice.date}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Faculty */}
          {results.faculty.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                <UserCheck className="w-3.5 h-3.5" /> Faculty ({results.faculty.length})
              </div>
              <div className="space-y-1">
                {results.faculty.map(f => (
                  <div
                    key={f._id}
                    onClick={() => handleSelect('/faculty')}
                    className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={f.photo} alt={f.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          {f.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {f.designation} • {f.department}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
