import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Video, X, Play, Filter } from 'lucide-react';
import API from '../services/api';

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await API.get('/gallery');
      setGallery(res.data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Campus', 'Labs', 'Sports', 'Cultural', 'Events', 'Videos'];

  const filteredGallery = gallery.filter(item => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Videos') return item.type === 'video';
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
          <ImageIcon className="w-4 h-4" /> Campus Media Gallery
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          Life & Memories at Apex Institute
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          High-definition photo highlights, sports tournaments, technical labs, and cultural celebrations.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading media gallery...</div>
      ) : filteredGallery.length === 0 ? (
        <div className="py-16 text-center text-slate-500">No items found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map(item => (
            <div
              key={item._id}
              onClick={() => setActiveMedia(item)}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700/60 group cursor-pointer hover:shadow-2xl transition-all"
            >
              <div className="relative h-60 overflow-hidden">
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                    <video src={item.url} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {item.category}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Media Modal Lightbox */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              {activeMedia.type === 'video' ? (
                <video src={activeMedia.url} controls autoPlay className="max-h-[75vh] w-full object-contain" />
              ) : (
                <img src={activeMedia.url} alt={activeMedia.title} className="max-h-[75vh] w-full object-contain" />
              )}
            </div>

            <div className="p-6 text-white space-y-1 bg-slate-900">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">{activeMedia.category}</div>
              <h3 className="text-xl font-bold">{activeMedia.title}</h3>
              {activeMedia.description && <p className="text-xs text-slate-400">{activeMedia.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
