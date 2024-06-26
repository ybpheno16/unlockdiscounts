import React, { useState } from 'react';
import './distancelearning.css'; // Import CSS file for the Distance Learning page

const feeStructure = {
  "Jain University": {
    "B.Com": {
      baseFee: 42500,
      specializations: {
        "International Finance and Accounting  (ACCA, UK)": { internationalFee: 2200, domesticFee: 120000 },
        "Accounting & Finance": { internationalFee: 800, domesticFee: 42500 },
        "Corporate Accounting": { internationalFee: 800, domesticFee: 42500 }
      }
    },
    "BBA": {
      baseFee: 55000,
      specializations: {
        "Marketing": { internationalFee: 1000, domesticFee: 55000 },
        "Human Resource Management": { internationalFee: 1000, domesticFee: 55000 },
        "Finance": { internationalFee: 1000, domesticFee: 55000 }
      }
    },
    "M.Com": {
      baseFee: 52500,
      specializations: {
        "International Finance (ACCA, UK)": { internationalFee: 2000, domesticFee: 110000 },
        "Accounting & Finance": { internationalFee: 950, domesticFee: 52500 }
      }
    },
    "MBA": {
      baseFee: 80000,
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
      baseFee: 130000,
      specializations: {
        "Computer Science & IT": { internationalFee: 1300, domesticFee: 75000 },
        "Cyber Security": { internationalFee: 1300, domesticFee: 75000 },
        "Data Analytics": { internationalFee: 1300, domesticFee: 75000 }
      }
    },
    "M.A": {
      baseFee: 75000,
      specializations: {
        "English": { internationalFee: 900, domesticFee: 45000 },
        "Public Policy": { internationalFee: 900, domesticFee: 45000 },
        "Economics": { internationalFee: 900, domesticFee: 45000 }
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
    interestedCourse: ''
  });
  const [notification, setNotification] = useState('');

  // Function to get list of colleges from feeStructure object
  const getCollegeOptions = () => {
    return Object.keys(feeStructure).map(college => ({
      label: college,
      value: college
    }));
  };

  // Function to get list of courses based on selected college
  const getCourseOptions = () => {
    if (selectedCollege && feeStructure[selectedCollege]) {
      return Object.keys(feeStructure[selectedCollege]).map(course => ({
        label: course,
        value: course
      }));
    }
    return [];
  };

  // Function to get list of specializations based on selected course
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
    const college = event.target.value;
    setSelectedCollege(college);
    setSelectedCourse('');
    setSelectedSpecialization('');
    setFee(null);
  };

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);
    setSelectedSpecialization('');
    setFee(null);
  };

  const handleSpecializationChange = (event) => {
    const specialization = event.target.value;
    setSelectedSpecialization(specialization);
  };

  const handleStudentTypeChange = (event) => {
    const studentType = event.target.value;
    setFormData({ ...formData, studentType });
  };

  const calculateFee = () => {
    if (selectedCollege && selectedCourse && selectedSpecialization) {
      const baseFee = feeStructure[selectedCollege][selectedCourse].baseFee;
      const specializationFee = formData.studentType === 'international'
        ? feeStructure[selectedCollege][selectedCourse].specializations[selectedSpecialization].internationalFee
        : feeStructure[selectedCollege][selectedCourse].specializations[selectedSpecialization].domesticFee;
      const totalFee = specializationFee;
      setFee(totalFee);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const whatsappMessage = `Name: ${formData.name}\nContact: ${formData.contact}\nInterested Course: ${formData.interestedCourse}`;
    const whatsappUrl = `https://wa.me/9620342989?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    setNotification('Please give us some time and we will revert back to you soon.');
    setShowPopup(false);
  };

  return (
    <div className="dls-container">
    <h1 className="dls-title">Distance Learning</h1>
    <p className="dls-description">
      Discover our distance learning courses and enhance your knowledge from anywhere.
    </p>
    <div className="fee-calculator-container">
      <header className="dls-header">
        <h1>Online batch admission of 2024 is going on!</h1>
        <h2>Fee calculator - Check It Now!</h2>
      </header>
      <section className="dls-courses">
          {['MBA', 'MCA', 'BCA', 'BCOM', 'MA'].map(course => (
            <div className="dls-course" key={course}>
              <i className="fas fa-book-open-reader"></i>
              <h3>{course}</h3>
              <p>is simply dummy text of the printing and typesetting industry.</p>
              <button onClick={() => { setShowPopup(true); setFormData({ ...formData, interestedCourse: course }); }}>Inquire</button>
            </div>
          ))}
        </section>
      <section className="dls-fee-calculator">
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
              <div className="student-type-radio">
                <label>
                  <input
                    type="radio"
                    name="studentType"
                    value="domestic"
                    checked={formData.studentType === 'domestic'}
                    onChange={handleStudentTypeChange}
                  />
                  Domestic (Indian)
                </label>
                <label>
                  <input
                    type="radio"
                    name="studentType"
                    value="international"
                    checked={formData.studentType === 'international'}
                    onChange={handleStudentTypeChange}
                  />
                  International
                </label>
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
                    <>
                      <span>USD ${fee}</span>
                    </>
                  ) : (
                    <>
                      <span>₹ {fee.toLocaleString()}</span>
                    </>
                  )}
                </p>
              </div>
            ) : (
              'Please select a college, a course, and a specialization.'
            )}
          </div>
        </section>
        <section className="dls-more-courses">
          <h3>Many more courses with a variety of specializations available! Ping us the inquiry on whatsapp</h3>
          <div className="dls-logos">
            <img src="/distancelearning/Amity.png" alt="Amity University"   />
            <img src="/distancelearning/jain.jpg" alt="JGI" />
            <img src="/distancelearning/Symbiosis.jpg" alt="Symbiosis" />
          </div>
        </section>
      </div>
      {showPopup && (
        <div className="dls-popup">
          <div className="dls-popup-content">
            <h2>Inquire About a Course</h2>
            <form onSubmit={handleSubmit}>
              <div className="dls-form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} required />
              </div>
              <div className="dls-form-group">
                <label htmlFor="contact">Contact:</label>
                <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleFormChange} required />
              </div>
              <div className="dls-form-group">
                <label htmlFor="interestedCourse">Course Interested In:</label>
                <input type="text" id="interestedCourse" name="interestedCourse" value={formData.interestedCourse} readOnly />
              </div>
              <div className="dls-form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
            {notification && <div className="dls-notification">{notification}</div>}
          </div>
          <div className="dls-popup-overlay" onClick={() => setShowPopup(false)}></div>
        </div>
      )}
    </div>
  );
}

export default DistanceLearning;
