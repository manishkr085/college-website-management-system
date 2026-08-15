import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-orange-500 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                IIT KHARAGPUR
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Indian Institute of Technology Kharagpur, established in 1951 as the first IIT, empowering global innovators through cutting-edge technology education, interdisciplinary research, and academic distinction.
            </p>
            <div className="flex items-center gap-3 text-xs text-orange-400 font-semibold bg-orange-950/40 border border-orange-800/50 px-3 py-2 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 text-orange-500" /> Institute of National Importance • NIRF #1 Engineering Rank
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-semibold tracking-wide">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About IIT Kharagpur & Leadership</Link></li>
              <li><Link to="/courses" className="hover:text-orange-400 transition-colors">UG & PG Academic Programs</Link></li>
              <li><Link to="/admissions" className="hover:text-orange-400 transition-colors">Online Admissions 2026</Link></li>
              <li><Link to="/notices" className="hover:text-orange-400 transition-colors">Notices & Exam Schedules</Link></li>
              <li><Link to="/gallery" className="hover:text-orange-400 transition-colors">Campus Media & Event Gallery</Link></li>
              <li><Link to="/student-corner" className="hover:text-orange-400 transition-colors">Student Corner Downloads</Link></li>
            </ul>
          </div>

          {/* Departments */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-semibold tracking-wide">Academic Departments</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Computer Science & Engineering</li>
              <li>• Artificial Intelligence & Data Science</li>
              <li>• Electronics & Electrical Communication</li>
              <li>• Aerospace & Mechanical Engineering</li>
              <li>• Vinod Gupta School of Management</li>
              <li>• Ocean Engineering & Naval Architecture</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-semibold tracking-wide">Campus Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>IIT Kharagpur Campus, Kharagpur, West Bengal, Pin: 721302</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>+91 (03222) 255221 / +91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>iitkharagpur@college.edu.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} IIT KHARAGPUR (Indian Institute of Technology Kharagpur). All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-400">Terms of Service</Link>
            <Link to="/login" className="hover:text-slate-400">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
