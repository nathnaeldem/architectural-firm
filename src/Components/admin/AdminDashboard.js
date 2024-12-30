import React, { useState } from 'react';
import Registration from './Registration'; // Adjusted path
import TaskChecker from './TaskChecker'; // Adjusted path
import AdminTaskUploader from './AdminTaskUploader'; // Adjusted path
import AnnouncementManager from './AnnouncementManager'; // Adjusted path
import Moderator from './Moderator';
import styles from './AdminDashboard.module.css';
import ProjectManager from './ProjectManager'
import {
  LuLayoutDashboard,
  LuListTodo,
  LuUsers,
  LuBuilding,
  LuSpeaker,
  LuFileLock,
  LuFileEdit,
  LuLuggage
} from 'react-icons/lu';
import ApplicationsTable from './ApplicationsTable';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  // Logout function to destroy the token
  const logout = () => {
    localStorage.removeItem('authToken'); // Adjust if you're using sessionStorage or cookies
    window.location.href = '/'; // Redirect to login page after logout
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return (
          <div className={styles.adminGrid}>
            <div className={styles.adminCard}>
              <h3>
                TOTAL USERS <LuUsers />
              </h3>
              <p>250</p>
            </div>
            <div className={styles.adminCard}>
              <h3>
                TOTAL PROJECTS <LuBuilding />
              </h3>
              <p>45</p>
            </div>
            <div className={styles.adminCard}>
              <h3>
                ANNOUNCEMENTS <LuSpeaker />
              </h3>
              <p>12</p>
            </div>
          </div>
        );
      case 'registration':
        return <Registration />;
      case 'tasku':
        return <AdminTaskUploader />;
      case 'announce':
        return <AnnouncementManager />;
      case 'mod':
        return <Moderator />;
      case 'task':
        return <TaskChecker />;
        case 'app':
        return <ProjectManager />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ minHeight: '4.5rem', background: '#2c3e50' }}></div>
      <div className={styles.adminDashboard}>
        <div className={styles.adminSidebar}>
          <h2 style={{ color: 'aliceblue' }}>
            <LuFileLock /> ADMIN PANEL
          </h2>
          <nav>
            <h4
              onClick={() => setActiveComponent('dashboard')}
              className={styles.adminNavLink}
            >
              <LuLayoutDashboard /> Dashboard
            </h4>
            <h4
              onClick={() => setActiveComponent('registration')}
              className={styles.adminNavLink}
            >
              <LuUsers /> Users
            </h4>
            <h4
              onClick={() => setActiveComponent('tasku')}
              className={styles.adminNavLink}
            >
              <LuListTodo /> Task Manager
            </h4>
            <h4
              onClick={() => setActiveComponent('announce')}
              className={styles.adminNavLink}
            >
              <LuSpeaker /> Announcements
            </h4>
            <h4
              onClick={() => setActiveComponent('mod')}
              className={styles.adminNavLink}
            >
              <LuFileEdit /> Moderator
            </h4>
            <h4
              onClick={() => setActiveComponent('app')}
              className={styles.adminNavLink}
            >
              <LuLuggage /> Applications
            </h4>
          </nav>
        </div>
        <div className={styles.adminContent}>{renderContent()}</div>

        {/* Hovering Logout Button */}
        <button className={styles.logoutButton} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
