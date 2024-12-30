import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';
import { motion, AnimatePresence } from 'framer-motion';
import {  FaExpand } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('arega/read.php');
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  

  const filterProjects = (category) => {
    setFilter(category);
  };

  return (
    <div className="projects-container">
      <section style={{borderRadius:'20px',margin:'0 50px 4rem 50px'}} className="projects-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="projects-hero-content"
        >
          <h1>Our Projects</h1>
          <p>Explore our architectural masterpieces</p>
        </motion.div>
      </section>

      <section className="projects-filter">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => filterProjects('all')}
        >
          All
        </button>
        <button 
          className={filter === 'residential' ? 'active' : ''} 
          onClick={() => filterProjects('residential')}
        >
          Residential
        </button>
        <button 
          className={filter === 'commercial' ? 'active' : ''} 
          onClick={() => filterProjects('commercial')}
        >
          Commercial
        </button>
        <button 
          className={filter === 'interior' ? 'active' : ''} 
          onClick={() => filterProjects('governmental')} 
        >
          Interior
        </button>
      </section>

      <section className="projects-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-image">
            <img src={project.image} alt={project.title} />

              <div className="project-overlay">
                <FaExpand />
              </div>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.location}</p>
              <span className="project-category">{project.category}</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-content">
              <button className="close-modal" onClick={() => setSelectedProject(null)}>×</button>
              <img src={selectedProject.image} alt={selectedProject.title} />
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              <div className="project-details">
                <div>
                  <h4>Location</h4>
                  <p>{selectedProject.location}</p>
                </div>
                <div>
                  <h4>Year</h4>
                  <p>{selectedProject.year}</p>
                </div>
                <div>
                  <h4>Category</h4>
                  <p>{selectedProject.category}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects; 