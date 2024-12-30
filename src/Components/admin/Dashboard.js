import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import './Dashboard.css';
import ApplicationsTable from './ApplicationsTable';

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        announcements: 0,
        applications: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.getAdminStats();
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Projects</h3>
                    <p>{stats.projects}</p>
                </div>
                <div className="stat-card">
                    <h3>Active Announcements</h3>
                    <p>{stats.announcements}</p>
                </div>
                <div className="stat-card">
                    <h3>Job Applications</h3>
                    <p>{stats.applications}</p>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                    <button onClick={() => window.location.href='/admin/projects/new'}>
                        Add New Project
                    </button>
                    <button onClick={() => window.location.href='/admin/announcements/new'}>
                        Post Announcement
                    </button>
                    <button onClick={() => window.location.href='/admin/applications'}>
                        Review Applications
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 