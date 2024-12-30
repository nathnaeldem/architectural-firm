import React, { useState } from 'react';
import axios from 'axios';
import styles from './ProjectManager.module.css';

const ProjectManager = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    year: '',
    category: 'residential',
    owner: '',
    is_featured: false,
  });

  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append('image', image);

    try {
      const response = await axios.post('arega/pupload.php', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadStatus('Project uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        year: '',
        category: 'residential',
        owner: '',
        is_featured: false,
      });
      setImage(null);
    } catch (error) {
      setUploadStatus('Failed to upload project. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload Project</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Project Location"
          value={formData.location}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year of Completion"
          value={formData.year}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="interior">Interior</option>
          <option value="governmental">Governmental</option>
        </select>
        <input
          type="text"
          name="owner"
          placeholder="Owner Name"
          value={formData.owner}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          Featured Project
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Upload Project
        </button>
      </form>
      {uploadStatus && <p className={styles.status}>{uploadStatus}</p>}
    </div>
  );
};

export default ProjectManager;
