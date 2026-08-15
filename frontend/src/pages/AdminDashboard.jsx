import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, Bell, FileText, Image as ImageIcon, 
  Download, Mail, Plus, Edit, Trash2, CheckCircle, XCircle, RefreshCw, Sparkles, Check, X
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import DashboardCharts from '../components/admin/DashboardCharts';
import Toast from '../components/common/Toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Stats & Charts data
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Entities Data
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [notices, setNotices] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Modal States
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseFormData, setCourseFormData] = useState({ title: '', code: '', department: 'Computer Science', level: 'UG', duration: '4 Years', eligibility: '', fees: '$4,000 / Year', description: '', syllabusOverview: 'Data Structures, Machine Learning' });

  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [facultyFormData, setFacultyFormData] = useState({ name: '', email: '', phone: '', designation: 'Professor', department: 'Computer Science', qualification: 'Ph.D.', experience: '5+ Years', specialization: '', bio: '', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' });

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeFormData, setNoticeFormData] = useState({ title: '', category: 'Notice', description: '', location: 'Campus Auditorium', attachment: '', isImportant: false, author: 'Administration' });

  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [materialFormData, setMaterialFormData] = useState({ title: '', category: 'Study Material', department: 'Computer Science', semester: 'Semester 1', fileUrl: '', description: '' });

  // Toast
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchDashboardStats();
    fetchAllEntities();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get('/stats/dashboard');
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchAllEntities = async () => {
    try {
      const [cRes, fRes, nRes, gRes, mRes] = await Promise.all([
        API.get('/courses'),
        API.get('/faculty'),
        API.get('/notices'),
        API.get('/gallery'),
        API.get('/student/materials')
      ]);
      setCourses(cRes.data);
      setFaculty(fRes.data);
      setNotices(nRes.data);
      setGallery(gRes.data);
      setMaterials(mRes.data);

      if (user?.role === 'admin') {
        const [aRes, cntRes] = await Promise.all([
          API.get('/admissions'),
          API.get('/contact')
        ]);
        setAdmissions(aRes.data);
        setContacts(cntRes.data);
      }
    } catch (err) {
      console.error('Error fetching admin entities:', err);
    }
  };

  // Database Seeder Handler
  const handleSeedData = async () => {
    try {
      const res = await API.post('/stats/seed');
      setToast({ message: res.data.message, type: 'success' });
      fetchDashboardStats();
      fetchAllEntities();
    } catch (err) {
      setToast({ message: 'Failed to seed database.', type: 'error' });
    }
  };

  // Course Handlers
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...courseFormData,
        syllabusOverview: typeof courseFormData.syllabusOverview === 'string'
          ? courseFormData.syllabusOverview.split(',').map(s => s.trim())
          : courseFormData.syllabusOverview
      };
      await API.post('/courses', payload);
      setToast({ message: 'Course created successfully!', type: 'success' });
      setShowCourseModal(false);
      fetchAllEntities();
      fetchDashboardStats();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error saving course.', type: 'error' });
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Delete this course from catalog?')) return;
    try {
      await API.delete(`/courses/${id}`);
      setToast({ message: 'Course removed.', type: 'success' });
      fetchAllEntities();
      fetchDashboardStats();
    } catch (err) {
      setToast({ message: 'Error deleting course.', type: 'error' });
    }
  };

  // Faculty Handlers
  const handleSaveFaculty = async (e) => {
    e.preventDefault();
    try {
      await API.post('/faculty', facultyFormData);
      setToast({ message: 'Faculty profile added successfully!', type: 'success' });
      setShowFacultyModal(false);
      fetchAllEntities();
      fetchDashboardStats();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error saving faculty.', type: 'error' });
    }
  };

  const handleDeleteFaculty = async (id) => {
    if (!window.confirm('Remove faculty member?')) return;
    try {
      await API.delete(`/faculty/${id}`);
      setToast({ message: 'Faculty member removed.', type: 'success' });
      fetchAllEntities();
      fetchDashboardStats();
    } catch (err) {
      setToast({ message: 'Error deleting faculty.', type: 'error' });
    }
  };

  // Notice Handlers
  const handleSaveNotice = async (e) => {
    e.preventDefault();
    try {
      await API.post('/notices', noticeFormData);
      setToast({ message: 'Notice published successfully!', type: 'success' });
      setShowNoticeModal(false);
      fetchAllEntities();
      fetchDashboardStats();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error saving notice.', type: 'error' });
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Delete notice?')) return;
    try {
      await API.delete(`/notices/${id}`);
      setToast({ message: 'Notice deleted.', type: 'success' });
      fetchAllEntities();
      fetchDashboardStats();
    } catch (err) {
      setToast({ message: 'Error deleting notice.', type: 'error' });
    }
  };

  // Admission Status Handlers
  const handleUpdateAdmissionStatus = async (id, status) => {
    const comments = window.prompt(`Enter approval/rejection notes for status: ${status}`);
    try {
      await API.put(`/admissions/${id}/status`, { status, adminComments: comments || '' });
      setToast({ message: `Application status updated to ${status}!`, type: 'success' });
      fetchAllEntities();
      fetchDashboardStats();
    } catch (err) {
      setToast({ message: 'Error updating application status.', type: 'error' });
    }
  };

  // Material Handler
  const handleSaveMaterial = async (e) => {
    e.preventDefault();
    try {
      await API.post('/student/materials', materialFormData);
      setToast({ message: 'Material resource uploaded successfully!', type: 'success' });
      setShowMaterialModal(false);
      fetchAllEntities();
    } catch (err) {
      setToast({ message: 'Error uploading resource.', type: 'error' });
    }
  };

  const handleDeleteMaterial = async (id) => {
    if (!window.confirm('Delete resource material?')) return;
    try {
      await API.delete(`/student/materials/${id}`);
      setToast({ message: 'Material removed.', type: 'success' });
      fetchAllEntities();
    } catch (err) {
      setToast({ message: 'Error deleting material.', type: 'error' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      {/* Admin Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              Role: {user?.role || 'Admin'}
            </span>
            <span className="text-xs text-slate-400">Department: {user?.department || 'Administration'}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            College Management Dashboard
          </h1>
        </div>

        <button
          onClick={handleSeedData}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Reset / Seed Sample Data</span>
        </button>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview & Charts', icon: LayoutDashboard },
          { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
          { id: 'faculty', label: `Faculty (${faculty.length})`, icon: Users },
          { id: 'notices', label: `Notices (${notices.length})`, icon: Bell },
          { id: 'admissions', label: `Admissions (${admissions.length})`, icon: FileText, adminOnly: true },
          { id: 'student', label: `Student Corner (${materials.length})`, icon: Download },
          { id: 'inquiries', label: `Inquiries (${contacts.length})`, icon: Mail, adminOnly: true }
        ]
          .filter(t => !t.adminOnly || user?.role === 'admin')
          .map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                  activeTab === t.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
      </div>

      {/* TAB 1: Overview & Charts */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow border border-slate-100 dark:border-slate-700/60">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Courses</span>
              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{stats?.counters?.totalCourses || courses.length}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow border border-slate-100 dark:border-slate-700/60">
              <span className="text-xs text-slate-400 uppercase font-semibold">Faculty Members</span>
              <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">{stats?.counters?.totalFaculty || faculty.length}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow border border-slate-100 dark:border-slate-700/60">
              <span className="text-xs text-slate-400 uppercase font-semibold">Published Notices</span>
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{stats?.counters?.totalNotices || notices.length}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow border border-slate-100 dark:border-slate-700/60">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Applications</span>
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{stats?.counters?.totalAdmissions || admissions.length}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow border border-slate-100 dark:border-slate-700/60">
              <span className="text-xs text-slate-400 uppercase font-semibold">Pending Applications</span>
              <div className="text-2xl font-extrabold text-amber-500 mt-1">{stats?.counters?.pendingAdmissions || 0}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow border border-slate-100 dark:border-slate-700/60">
              <span className="text-xs text-slate-400 uppercase font-semibold">Approved Students</span>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">{stats?.counters?.approvedAdmissions || 0}</div>
            </div>
          </div>

          {/* Recharts Component */}
          {stats?.charts && <DashboardCharts chartsData={stats.charts} />}
        </div>
      )}

      {/* TAB 2: Manage Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Academic Courses Directory</h3>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowCourseModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> Add New Course
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow overflow-hidden border border-slate-100 dark:border-slate-700/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Code</th>
                    <th className="p-4">Course Title</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Level</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Annual Fee</th>
                    {user?.role === 'admin' && <th className="p-4 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {courses.map(c => (
                    <tr key={c._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">{c.code}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{c.title}</td>
                      <td className="p-4">{c.department}</td>
                      <td className="p-4 font-bold">{c.level}</td>
                      <td className="p-4">{c.duration}</td>
                      <td className="p-4 font-bold text-blue-600 dark:text-blue-400">{c.fees}</td>
                      {user?.role === 'admin' && (
                        <td className="p-4 text-right">
                          <button onClick={() => handleDeleteCourse(c._id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Manage Faculty */}
      {activeTab === 'faculty' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Faculty Profiles</h3>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowFacultyModal(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> Add Faculty Member
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow overflow-hidden border border-slate-100 dark:border-slate-700/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Faculty Name</th>
                    <th className="p-4">Designation</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Qualification</th>
                    <th className="p-4">Email</th>
                    {user?.role === 'admin' && <th className="p-4 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {faculty.map(f => (
                    <tr key={f._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <img src={f.photo} alt={f.name} className="w-7 h-7 rounded-full object-cover" />
                        <span>{f.name}</span>
                      </td>
                      <td className="p-4 font-semibold text-blue-600 dark:text-blue-400">{f.designation}</td>
                      <td className="p-4">{f.department}</td>
                      <td className="p-4">{f.qualification}</td>
                      <td className="p-4">{f.email}</td>
                      {user?.role === 'admin' && (
                        <td className="p-4 text-right">
                          <button onClick={() => handleDeleteFaculty(f._id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Manage Notices */}
      {activeTab === 'notices' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notice Board & Announcements</h3>
            <button
              onClick={() => setShowNoticeModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" /> Publish Notice
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow overflow-hidden border border-slate-100 dark:border-slate-700/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Issued By</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {notices.map(n => (
                    <tr key={n._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{n.title}</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">{n.category}</span></td>
                      <td className="p-4">{n.date}</td>
                      <td className="p-4">{n.author}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeleteNotice(n._id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Manage Admissions */}
      {activeTab === 'admissions' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Student Admissions Review</h3>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow overflow-hidden border border-slate-100 dark:border-slate-700/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">App No.</th>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Course Applied</th>
                    <th className="p-4">Marks %</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Decision Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {admissions.map(a => (
                    <tr key={a._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">{a.applicationNo}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{a.studentName}</td>
                      <td className="p-4">{a.courseApplied}</td>
                      <td className="p-4 font-bold">{a.marksPercentage}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                          a.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          a.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleUpdateAdmissionStatus(a._id, 'Approved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateAdmissionStatus(a._id, 'Rejected')}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px]"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Manage Student Corner */}
      {activeTab === 'student' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Student Corner Downloads & Materials</h3>
            <button
              onClick={() => setShowMaterialModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" /> Upload Material Resource
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow overflow-hidden border border-slate-100 dark:border-slate-700/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Semester</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {materials.map(m => (
                    <tr key={m._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{m.title}</td>
                      <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">{m.category}</span></td>
                      <td className="p-4">{m.department}</td>
                      <td className="p-4">{m.semester}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDeleteMaterial(m._id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Manage Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Visitor Inquiries</h3>

          <div className="space-y-4">
            {contacts.map(c => (
              <div key={c._id} className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-100 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{c.name} ({c.email})</div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px] uppercase">{c.status}</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">Subject: {c.subject}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl">"{c.message}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD COURSE MODAL */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Academic Course</h3>
            <form onSubmit={handleSaveCourse} className="space-y-3">
              <input type="text" placeholder="Course Title" value={courseFormData.title} onChange={e => setCourseFormData({...courseFormData, title: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <input type="text" placeholder="Course Code (e.g. CSE-105)" value={courseFormData.code} onChange={e => setCourseFormData({...courseFormData, code: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <input type="text" placeholder="Department" value={courseFormData.department} onChange={e => setCourseFormData({...courseFormData, department: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <input type="text" placeholder="Eligibility Criteria" value={courseFormData.eligibility} onChange={e => setCourseFormData({...courseFormData, eligibility: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <textarea placeholder="Course Description" value={courseFormData.description} onChange={e => setCourseFormData({...courseFormData, description: e.target.value})} required rows="3" className="w-full px-3 py-2 rounded-xl border text-xs"></textarea>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowCourseModal(false)} className="px-4 py-2 rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD FACULTY MODAL */}
      {showFacultyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add Faculty Profile</h3>
            <form onSubmit={handleSaveFaculty} className="space-y-3">
              <input type="text" placeholder="Full Name (e.g. Dr. John Smith)" value={facultyFormData.name} onChange={e => setFacultyFormData({...facultyFormData, name: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <input type="email" placeholder="Faculty Email" value={facultyFormData.email} onChange={e => setFacultyFormData({...facultyFormData, email: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <input type="text" placeholder="Designation" value={facultyFormData.designation} onChange={e => setFacultyFormData({...facultyFormData, designation: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <input type="text" placeholder="Department" value={facultyFormData.department} onChange={e => setFacultyFormData({...facultyFormData, department: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <input type="text" placeholder="Qualification" value={facultyFormData.qualification} onChange={e => setFacultyFormData({...facultyFormData, qualification: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowFacultyModal(false)} className="px-4 py-2 rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs">Save Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NOTICE MODAL */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Publish Notice / Event</h3>
            <form onSubmit={handleSaveNotice} className="space-y-3">
              <input type="text" placeholder="Notice Title" value={noticeFormData.title} onChange={e => setNoticeFormData({...noticeFormData, title: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <textarea placeholder="Description" value={noticeFormData.description} onChange={e => setNoticeFormData({...noticeFormData, description: e.target.value})} required rows="3" className="w-full px-3 py-2 rounded-xl border text-xs"></textarea>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowNoticeModal(false)} className="px-4 py-2 rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs">Publish Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD MATERIAL MODAL */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload Student Corner Resource</h3>
            <form onSubmit={handleSaveMaterial} className="space-y-3">
              <input type="text" placeholder="Title (e.g. Operating Systems Lecture Notes)" value={materialFormData.title} onChange={e => setMaterialFormData({...materialFormData, title: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <select value={materialFormData.category} onChange={e => setMaterialFormData({...materialFormData, category: e.target.value})} className="w-full px-3 py-2 rounded-xl border text-xs">
                <option value="Study Material">Study Material</option>
                <option value="Timetable">Timetable</option>
                <option value="Result">Result</option>
                <option value="Download">Download</option>
              </select>
              <input type="text" placeholder="Department" value={materialFormData.department} onChange={e => setMaterialFormData({...materialFormData, department: e.target.value})} required className="w-full px-3 py-2 rounded-xl border text-xs" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowMaterialModal(false)} className="px-4 py-2 rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs">Save Material</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
