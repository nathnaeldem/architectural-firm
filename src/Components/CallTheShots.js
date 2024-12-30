import React from "react";
import { FcBusinessman } from "react-icons/fc";
import { MdArchitecture,MdHome } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import  './CallTheShotss.css'
import { Link } from "react-router-dom";


const CallTheShots = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>OUR SERVICES</h2>
      <div style={styles.features}>
        {/* Feature 1 */}
        <div style={styles.feature}>
          <MdArchitecture  style={styles.icon}  />
          <h3 style={styles.subHeading}>ARCHITECTURAL DESIGN</h3>
          <p style={styles.text}>
            Transform your ideas into stunning architectural designs that reflect your vision.
          </p>
        </div>
        {/* Feature 2 */}
        <div style={styles.feature}>
          <FcBusinessman style={styles.icon} />
          <h3 style={styles.subHeading}>PROJECT CONSULTATION</h3>
          <p style={styles.text}>
            Get expert advice to streamline your project and ensure successful outcomes.
          </p>
        </div>
        {/* Feature 3 */}
        <div style={styles.feature}>
          <MdHome style={styles.icon} />
          <h3 style={styles.subHeading}>INTERIOR PLANNING</h3>
          <p style={styles.text}>
            Design your space with our tailored interior planning services for optimal functionality.
          </p>
        </div>
      </div>
     <Link to="/contact "> <button className="buttonStyle"><FaClock /> Book an apointment</button></Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "80px 40px", // Doubled padding
    backgroundColor: "rgb(208, 223, 235)",
  },
  heading: {
    fontSize: "56px", // Doubled font size
    color: "#003366",
    
    fontWeight: "bolder",
    marginBottom: "60px", // Scaled spacing
  },
  features: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "80px", // Increased gap between features
  },
  feature: {
    maxWidth: "300px",
    textAlign: "center",
  },
  icon: {
    fontSize: "80px", // Doubled icon size
    color: "orangered",
    marginBottom: "40px", // Scaled spacing
  },
  subHeading: {
    fontSize: "36px", // Doubled font size
    fontWeight: "bold",
    color: "#003366",
    marginBottom: "20px",
  },
  text: {
    fontSize: "22px", // Doubled font size
    color: "#333333",
    lineHeight: "1", // Scaled line height for readability
  },
 
};

export default CallTheShots;
