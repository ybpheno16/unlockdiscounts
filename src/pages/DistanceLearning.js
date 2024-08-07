import React, { useState } from 'react';
import './distancelearning.css'; // Import CSS file for the Distance Learning page

const feeStructure = {

  // Jain university::

  "Jain University": {
    "B.Com": {
      specializations: {
        "International Finance and Accounting  (ACCA, UK)": { internationalFee: 2200, domesticFee: 120000 },
        "Accounting & Finance": { internationalFee: 800, domesticFee: 42500 },
        "Corporate Accounting": { internationalFee: 800, domesticFee: 42500 }
      }
    },
    "BBA": {
      specializations: {
        "Marketing": { internationalFee: 1000, domesticFee: 55000 },
        "Human Resource Management": { internationalFee: 1000, domesticFee: 55000 },
        "Finance": { internationalFee: 1000, domesticFee: 55000 }
      }
    },
    "M.Com": {
      specializations: {
        "International Finance (ACCA, UK)": { internationalFee: 2000, domesticFee: 110000 },
        "Accounting & Finance": { internationalFee: 950, domesticFee: 52500 }
      }
    },
    "MBA": {
      specializations: {
        "Human Resource Management": { internationalFee: 1450, domesticFee: 80000 },
        "Finance": { internationalFee: 1450, domesticFee: 80000 },
        "Marketing": { internationalFee: 1450, domesticFee: 80000 },
        "General Management": { internationalFee: 1450, domesticFee: 80000 },
        "Systems and Operations Management": { internationalFee: 1450, domesticFee: 80000 },
        "Finance and Marketing": { internationalFee: 1700, domesticFee: 90000 },
        "Human Resource Management and Finance": { internationalFee: 1700, domesticFee: 90000 },
        "Marketing and Human Resource Management": { internationalFee: 1700, domesticFee: 90000 },
        "Project Management": { internationalFee: 1700, domesticFee: 90000 },
        "Information Technology Management": { internationalFee: 1700, domesticFee: 90000 },
        "Healthcare Management": { internationalFee: 1700, domesticFee: 90000 },
        "Logistics & Supply Chain Management": { internationalFee: 1700, domesticFee: 90000 },
        "Business Intelligence & Analytics": { internationalFee: 1700, domesticFee: 90000 },
        "Entrepreneurship and Leadership": { internationalFee: 1700, domesticFee: 90000 },
        "International Finance (Accredited by ACCA, UK)": { internationalFee: 2300, domesticFee: 130000 },
        "International Business Management": { internationalFee: 1700, domesticFee: 90000 },
        "Sports Management": { internationalFee: 1700, domesticFee: 90000 }
      }
    },
    "MCA": {
      specializations: {
        "Computer Science & IT": { internationalFee: 1300, domesticFee: 75000 },
        "Cyber Security": { internationalFee: 1300, domesticFee: 75000 },
        "Data Analytics": { internationalFee: 1300, domesticFee: 75000 }
      }
    },
    "M.A": {
      specializations: {
        "English": { internationalFee: 900, domesticFee: 45000 },
        "Public Policy": { internationalFee: 900, domesticFee: 45000 },
        "Economics": { internationalFee: 900, domesticFee: 45000 }
      }
    }
  },
  

  //symbiosis university::

  "Symbiosis University": {
    "Diploma": {
      specializations: {
        "Creative Writing in English": {internationalFee: null, domesticFee: 14000},
        "English Language Teaching": {internationalFee: null, domesticFee: 16500}
      }
    },
    "PG Diploma": {
      specializations: {
        "PGDBA": { internationalFee: null, domesticFee: 20000 },
        "PGDIB": { internationalFee: null, domesticFee: 22000 },
        "PGDDS": { internationalFee: null, domesticFee: 24000 },
        "PGDRM": { internationalFee: null, domesticFee: 19000 },
        "PGDPM": { internationalFee: null, domesticFee: 25000 }
      }
    },
    "PG Certificate": {
      specializations: {
        "Business Analytics": { internationalFee: null, domesticFee: 17500 },
        "FinTech": { internationalFee: null, domesticFee: 18000 },
        "Healthcare Mgmt": { internationalFee: null, domesticFee: 19000 },
        "Cyber Laws": { internationalFee: null, domesticFee: 20000 },
        "Digital Marketing": { internationalFee: null, domesticFee: 18000 }
      }
    },
    "SCDL DDE Management": {
      specializations: {
        "PGDBA": { internationalFee: null, domesticFee: 20000 },
        "PGDHRM": { internationalFee: null, domesticFee: 24000 },
        "PGDIB": { internationalFee: null, domesticFee: 22000 },
        "PGDPM": { internationalFee: null, domesticFee: 25000 }
      }
    },
    "SCDL DDE IT and Computer Courses": {
      specializations: {
        "PGDIT": { internationalFee: null, domesticFee: 22000 },
        "Certificate in AWS Solutions Architect": { internationalFee: null, domesticFee: 30000 },
        "Certificate in Blockchain Technology": { internationalFee: null, domesticFee: 25000 }
      }
    },
    "SCDL Distance UG Diploma": {
      specializations: {
        "Diploma in Creative Writing in English": { internationalFee: null, domesticFee: 14000 },
        "Diploma in English Language Teaching": { internationalFee: null, domesticFee: 16500 }
      }
    },
    "SCDL Distance PG Diploma": {
      specializations: {
        "PGDBA": { internationalFee: null, domesticFee: 20000 },
        "PGDIB": { internationalFee: null, domesticFee: 22000 },
        "PGDDS": { internationalFee: null, domesticFee: 24000 },
        "PGDRM": { internationalFee: null, domesticFee: 19000 },
        "PGDPM": { internationalFee: null, domesticFee: 25000 }
      }
    },
    "SCDL Diploma & PG Certificate Courses": {
      specializations: {
        "PG Certificate in Business Analytics": { internationalFee: null, domesticFee: 17500 },
        "PG Certificate in FinTech": { internationalFee: null, domesticFee: 18000 },
        "PG Certificate in Healthcare Mgmt": { internationalFee: null, domesticFee: 19000 },
        "PG Certificate in Cyber Laws": { internationalFee: null, domesticFee: 20000 },
        "PG Certificate in Digital Marketing": { internationalFee: null, domesticFee: 18000 }
      }
    }
  },


// sharda university::

  "Sharda University": {
    "BBA": {
      specializations: {
        "International Finance (Accredited by ACCA, UK)": { domesticFee: 85000, internationalFee: 1500 },
        "General": { domesticFee: 35000, internationalFee: 600 }
      }
    },
    "BA (Hons.)": {
      specializations: {
        "Political Science": { domesticFee: 35000, internationalFee: 600 }
      }
    },
    "BCA": {
      specializations: {
        "General": { domesticFee: 35000, internationalFee: 600 },
        "Finance": { domesticFee: 50000, internationalFee: 900 },
        "Marketing": { domesticFee: 50000, internationalFee: 900 }
      }
    },
    "MBA": {
      specializations: {
        "Human Resource Management": { domesticFee: 50000, internationalFee: 900 },
        "Data Science and Analytics": { domesticFee: 50000, internationalFee: 900 },
        "Operations Management": { domesticFee: 50000, internationalFee: 900 },
        "International Business": { domesticFee: 50000, internationalFee: 900 },
        "Project Management": { domesticFee: 50000, internationalFee: 900 },
        "Logistics and Supply Chain Management": { domesticFee: 50000, internationalFee: 900 },
        "Digital Marketing and E-commerce": { domesticFee: 50000, internationalFee: 900 },
        "International Finance (Accredited by ACCA, UK)": { domesticFee: 85000, internationalFee: 1500 },
        "Healthcare and hospital administration": { domesticFee: 50000, internationalFee: 900 }
      }
    },
    "MCA": {
      specializations: {
        "Computer Science and Information Technology": { domesticFee: 50000, internationalFee: 900 },
        "Data Science": { domesticFee: 50000, internationalFee: 900 },
        "Artificial Intelligence": { domesticFee: 50000, internationalFee: 900 },
        "Cyber Security": { domesticFee: 50000, internationalFee: 900 },
        "Cloud Computing": { domesticFee: 50000, internationalFee: 900 }
      }
    },
    "M.Com": {
      specializations: {
        "Accounting and Finance": { domesticFee: 35000, internationalFee: 600 },
        "International Finance (Accredited by ACCA, UK)": { domesticFee: 100000, internationalFee: 2300 }
      }
    }
  },

  // amity university::

  "Amity University": {
    "BBA": {
      specializations: {
        "General": { domesticFee: 55000, internationalFee: null }
      }
    },
    "BA (Hons.)": {
      specializations: {
        "General": { domesticFee: 56000, internationalFee: null }
      }
    },
    "BCA": {
      specializations: {
        "General": { domesticFee: 55000, internationalFee: null }
      }
    },
    "BA-MC": {
      specializations: {
        "General": { domesticFee: 53000, internationalFee: null }
      }
    },
    "B.Com (Vernacular)": {
      specializations: {
        "General": { domesticFee: 33000, internationalFee: null }
      }
    },
    "MBA": {
      specializations: {
        "General": { domesticFee: 85000, internationalFee: null }
      }
    },
    "MA-MC": {
      specializations: {
        "General": { domesticFee: 85000, internationalFee: null }
      }
    },
    "MA-PG": {
      specializations: {
        "General": { domesticFee: 85000, internationalFee: null }
      }
    },
    "M.Com-FM": {
      specializations: {
        "General": { domesticFee: 85000, internationalFee: null }
      }
    }
  }
 };


