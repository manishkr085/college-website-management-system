const User = require('../models/User');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');
const Notice = require('../models/Notice');
const Admission = require('../models/Admission');
const Gallery = require('../models/Gallery');
const Material = require('../models/Material');
const Contact = require('../models/Contact');
const { getIsConnected } = require('../config/db');

// In-Memory Storage container for Fallback mode
const mockStore = {
  users: [
    {
      _id: 'u1',
      name: 'System Administrator',
      email: 'iitkharagpur@college.edu.in',
      password: '$2a$10$w6M60q6E1Yj4S70w3Y/6uuO2aLq2/s9x0D8X2aJ.Xy6/aJ9A2O8K', // password: admin123hashed
      role: 'admin',
      department: 'Administration',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      createdAt: new Date()
    },
    {
      _id: 'u2',
      name: 'Dr. Robert Vance',
      email: 'faculty@college.edu.in',
      password: '$2a$10$w6M60q6E1Yj4S70w3Y/6uuO2aLq2/s9x0D8X2aJ.Xy6/aJ9A2O8K',
      role: 'faculty',
      department: 'Computer Science',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      createdAt: new Date()
    },
    {
      _id: 'u3',
      name: 'Alex Johnson',
      email: 'student@college.edu.in',
      password: '$2a$10$w6M60q6E1Yj4S70w3Y/6uuO2aLq2/s9x0D8X2aJ.Xy6/aJ9A2O8K',
      role: 'student',
      department: 'Computer Science',
      studentId: 'CS2026-089',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      createdAt: new Date()
    }
  ],
  courses: [
    {
      _id: 'c1',
      title: 'B.Tech in Computer Science & Engineering',
      code: 'CSE-101',
      department: 'Computer Science',
      level: 'UG',
      duration: '4 Years (8 Semesters)',
      eligibility: '10+2 with Physics, Chemistry, and Mathematics (Min. 60%)',
      fees: '$4,500 / Year',
      seats: 120,
      description: 'Comprehensive undergraduate program covering Software Engineering, Data Structures, Algorithms, AI/ML, and Cloud Computing.',
      syllabusOverview: ['Data Structures & Algorithms', 'Database Systems', 'Machine Learning', 'Full Stack Web Development'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600'
    },
    {
      _id: 'c2',
      title: 'B.Tech in Artificial Intelligence & Data Science',
      code: 'AIDS-102',
      department: 'Computer Science',
      level: 'UG',
      duration: '4 Years (8 Semesters)',
      eligibility: '10+2 with PCM (Min. 65%)',
      fees: '$5,000 / Year',
      seats: 60,
      description: 'Specialized program focused on Deep Learning, Natural Language Processing, Computer Vision, and Big Data Analytics.',
      syllabusOverview: ['Neural Networks', 'Statistical Modeling', 'Natural Language Processing', 'Big Data Engineering'],
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600'
    },
    {
      _id: 'c3',
      title: 'M.Tech in Cyber Security & Information Assurance',
      code: 'M-CYBER-201',
      department: 'Computer Science',
      level: 'PG',
      duration: '2 Years (4 Semesters)',
      eligibility: 'B.Tech / B.E. in CSE / IT / ECE with Min 55%',
      fees: '$3,800 / Year',
      seats: 30,
      description: 'Advanced postgraduate degree equipping students with expertise in Network Defense, Ethical Hacking, and Cryptography.',
      syllabusOverview: ['Network Security', 'Ethical Hacking', 'Digital Forensics', 'Blockchain Security'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600'
    },
    {
      _id: 'c4',
      title: 'B.Tech in Electronics & Communication Engineering',
      code: 'ECE-103',
      department: 'Electronics & Communication',
      level: 'UG',
      duration: '4 Years (8 Semesters)',
      eligibility: '10+2 PCM (Min. 60%)',
      fees: '$4,200 / Year',
      seats: 90,
      description: 'Covers Embedded Systems, Very Large Scale Integration (VLSI), Signal Processing, and IoT Hardware design.',
      syllabusOverview: ['Embedded Systems', 'VLSI Design', 'Digital Signal Processing', 'Robotics & Automation'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'
    },
    {
      _id: 'c5',
      title: 'Master of Business Administration (MBA)',
      code: 'MBA-301',
      department: 'Management',
      level: 'PG',
      duration: '2 Years (4 Semesters)',
      eligibility: 'Bachelor Degree in any discipline (Min. 50%) + Entrance Score',
      fees: '$6,000 / Year',
      seats: 120,
      description: 'Premier management program with specializations in Finance, Marketing, Human Resources, and Business Analytics.',
      syllabusOverview: ['Corporate Finance', 'Strategic Marketing', 'Organizational Behavior', 'Business Analytics'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600'
    }
  ],
  faculty: [
    {
      _id: 'f1',
      name: 'Dr. Robert Vance',
      email: 'robert.vance@college.edu',
      phone: '+1 (555) 234-5678',
      designation: 'Head of Department & Senior Professor',
      department: 'Computer Science',
      qualification: 'Ph.D. in Computer Science (MIT)',
      experience: '16 Years',
      specialization: 'Artificial Intelligence, Distributed Systems',
      bio: 'Published over 45 international IEEE journals. Active mentor for student AI innovation labs.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'
    },
    {
      _id: 'f2',
      name: 'Prof. Elena Rostova',
      email: 'elena.rostova@college.edu',
      phone: '+1 (555) 345-6789',
      designation: 'Associate Professor',
      department: 'Computer Science',
      qualification: 'M.Tech, Ph.D. Candidate (Stanford)',
      experience: '10 Years',
      specialization: 'Cybersecurity, Cryptography',
      bio: 'Certified Ethical Hacker instructor leading the Cyber Defense Research Center.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300'
    },
    {
      _id: 'f3',
      name: 'Dr. Marcus Sterling',
      email: 'marcus.sterling@college.edu',
      phone: '+1 (555) 456-7890',
      designation: 'Professor & Dean of Research',
      department: 'Electronics & Communication',
      qualification: 'Ph.D. in Nano-Electronics (Oxford)',
      experience: '20 Years',
      specialization: 'VLSI Circuits, Microprocessors',
      bio: 'Holds 6 national technology patents in wireless sensor node micro-architectures.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300'
    },
    {
      _id: 'f4',
      name: 'Dr. Sophia Williams',
      email: 'sophia.williams@college.edu',
      phone: '+1 (555) 567-8901',
      designation: 'Director of Business Studies',
      department: 'Management',
      qualification: 'Ph.D. in Financial Economics (Harvard)',
      experience: '14 Years',
      specialization: 'Global Finance, Corporate Valuation',
      bio: 'Former Wall Street financial consultant turned passionate educator and author.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300'
    }
  ],
  notices: [
    {
      _id: 'n1',
      title: 'Fall Semester End-Term Examination Schedule Released',
      category: 'Exam',
      description: 'The finalized timetable for Fall End-Term examinations across all UG & PG departments is now published. Students must carry valid admit cards.',
      date: '2026-08-15',
      location: 'Examination Cell',
      attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      isImportant: true,
      author: 'Controller of Examinations'
    },
    {
      _id: 'n2',
      title: 'Annual International Tech Innovation Fest - NEXUS 2026',
      category: 'Event',
      description: 'Join us for 3 days of hackathons, robotics challenges, guest lectures by industry leaders, and tech project showcases.',
      date: '2026-09-02',
      location: 'Main Auditorium & Innovation Lab',
      attachment: '',
      isImportant: true,
      author: 'Student Affairs Council'
    },
    {
      _id: 'n3',
      title: 'Admissions Open for Academic Year 2026-2027',
      category: 'Notice',
      description: 'Online applications are officially open for B.Tech, M.Tech, and MBA degree courses. Early bird scholarship applications close Sept 30.',
      date: '2026-08-10',
      location: 'Admission Portal',
      attachment: '',
      isImportant: false,
      author: 'Admissions Office'
    },
    {
      _id: 'n4',
      title: 'Circular: Campus Green Initiative & E-Waste Drive',
      category: 'Circular',
      description: 'All departments are requested to deposit unused electronic hardware at the recycling hub in Block B by Friday.',
      date: '2026-08-05',
      location: 'Block B Ground Floor',
      attachment: '',
      isImportant: false,
      author: 'Dean of Student Welfare'
    }
  ],
  admissions: [
    {
      _id: 'a1',
      applicationNo: 'ADM-2026-8901',
      studentName: 'Julian Miller',
      email: 'julian.miller@gmail.com',
      phone: '+1 (555) 987-6543',
      gender: 'Male',
      dob: '2005-04-12',
      courseApplied: 'B.Tech in Computer Science & Engineering',
      department: 'Computer Science',
      address: '742 Evergreen Terrace, Springfield',
      marksPercentage: '92.4%',
      documentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status: 'Approved',
      adminComments: 'Verified 10+2 transcripts. Eligible for Merit Scholarship Band A.',
      createdAt: new Date('2026-08-01')
    },
    {
      _id: 'a2',
      applicationNo: 'ADM-2026-8902',
      studentName: 'Samantha Reed',
      email: 'samantha.reed@yahoo.com',
      phone: '+1 (555) 876-5432',
      gender: 'Female',
      dob: '2004-11-20',
      courseApplied: 'Master of Business Administration (MBA)',
      department: 'Management',
      address: '100 Ocean Drive, Miami, FL',
      marksPercentage: '88.5%',
      documentUrl: '',
      status: 'Pending',
      adminComments: 'Under review by Admissions Committee.',
      createdAt: new Date('2026-08-11')
    }
  ],
  gallery: [
    {
      _id: 'g1',
      title: 'IIT KHARAGPUR Main Academic Building & Clock Tower',
      category: 'Campus',
      type: 'image',
      url: '/iit_kharagpur_main.jpg',
      description: 'Iconic main building facade, fountain circle, and historic clock tower at IIT Kharagpur.'
    },
    {
      _id: 'g2',
      title: 'IIT KHARAGPUR Panoramic Aerial Campus View',
      category: 'Campus',
      type: 'image',
      url: '/iit_kharagpur_aerial.jpg',
      description: 'Bird-eye drone perspective of the 2,100-acre lush green campus and stadium dome.'
    },
    {
      _id: 'g3',
      title: 'IIT KHARAGPUR Sunset Horizon & Illumination',
      category: 'Campus',
      type: 'image',
      url: '/iit_kharagpur_sunset.jpg',
      description: 'Breathtaking sunset glow over the main building and campus dome.'
    },
    {
      _id: 'g2',
      title: 'Annual Sports Tournament Finals',
      category: 'Sports',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      description: 'Championship football match at the main college stadium.'
    },
    {
      _id: 'g3',
      title: 'Central Library & Digital Resource Hub',
      category: 'Campus',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800',
      description: 'Over 100,000 printed books and 24/7 digital journal subscriptions.'
    },
    {
      _id: 'g4',
      title: 'Cultural Night & Musical Performances',
      category: 'Cultural',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      description: 'Students celebrating annual cultural diversity evening.'
    },
    {
      _id: 'g5',
      title: 'Campus Overview Drone Video Highlight',
      category: 'Videos',
      type: 'video',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'Aerial view of our 120-acre lush green tech campus.'
    }
  ],
  materials: [
    {
      _id: 'm1',
      title: 'Data Structures & Algorithms Master Lecture Notes (PDF)',
      category: 'Study Material',
      department: 'Computer Science',
      semester: 'Semester 3',
      course: 'CSE-101',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      description: 'Comprehensive slides, code examples, and practice questions for Tree & Graph algorithms.',
      uploadedBy: 'Dr. Robert Vance'
    },
    {
      _id: 'm2',
      title: 'Computer Science Department Fall 2026 Class Timetable',
      category: 'Timetable',
      department: 'Computer Science',
      semester: 'All Semesters',
      course: 'All Courses',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      description: 'Weekly schedule for lectures, lab sessions, and tutorial hours.',
      uploadedBy: 'Academic Coordinator'
    },
    {
      _id: 'm3',
      title: 'Mid-Term Result Notification - B.Tech CSE Batch 2024-2028',
      category: 'Result',
      department: 'Computer Science',
      semester: 'Semester 4',
      course: 'CSE-101',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      description: 'Official marks sheet and SGPA score sheet.',
      uploadedBy: 'Exam Cell'
    }
  ],
  contacts: [
    {
      _id: 'cnt1',
      name: 'David Miller',
      email: 'david.m@gmail.com',
      phone: '+1 (555) 123-9999',
      subject: 'Inquiry regarding B.Tech CSE Admissions',
      message: 'Hello, I would like to know if lateral entry admissions are available for diploma holders?',
      status: 'New',
      createdAt: new Date()
    }
  ]
};

const seedDatabase = async () => {
  if (getIsConnected()) {
    try {
      await User.deleteMany();
      await Course.deleteMany();
      await Faculty.deleteMany();
      await Notice.deleteMany();
      await Admission.deleteMany();
      await Gallery.deleteMany();
      await Material.deleteMany();
      await Contact.deleteMany();

      const stripId = (arr) => arr.map(({ _id, ...rest }) => rest);

      for (const u of mockStore.users) {
        const { _id, ...userWithoutId } = u;
        await User.create(userWithoutId);
      }
      await Course.insertMany(stripId(mockStore.courses));
      await Faculty.insertMany(stripId(mockStore.faculty));
      await Notice.insertMany(stripId(mockStore.notices));
      await Admission.insertMany(stripId(mockStore.admissions));
      await Gallery.insertMany(stripId(mockStore.gallery));
      await Material.insertMany(stripId(mockStore.materials));
      await Contact.insertMany(stripId(mockStore.contacts));

      console.log('Database successfully seeded with realistic college sample data!');
    } catch (err) {
      console.error('Error seeding database:', err);
    }
  } else {
    console.log('In-memory database initialized with realistic sample data!');
  }
};

module.exports = { mockStore, seedDatabase };
