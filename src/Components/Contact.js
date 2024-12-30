import React, { useState } from 'react';
import './Contact.css';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="contact-container">
      <section style={{margin:'0 50px 4rem 50px',borderRadius:'20px'}} className="contact-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="contact-hero-content"
        >
          <h1>Get in Touch</h1>
          <p>Let's discuss your next project</p>
        </motion.div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <FaPhone className="info-icon" />
            <h3>Phone</h3>
            <p>+251 (926) 517-534</p>
            <p>+251 (926) 517-535</p>
          </div>
          
          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <h3>Email</h3>
            <p>info_h@gmail.com</p>
            <p>arega@gmail.com</p>
          </div>
          
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>Location</h3>
            <p>HV23+56W </p>
            <p>Centeral region, Hosaina</p>
          </div>
          
          <div className="info-card">
            <FaClock className="info-icon" />
            <h3>Working Hours</h3>
            <p>Mon - Fri: 9:00 - 18:00</p>
            <p>Sat: 10:00 - 14:00</p>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form-wrapper">
            <div className="contact-form-field">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div className="contact-form-field">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="contact-form-field">
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
            </div>
            
            <div className="contact-form-field">
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows="6"
              ></textarea>
            </div>
            
            <button type="submit" className="contact-submit-btn">Send Message</button>
          </form>
        </div>
      </section>

      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.201543633205!2d37.85294313370807!3d7.550459532656981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b2370079277df9%3A0x13a2b9f758765cec!2sAregahegn%20Defar%20CAE!5e0!3m2!1sen!2set!4v1731391116961!5m2!1sen!2set"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title='map'
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact; 