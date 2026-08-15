import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Download, FileText, Search, Filter, AlertCircle, ExternalLink } from 'lucide-react';
import API from '../services/api';

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await API.get('/notices');
      setNotices(res.data);
    } catch (err) {
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = notices.filter(n => {
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Bell className="w-4 h-4" /> Official Notice Board
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          Notices, Circulars & Event Announcements
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Stay informed with official examination timetables, campus circulars, and tech events.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notice content..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['All', 'Notice', 'Event', 'Circular', 'Exam'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading notices...</div>
      ) : filteredNotices.length === 0 ? (
        <div className="py-16 text-center text-slate-500">No notices found matching criteria.</div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map(notice => (
            <div
              key={notice._id}
              className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border ${
                notice.isImportant ? 'border-amber-400 dark:border-amber-500/50 bg-amber-50/20 dark:bg-amber-950/10' : 'border-slate-100 dark:border-slate-700/60'
              } flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-xl transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex flex-col items-center justify-center shrink-0">
                  <Bell className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase mt-0.5">{notice.category}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{notice.title}</h3>
                    {notice.isImportant && (
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-extrabold text-[10px] uppercase">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                    {notice.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span>📅 Date: <b>{notice.date}</b></span>
                    <span>📍 Location: <b>{notice.location}</b></span>
                    <span>✍️ Issued by: <b>{notice.author}</b></span>
                  </div>
                </div>
              </div>

              {notice.attachment && (
                <a
                  href={notice.attachment}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold transition-colors flex items-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4 text-blue-500" />
                  <span>Download Document</span>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticesPage;
