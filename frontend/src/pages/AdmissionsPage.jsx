import React, { useState } from 'react';
import { FileText, Search, CheckCircle2, AlertCircle, Upload, Clock, User, Phone, Mail, GraduationCap } from 'lucide-react';
import API from '../services/api';
import Toast from '../components/common/Toast';

const AdmissionsPage = () => {
  const [activeTab, setActiveTab] = useState('apply'); // 'apply' | 'status'

  // Application Form State
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '',
    courseApplied: 'B.Tech in Computer Science & Engineering',
    department: 'Computer Science',
    address: '',
    marksPercentage: ''
  });
  const [documentFile, setDocumentFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);

  // Status Lookup State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusResult, setStatusResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Toast State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (documentFile) {
        data.append('document', documentFile);
      }

      const res = await API.post('/admissions/apply', data, {
        headers: { 'Content-Type': 'multipart/form-[#form-data]' }
      });

      setSubmittedApp(res.data);
      setToast({ message: 'Admission Application successfully submitted!', type: 'success' });
      setFormData({
        studentName: '',
        email: '',
        phone: '',
        gender: 'Male',
        dob: '',
        courseApplied: 'B.Tech in Computer Science & Engineering',
        department: 'Computer Science',
        address: '',
        marksPercentage: ''
      });
      setDocumentFile(null);
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error submitting application.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchError('');
    setStatusResult(null);

    try {
      const res = await API.get(`/admissions/status/${searchQuery.trim()}`);
      setStatusResult(res.data);
    } catch (err) {
      setSearchError(err.response?.data?.message || 'No application record found for this Application No. or Email.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" /> IIT KHARAGPUR Admissions 2026
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Online Admission Portal & Application Tracker
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Apply online for B.Tech, Dual Degree, M.Tech, and MBA programs at Indian Institute of Technology Kharagpur. Track application status live.
        </p>
      </div>

      {/* Tab Controls */}
      <div className="flex justify-center">
        <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'apply'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Online Application Form</span>
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'status'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Check Application Status</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Online Application Form */}
      {activeTab === 'apply' && (
        <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700/60">
          
          {submittedApp ? (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Application Received!</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your application has been registered in the college admissions system.
                </p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 inline-block text-left max-w-md w-full space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Application Number:</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">{submittedApp.applicationNo}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Applicant Name:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedApp.studentName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Course Applied:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedApp.courseApplied}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Status:</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] uppercase">
                    {submittedApp.status}
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setSubmittedApp(null)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-700/60 pb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Personal & Academic Information</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Please fill in accurate information as per your official transcripts.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Student Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alexander Vance"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="student@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Program Applied For *</label>
                  <select
                    name="courseApplied"
                    value={formData.courseApplied}
                    onChange={(e) => {
                      const selected = e.target.value;
                      let dept = 'Computer Science';
                      if (selected.includes('Electronics')) dept = 'Electronics & Communication';
                      if (selected.includes('Business') || selected.includes('MBA')) dept = 'Management';
                      setFormData({ ...formData, courseApplied: selected, department: dept });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="B.Tech in Computer Science & Engineering">B.Tech in Computer Science & Engineering</option>
                    <option value="B.Tech in Artificial Intelligence & Data Science">B.Tech in AI & Data Science</option>
                    <option value="M.Tech in Cyber Security & Information Assurance">M.Tech in Cyber Security</option>
                    <option value="B.Tech in Electronics & Communication Engineering">B.Tech in Electronics & Communication</option>
                    <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Previous Academic Percentage / GPA *</label>
                  <input
                    type="text"
                    name="marksPercentage"
                    value={formData.marksPercentage}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 91.5% or 3.8 GPA"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Document Upload (Transcript / ID - PDF or Image)</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 dark:file:bg-blue-900/40 file:text-blue-600 dark:file:text-blue-400 hover:file:bg-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Residential Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Street address, city, state, postal code"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application Now'}
                </button>
              </div>
            </form>
          )}

        </div>
      )}

      {/* TAB 2: Check Application Status */}
      {activeTab === 'status' && (
        <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700/60 space-y-8">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Track Admission Status</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter your Application Number (e.g., ADM-2026-8901) or registered Email address.
            </p>

            <form onSubmit={handleStatusSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Application No. or Email..."
                required
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Search Record'}
              </button>
            </form>

            {searchError && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-medium">
                {searchError}
              </div>
            )}
          </div>

          {/* Result Card */}
          {statusResult && (
            <div className="max-w-xl mx-auto p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{statusResult.applicationNo}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  statusResult.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                  statusResult.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  Status: {statusResult.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Applicant Name:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{statusResult.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Course Applied:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{statusResult.courseApplied}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{statusResult.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Previous Academic Score:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{statusResult.marksPercentage}</span>
                </div>
              </div>

              {statusResult.adminComments && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Admissions Office Notes:</span>
                  <p className="text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-3 rounded-xl italic">
                    "{statusResult.adminComments}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdmissionsPage;
