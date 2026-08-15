import React from 'react';
import { Building2, Award, History, Cpu, BookOpen, ShieldCheck, Users, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  const departments = [
    { name: 'Computer Science & Engineering', count: '12 Faculty • 480 Students', desc: 'Leading research in Distributed Systems, AI, and Cloud Architecture.' },
    { name: 'Artificial Intelligence & Data Science', count: '8 Faculty • 240 Students', desc: 'Focusing on Deep Learning, Machine Vision, and Natural Language Processing.' },
    { name: 'Electronics & Communication', count: '10 Faculty • 360 Students', desc: 'Specializing in VLSI, Embedded Systems, and Internet of Things hardware.' },
    { name: 'School of Management', count: '9 Faculty • 300 Students', desc: 'Preparing future corporate leaders in Global Finance, Analytics, and Marketing.' }
  ];

  const infrastructure = [
    { title: 'Historic Main Building & Fountain Circle', image: '/iit_kharagpur_main.jpg', desc: 'The iconic clock tower and central fountain ring at IIT Kharagpur.' },
    { title: '2,100-Acre Campus & Sports Stadium', image: '/iit_kharagpur_aerial.jpg', desc: 'Panoramic aerial drone perspective of lush green campus, research parks, and sports dome.' },
    { title: 'Golden Hour Sunset & Academic Complex', image: '/iit_kharagpur_sunset.jpg', desc: 'Illuminated campus heritage building during evening golden hour.' },
    { title: 'Student Innovation & Incubator Hub', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', desc: 'STARTIN incubation center with seed funding and mentor access.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-4 h-4" /> About IIT KHARAGPUR
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Pioneering Excellence in Technological Education Since 1951
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          Spread across 2,100 acres in Kharagpur, West Bengal, IIT Kharagpur is India's first Indian Institute of Technology, empowering over 22,000 students and alumni with world-class engineering, scientific, and management education.
        </p>
      </div>

      {/* History Timeline */}
      <section className="bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
            <History className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Historical Milestones</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-2xl font-extrabold text-orange-500 dark:text-orange-400">1951</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">First IIT Inaugurated</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">Inaugurated by Maulana Abul Kalam Azad at Hijli Detention Camp site.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">1956</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Institute of National Importance</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">Declared an Institute of National Importance by the Parliament of India.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">1993</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">VGSoM Established</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">Vinod Gupta School of Management launched as the first management school within an IIT.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-2xl font-extrabold text-amber-500 dark:text-amber-400">2026</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">AI & Semiconductor Supercenter</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">Pioneering AI Research Park and advanced semiconductor fabrication labs.</p>
          </div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Academic Departments</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Fostering specialized knowledge across key technological disciplines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((d, i) => (
            <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{d.name}</h3>
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">{d.count}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure Showcase */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">World-Class Infrastructure</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Modern facilities designed to support student innovation, sports, and research.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infrastructure.map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-700/60 group">
              <img src={item.image} alt={item.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
