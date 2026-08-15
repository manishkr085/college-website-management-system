import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  FileText, 
  Building2, 
  Sparkles,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Search
} from 'lucide-react';
import API from '../services/api';

const HomePage = () => {
  const [notices, setNotices] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      title: "IIT KHARAGPUR",
      subtitle: "First Indian Institute of Technology • Est. 1951",
      tagline: "Yogah Karmasu Kausalam - Excellence in Action",
      image: "/iit_kharagpur_main.jpg",
      caption: "Historic Main Academic Building & Fountain Circle • IIT Kharagpur Campus"
    },
    {
      title: "2,100-Acre Sprawling Green Campus",
      subtitle: "Pioneering Research & Technological Excellence",
      tagline: "State-of-the-Art Research Parks, Innovation Hubs & Stadium Domes",
      image: "/iit_kharagpur_aerial.jpg",
      caption: "Panoramic Aerial Drone View • IIT Kharagpur, West Bengal"
    },
    {
      title: "Golden Hour Illumination & Heritage",
      subtitle: "75+ Years of Academic Distinction",
      tagline: "Empowering Next-Gen Engineers, Scientists & Visionary Leaders",
      image: "/iit_kharagpur_sunset.jpg",
      caption: "Sunset Glow over the Iconic Clock Tower & Campus Horizon"
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nRes, cRes] = await Promise.all([
          API.get('/notices'),
          API.get('/courses')
        ]);
        setNotices(nRes.data.slice(0, 4));
        setCourses(cRes.data.slice(0, 3));
      } catch (err) {
        console.error('Failed loading home data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with Dynamic Background Rotation of Official IIT KHARAGPUR Campus Photos */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-24 bg-slate-950 text-white min-h-[600px] flex items-center">
        {/* Dynamic Image Background Layer with Smooth Fade Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105 transition-all duration-1000 pointer-events-none"
          style={{ backgroundImage: `url('${heroSlides[activeSlide].image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold backdrop-blur-md shadow-lg shadow-orange-500/10">
                <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                <span>Institute of National Importance • Established 1951</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Welcome to <br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  IIT KHARAGPUR
                </span>
              </h1>

              <p className="text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-md">
                {heroSlides[activeSlide].tagline}. Accredited B.Tech, M.Tech, Dual Degrees, and Doctoral programs driving global technological leadership.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/admissions"
                  className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold shadow-xl shadow-orange-500/30 flex items-center gap-2.5 transition-all hover:scale-105"
                >
                  <span>Apply for Admission 2026</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/courses"
                  className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold flex items-center gap-2 transition-all hover:border-orange-500/50 backdrop-blur-md"
                >
                  <BookOpen className="w-5 h-5 text-orange-400" />
                  <span>Explore UG & PG Courses</span>
                </Link>
              </div>

              {/* Counter Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
                <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-orange-400">#1 NIRF</div>
                  <div className="text-xs text-slate-300 mt-0.5 font-medium">Engineering Institute</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-blue-400">22,000+</div>
                  <div className="text-xs text-slate-300 mt-0.5 font-medium">Global Students</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">2,100 Acres</div>
                  <div className="text-xs text-slate-300 mt-0.5 font-medium">Campus Area</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Hero Card Displaying Active Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-500/40 group bg-slate-900">
                <img
                  src={heroSlides[activeSlide].image}
                  alt={heroSlides[activeSlide].title}
                  className="w-full h-[410px] object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Slide Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{heroSlides[activeSlide].title}</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">{heroSlides[activeSlide].caption}</p>
                    </div>
                  </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeSlide === idx ? 'bg-orange-500 w-6' : 'bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Links Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/admissions"
            className="p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700/60 flex items-center gap-4 group hover:border-blue-500 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600">Online Admissions</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Submit forms & documents</p>
            </div>
          </Link>

          <Link
            to="/courses"
            className="p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700/60 flex items-center gap-4 group hover:border-purple-500 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-purple-600">UG & PG Programs</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Explore syllabus & degrees</p>
            </div>
          </Link>

          <Link
            to="/student-corner"
            className="p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700/60 flex items-center gap-4 group hover:border-emerald-500 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">Student Corner</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Timetables, notes & results</p>
            </div>
          </Link>

          <Link
            to="/notices"
            className="p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700/60 flex items-center gap-4 group hover:border-amber-500 transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600">Latest Circulars</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Exams & event updates</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Director's Message Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 text-center">
              <div className="relative inline-block">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
                  alt="Director Prof. Virendra Kumar Tewari"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover mx-auto shadow-2xl border-4 border-orange-500/40"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-extrabold text-white">Prof. Virendra K. Tewari</h3>
                  <p className="text-xs text-orange-400 font-bold mt-0.5">Director • IIT KHARAGPUR</p>
                  <p className="text-[11px] text-slate-400">Ph.D., FNAE, FIE, Institute Professor</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                <Sparkles className="w-4 h-4 text-orange-500" /> Director's Message
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
                "At IIT Kharagpur, we train world-class engineers, researchers, and innovators committed to national service and global technological progress."
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                As India's first Indian Institute of Technology established in 1951, IIT Kharagpur stands at the forefront of interdisciplinary research, industrial innovation, and academic distinction. We nurture curiosity, ethical leadership, and groundbreaking scientific research across 20+ specialized academic departments.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold shadow-lg shadow-orange-500/25 transition-all"
                >
                  Read Leadership & Vision
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our Foundational Pillars</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Guiding principles that steer our academic institution towards international excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 space-y-4 hover:border-blue-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              To be a globally recognized institute of technological learning, pioneering breakthrough research, and graduating ethically sound engineers and business leaders.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 space-y-4 hover:border-indigo-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              To deliver rigorous academic programs, establish cutting-edge research facilities, and nurture industry collaborations that enhance student employability.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 space-y-4 hover:border-purple-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Core Values</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Integrity, innovation, inclusivity, environmental sustainability, and a continuous pursuit of knowledge and societal impact.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Featured Academic Programs</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Explore our accredited UG and PG degree offerings.</p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all"
          >
            View All Courses <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course._id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between group hover:shadow-2xl transition-all">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {course.level}
                  </span>
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
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/40 mt-4 text-xs">
                <span className="text-slate-500 dark:text-slate-400">Duration: <b>{course.duration}</b></span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{course.fees}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notices Ticker Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-bold">Latest Campus Announcements</h3>
              <p className="text-slate-400 text-xs mt-1">Official circulars, exam dates, and upcoming campus events.</p>
            </div>
            <Link to="/notices" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-colors">
              Notice Board Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map(n => (
              <div key={n._id} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-4">
                <div className="px-3 py-2 bg-blue-900/60 border border-blue-700/50 rounded-xl text-center shrink-0">
                  <div className="text-xs font-bold text-blue-300 uppercase">{n.category}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{n.date}</div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-100">{n.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{n.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
