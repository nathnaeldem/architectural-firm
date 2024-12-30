import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { MdWifiCalling3 } from "react-icons/md";
import { IoMailSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <nav className="navbar">
            <Link to="/" className='logo'>Ha<j style={{color:'aliceblue'}}>fa</j></Link>
            <div className={`Nlinks ${isMobileMenuOpen ? 'mobile' : ''}`}>
                <Link 
                    to="/" 
                    className={isActive('/')}
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        document.body.style.overflow = 'auto';
                    }}
                >
                    Home
                </Link>
                <Link 
                    to="/projects" 
                    className={isActive('/projects')}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Projects
                </Link>
                <Link 
                    to="/about" 
                    className={isActive('/about')}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    About
                </Link>
                <Link 
                    to="/contact" 
                    className={isActive('/contact')}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Contact
                </Link>
                <Link 
                    to="/announcements" 
                    className={isActive('/announcements')}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Announcements
                </Link>
                {/* <Link 
                    to="/project-manager" 
                    className={isActive('/P')}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    pm
                </Link> */}
                <Link to="/contact" style={{color:'#4B96B4'}}><MdWifiCalling3/></Link>
                <Link to="/contact" style={{color:'#4B96B4'}}><IoMailSharp/></Link>
            </div>
            <div className='HireButton'>
                <Link to="/contact">
                    <button>Hire Us</button>
                </Link>
            </div>
            <div>
                <Link to="/admin">
                <MdAccountCircle style={{fontSize:'2.5rem',color:'white'}}/>
                </Link>
            </div>
            <div 
                className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
                onClick={toggleMobileMenu}
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
