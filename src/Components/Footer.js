// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* About Us Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We are a forward-thinking architectural firm delivering innovative and sustainable designs to shape the world. 
            Let’s create something amazing together.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/announcements">Announcements</Link></li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="footer-section">
          <h3>Our Services</h3>
          <ul>
            <li><Link to="/services">Architectural Design</Link></li>
            <li><Link to="/services">Interior Design</Link></li>
            <li><Link to="/services">Project Management</Link></li>
            <li><Link to="/services">Sustainability Consulting</Link></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Email: arega@gmail.com</p>
          <p>Phone: +251 (926) 517-534</p>
          <p>Address: 456 Design Lane, Creativity City</p>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} hafa. All rights reserved.</p>
        <p>Designed with Nathi by Googsite Team.</p>
      </div>
    </footer>
  );
}

export default Footer;
