import React, { useEffect, useState } from 'react';
import './Home.css';
import residential from './residential.png';
import avatar from './avatar.png';
import CallTheShots from './CallTheShots';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    // Fetch featured projects from the PHP API
    fetch("arega/getFeaturedProjects.php")
      .then((response) => response.json())
      .then((data) => setFeaturedProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className='hero-container2'>
        <section className="hero">
          <div className="hero-content">
            <h3 className="welcome-text">Welcome, We are</h3>
            <div className="content-wrapper">
              <h1 className="company-name">Hafa</h1>
              <h1 className="company-subtitle">Architects & Consultancy</h1>
              <p>
                Creating innovative spaces that inspire and transform lives
                through exceptional architectural design and consultancy services
              </p>
             <Link to="/about"> <button className="cta-button">Explore Our Vision</button> </Link>
            </div>
          </div>
          <div className="hero-image"><img src={residential} alt="hero" /></div>
        </section>
      </div>

      {/* Services Section */}
      <CallTheShots />

      {/* Featured Projects */}
      <section className="featured-projects-section">
        <h2 className="featured-projects-title">Featured Projects</h2>
        <div className="featured-projects-grid">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <div key={project.id} className="featured-project-card">
                {/* Display the project image */}
                <div
                  className="placeholder-image"
                  style={{
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={`data:image/jpeg;base64,${project.image}`}
                    alt={project.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit:'cover',
                    }}
                  />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>Location: {project.location}</p>
                  <button className="learn-more">Learn More</button>
                </div>
              </div>
            ))
          ) : (
            <p>No featured projects available.</p>
          )}
        </div>
       <Link to="/projects"><button className="view-more-projects-button" onClick={() => window.location.href='/projects'}>
          View More Projects
        </button>
        </Link> 
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-grid">
          {[1, 2].map((item) => (
            <div key={item} className="testimonial-card">
              <p>
                "Exceptional service and outstanding results. The team's attention to detail and innovative solutions exceeded our expectations."
              </p>
              <div className="client-info">
                <div className="client-avatar">
                  <img
                    style={{
                      backgroundColor: '#e5e5e5',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                    }}
                    src={avatar}
                    alt="avatar"
                  />
                </div>
                <div>
                  <h4>Client Name {item}</h4>
                  <p>CEO, Company {item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <div className='contactCtaConatiner'>
        <section className="contact-cta">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's discuss how we can bring your vision to life</p>
         <Link to="/contact"> <button className="contact-button">Contact Us</button> </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
