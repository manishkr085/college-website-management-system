const User = require('../models/User');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');
const Notice = require('../models/Notice');
const Admission = require('../models/Admission');
const Gallery = require('../models/Gallery');
const Material = require('../models/Material');
const Contact = require('../models/Contact');
const { getIsConnected } = require('../config/db');
const { mockStore, seedDatabase } = require('../utils/seedData');

// GET dashboard statistics & chart metrics
const getDashboardStats = async (req, res) => {
  try {
    let totalCourses = 0;
    let totalFaculty = 0;
    let totalNotices = 0;
    let totalAdmissions = 0;
    let pendingAdmissions = 0;
    let approvedAdmissions = 0;
    let rejectedAdmissions = 0;
    let totalGallery = 0;
    let totalMaterials = 0;
    let totalContacts = 0;

    if (getIsConnected()) {
      totalCourses = await Course.countDocuments();
      totalFaculty = await Faculty.countDocuments();
      totalNotices = await Notice.countDocuments();
      totalAdmissions = await Admission.countDocuments();
      pendingAdmissions = await Admission.countDocuments({ status: 'Pending' });
      approvedAdmissions = await Admission.countDocuments({ status: 'Approved' });
      rejectedAdmissions = await Admission.countDocuments({ status: 'Rejected' });
      totalGallery = await Gallery.countDocuments();
      totalMaterials = await Material.countDocuments();
      totalContacts = await Contact.countDocuments();
    } else {
      totalCourses = mockStore.courses.length;
      totalFaculty = mockStore.faculty.length;
      totalNotices = mockStore.notices.length;
      totalAdmissions = mockStore.admissions.length;
      pendingAdmissions = mockStore.admissions.filter(a => a.status === 'Pending').length;
      approvedAdmissions = mockStore.admissions.filter(a => a.status === 'Approved').length;
      rejectedAdmissions = mockStore.admissions.filter(a => a.status === 'Rejected').length;
      totalGallery = mockStore.gallery.length;
      totalMaterials = mockStore.materials.length;
      totalContacts = mockStore.contacts.length;
    }

    // Chart distribution data
    const applicationStatusChart = [
      { name: 'Pending', count: pendingAdmissions, color: '#f59e0b' },
      { name: 'Approved', count: approvedAdmissions, color: '#10b981' },
      { name: 'Rejected', count: rejectedAdmissions, color: '#ef4444' }
    ];

    const departmentDistributionChart = [
      { name: 'Computer Science', courses: 3, faculty: 2 },
      { name: 'Electronics', courses: 1, faculty: 1 },
      { name: 'Management', courses: 1, faculty: 1 }
    ];

    return res.json({
      counters: {
        totalCourses,
        totalFaculty,
        totalNotices,
        totalAdmissions,
        pendingAdmissions,
        approvedAdmissions,
        totalGallery,
        totalMaterials,
        totalContacts
      },
      charts: {
        applicationStatusChart,
        departmentDistributionChart
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// TRIGGER Database Seeding
const triggerSeedData = async (req, res) => {
  try {
    await seedDatabase();
    return res.json({ message: 'Sample database successfully seeded with demo data!' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats, triggerSeedData };
