import React from 'react';
import './About.css';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaProjectDiagram } from 'react-icons/fa';
import areg from './areg.jpg';
const About = () => {
  return (
    <div className="about-container">
      <section style={{margin:'0 50px 4rem 50px'}} className="about-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="about-hero-content"
        >
          <h1>About Hafa</h1>
          <p className="subtitle">Building Dreams, Crafting Spaces</p>
        </motion.div>
      </section>

      <section className="about-stats">
        <div className="stat-card">
          <FaAward className="stat-icon" />
          <h3>5+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <h3>200+</h3>
          <p>Happy Clients</p>
        </div>
        <div className="stat-card">
          <FaProjectDiagram className="stat-icon" />
          <h3>500+</h3>
          <p>Projects Completed</p>
        </div>
      </section>

      <section className="about-story">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>Founded in 2008, Hafa has grown from a small architectural firm to a leading force in innovative design and sustainable architecture. Our journey is marked by unwavering commitment to excellence and creative vision.</p>
        </div>
      </section>

      <section className="team-section">
        <h2>Our Leadership Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="team-card"
            >
              <div className="member-image">
                <img src={areg} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const teamMembers = [
  {
    name: "Aregahegn Defar",
    position: "Principal Architect",
    
  },
  // Add more team members
];

export default About; 