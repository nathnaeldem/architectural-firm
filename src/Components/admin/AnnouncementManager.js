import React, { useState } from 'react';
import './AnnouncementManager.css';

const AnnouncementManager = () => {
  const [formType, setFormType] = useState('announcement');
  const [announcement, setAnnouncement] = useState({
    date: '',
    title: '',
    content: '',
    link: ''
  });
  const [vacancy, setVacancy] = useState({
    title: '',
    location: '',
    type: '',
    description: ''
  });

  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleVacancyChange = (e) => {
    const { name, value } = e.target;
    setVacancy((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnnouncementSubmit = async () => {
    try {
      const response = await fetch('arega/addAnnouncement.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcement)
      });
      const data = await response.json();
      if (data.success) alert('Announcement added successfully!');
      else alert('Error: ' + data.error);
    } catch (error) {
      console.error('Error submitting announcement:', error);
    }
  };

  const handleVacancySubmit = async () => {
    try {
      const response = await fetch('arega/addVaccancy.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vacancy)
      });
      const data = await response.json();
      if (data.success) alert('Vacancy added successfully!');
      else alert('Error: ' + data.error);
    } catch (error) {
      console.error('Error submitting vacancy:', error);
    }
  };

  const preventEnterSubmit = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <div className="admin-form-container">
      
      <div className="form-type-toggle">
        <button
          className={formType === 'announcement' ? 'active' : ''}
          onClick={() => setFormType('announcement')}
        >
          Add Announcement
        </button>
        <button
          className={formType === 'vacancy' ? 'active' : ''}
          onClick={() => setFormType('vacancy')}
        >
          Add Vacancy
        </button>
      </div>

      {formType === 'announcement' ? (
        <form className="admin-form" onKeyDown={preventEnterSubmit}>
          <h2>Add Announcement</h2>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={announcement.date}
              onChange={handleAnnouncementChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={announcement.title}
              onChange={handleAnnouncementChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={announcement.content}
              onChange={handleAnnouncementChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Link (optional)</label>
            <input
              type="text"
              name="link"
              value={announcement.link}
              onChange={handleAnnouncementChange}
            />
          </div>
          <button
            type="button"
            className="submit-btn"
            onClick={handleAnnouncementSubmit}
          >
            Submit
          </button>
        </form>
      ) : (
        <form className="admin-form" onKeyDown={preventEnterSubmit}>
          <h2>Add Vacancy</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={vacancy.title}
              onChange={handleVacancyChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={vacancy.location}
              onChange={handleVacancyChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={vacancy.type}
              onChange={handleVacancyChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={vacancy.description}
              onChange={handleVacancyChange}
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="submit-btn"
            onClick={handleVacancySubmit}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AnnouncementManager;