const DistanceLearning = () => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [fee, setFee] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    interestedCourse: '',
    studentType: ''
  });
  const [notification, setNotification] = useState('');

  const getCollegeOptions = () => Object.keys(feeStructure).map(college => ({
    label: college,
    value: college
  }));

  const getCourseOptions = () => {
    if (selectedCollege && feeStructure[selectedCollege]) {
      return Object.keys(feeStructure[selectedCollege]).map(course => ({
        label: course,
        value: course
      }));
    }
    return [];
  };

  const getSpecializationOptions = () => {
    if (selectedCollege && selectedCourse && feeStructure[selectedCollege] && feeStructure[selectedCollege][selectedCourse]) {
      return Object.keys(feeStructure[selectedCollege][selectedCourse].specializations).map(spec => ({
        label: spec,
        value: spec
      }));
    }
    return [];
  };

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
    setSelectedCourse('');
    setSelectedSpecialization('');
    setFee(null);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setSelectedSpecialization('');
    setFee(null);
  };

  const handleSpecializationChange = (event) => setSelectedSpecialization(event.target.value);

  const handleStudentTypeChange = (event) => setFormData({ ...formData, studentType: event.target.value });

  const calculateFee = () => {
    if (selectedCollege && selectedCourse && selectedSpecialization) {
      const specializationFee = formData.studentType === 'international'
        ? feeStructure[selectedCollege][selectedCourse].specializations[selectedSpecialization].internationalFee
        : feeStructure[selectedCollege][selectedCourse].specializations[selectedSpecialization].domesticFee;
      setFee(2.5 * specializationFee);
    }
  };

  const handleFormChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const whatsappMessage = `Name: ${formData.name}\nContact: ${formData.contact}\nInterested Course: ${formData.interestedCourse}`;
    const whatsappUrl = `https://wa.me/+91-9620342989?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    setNotification('Please give us some time and we will revert back to you soon.');
    setShowPopup(false);
  };

  const handleScroll = (event) => {
    event.preventDefault();
    const feeCalculatorSection = document.getElementById('feeCalculatorSection');
    if (feeCalculatorSection) {
      feeCalculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dls-container">
      <h1 className="dls-title">Distance Learning</h1>
      <p className="dls-description">
        Discover our distance learning courses and enhance your knowledge from anywhere.
      </p>
      <div className="fee-calculator-container">
        <header className="dls-header">
          <a href="#feeCalculatorSection" onClick={handleScroll}>
            <h1>Online batch admission of 2024 is going on!</h1>
            <h2>Fee calculator - Check It Now!</h2>
          </a>
        </header>
        <section className="dls-courses">
          {[
            { name: 'MBA', description: 'A graduate program focusing on business management, leadership, and strategic decision-making.' },
            { name: 'MCA', description: 'A postgraduate course emphasizing advanced computer science, software development, and IT management.' },
            { name: 'BCA', description: 'An undergraduate degree focusing on computer science fundamentals, software development, and applications.' },
            { name: 'BCOM', description: 'An undergraduate program covering various aspects of commerce, finance, accounting, and business studies.' },
            { name: 'MA', description: 'A postgraduate degree in humanities or social sciences, focusing on advanced studies in a specific discipline like literature, history, or sociology.' }
          ].map(course => (
            <div className="dls-course" key={course.name}>
              <i className="fas fa-book-open-reader"></i>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <button onClick={() => { setShowPopup(true); setFormData({ ...formData, interestedCourse: course.name }); }}>Inquire</button>
            </div>
          ))}
        </section>
        <section className="dls-fee-calculator" id="feeCalculatorSection">
          <h2>Calculate Your Fees</h2>
          <form id="feeCalculatorForm" className="dls-form">
            <div className="dls-form-group">
              <label htmlFor="college">Select College:</label>
              <select id="college" value={selectedCollege} onChange={handleCollegeChange}>
                <option value="">Select a College</option>
                {getCollegeOptions().map(college => (
                  <option key={college.value} value={college.value}>{college.label}</option>
                ))}
              </select>
            </div>
            <div className="dls-form-group">
              <label htmlFor="course">Select Course:</label>
              <select id="course" value={selectedCourse} onChange={handleCourseChange} disabled={!selectedCollege}>
                <option value="">Select a Course</option>
                {getCourseOptions().map(course => (
                  <option key={course.value} value={course.value}>{course.label}</option>
                ))}
              </select>
            </div>
            <div className="dls-form-group">
              <label htmlFor="specialization">Select Specialization:</label>
              <select id="specialization" value={selectedSpecialization} onChange={handleSpecializationChange} disabled={!selectedCourse}>
                <option value="">Select a Specialization</option>
                {getSpecializationOptions().map(spec => (
                  <option key={spec.value} value={spec.value}>{spec.label}</option>
                ))}
              </select>
            </div>
            <div className="dls-form-group">
              <label>Are you a domestic or international student?</label>
              <div className="student-type-dropdown">
                <select
                  name="studentType"
                  value={formData.studentType}
                  onChange={handleStudentTypeChange}
                >
                  <option value="" disabled>Select one</option>
                  <option value="domestic">Domestic (Indian)</option>
                  <option value="international">International</option>
                </select>
              </div>
            </div>
            <div className="dls-form-group">
              <button type="button" onClick={calculateFee}>Calculate Fee</button>
            </div>
          </form>
          <div id="result" className={`dls-result ${fee !== null ? 'show highlight' : ''}`}>
            {fee !== null ? (
              <div>
                <p>
                  The fee for the selected course and specialization is:
                </p>
                <p>
                  {formData.studentType === 'international' ? (
                    <span><strong>International:</strong> ${fee}</span>
                  ) : (
                    <span><strong>Domestic:</strong> Rs.{fee}</span>
                  )}
                </p>
              </div>
            ) : (
              <p>Please select a college, course, and specialization to calculate the fee.</p>
            )}
          </div>
        </section>
      </div>
      {showPopup && (
        <div className="dls-popup">
          <div className="dls-popup-content">
            <button className="dls-close-button" onClick={() => setShowPopup(false)}>×</button>
            <h2>Inquire About {formData.interestedCourse}</h2>
            <form onSubmit={handleSubmit}>
              <div className="dls-form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="dls-form-group">
                <label htmlFor="contact">Contact Number:</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="dls-form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {notification && (
        <div className="dls-notification">
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default DistanceLearning;


