import React, { useState, useEffect } from 'react';
import './Announcements.css';
import { motion } from 'framer-motion';
import { FaBriefcase, FaBullhorn } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Announcements = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [announcements, setAnnouncements] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    coverLetter: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('arega/getAnnouncements.php')
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .catch((error) => console.error('Error fetching announcements:', error));
  }, []);

  useEffect(() => {
    fetch('arega/getVacancies.php')
      .then((response) => response.json())
      .then((data) => setVacancies(data))
      .catch((error) => console.error('Error fetching vacancies:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationForm((prev) => ({
        ...prev,
        resume: e.target.files[0],
      }));
    }
  };
  

  const validateForm = () => {
    const newErrors = {};
    if (!applicationForm.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!applicationForm.email.trim()) newErrors.email = 'Email is required.';
    if (!applicationForm.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!applicationForm.experience.trim()) newErrors.experience = 'Experience is required.';
    if (!applicationForm.resume) newErrors.resume = 'Resume is required.';
    // Skip validation for the readOnly position field
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const loadingMessage = 'Submitting application...';
    alert(loadingMessage);

    const formData = new FormData();
    
    // Explicitly add each field to FormData
    formData.append('fullName', applicationForm.fullName);
    formData.append('email', applicationForm.email);
    formData.append('phone', applicationForm.phone);
    formData.append('position', applicationForm.position || selectedJob?.title);
    formData.append('experience', applicationForm.experience);
    formData.append('coverLetter', applicationForm.coverLetter || '');
    
    if (applicationForm.resume) {
      formData.append('resume', applicationForm.resume);
    }

    try {
      const response = await fetch('arega/submitApplication.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      alert(result.message);
      setIsModalOpen(false);
      setApplicationForm({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        resume: null,
        coverLetter: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="announcements-container">
      <section className="announcements-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="announcements-hero-content"
        >
          <h1>Announcements & Careers</h1>
          <p>Stay updated with our latest news and opportunities</p>
        </motion.div>
      </section>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          <FaBullhorn /> Announcements
        </button>
        <button
          className={`tab-btn ${activeTab === 'vacancies' ? 'active' : ''}`}
          onClick={() => setActiveTab('vacancies')}
        >
          <FaBriefcase /> Vacancies
        </button>
      </div>

      {activeTab === 'announcements' ? (
        <section className="announcements-section">
          {announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="announcement-card"
            >
              <div className="announcement-date">{announcement.date}</div>
              <h3>{announcement.title}</h3>
              <p>{announcement.content}</p>
              {announcement.link && (
                <a href={announcement.link} className="read-more">
                  Read More →
                </a>
              )}
            </motion.div>
          ))}
        </section>
      ) : (
        <section className="vacancies-section">
          <div className="vacancies-list">
            {vacancies.map((vacancy) => (
              <motion.div
                key={vacancy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="vacancy-card"
                onClick={() => {
                  setSelectedJob(vacancy);
                  setIsModalOpen(true);
                }}
              >
                <h3>{vacancy.title}</h3>
                <p className="vacancy-location">{vacancy.location}</p>
                <p className="vacancy-type">{vacancy.type}</p>
                <button className="apply-btn">Apply Now</button>
              </motion.div>
            ))}
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="application-modal"
            overlayClassName="application-overlay"
          >
            {selectedJob && (
              <div>
                <h2>Apply for {selectedJob.title}</h2>
                <form onSubmit={handleSubmit} className="application-form">
  <div className="form-group">
    <input
      type="text"
      name="fullName"
      placeholder="Full Name"
      className={errors.fullName ? 'error' : ''}
      onChange={handleInputChange}
    />
    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
  </div>
  <div className="form-group">
    <input
      type="email"
      name="email"
      placeholder="Email"
      className={errors.email ? 'error' : ''}
      onChange={handleInputChange}
    />
    {errors.email && <span className="error-message">{errors.email}</span>}
  </div>
  <div className="form-group">
    <input
      type="text"
      name="phone"
      placeholder="Phone Number"
      className={errors.phone ? 'error' : ''}
      onChange={handleInputChange}
    />
    {errors.phone && <span className="error-message">{errors.phone}</span>}
  </div>
  <div className="form-group">
    <input
      type="text"
      name="position"
      placeholder="Position"
      value={selectedJob?.title || ''}
      readOnly
    />
  </div>
  <div className="form-group">
    <textarea
      name="experience"
      placeholder="Experience"
      className={errors.experience ? 'error' : ''}
      onChange={handleInputChange}
    ></textarea>
    {errors.experience && <span className="error-message">{errors.experience}</span>}
  </div>
  <div className="form-group">
                <input
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                />
                {errors.resume && <span className="error-message">{errors.resume}</span>}
              </div>
  <div className="form-group">
    <textarea
      name="coverLetter"
      placeholder="Cover Letter (Optional)"
      onChange={handleInputChange}
    ></textarea>
  </div>
  <button type="submit" className="submit-btn">
    Submit Application
  </button>
</form>

              </div>
            )}
          </Modal>
        </section>
      )}
    </div>
  );
};

export default Announcements;
