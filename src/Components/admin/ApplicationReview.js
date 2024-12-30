import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import './ApplicationReview.css';

const ApplicationReview = () => {
    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState('pending');
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, [filter]);

    const fetchApplications = async () => {
        try {
            const response = await api.getApplications(filter);
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await api.updateApplicationStatus(id, status);
            fetchApplications();
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    const downloadResume = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="application-review">
            <h2>Job Applications</h2>
            
            <div className="filter-controls">
                <button 
                    className={filter === 'pending' ? 'active' : ''}
                    onClick={() => setFilter('pending')}
                >
                    Pending
                </button>
                <button 
                    className={filter === 'reviewed' ? 'active' : ''}
                    onClick={() => setFilter('reviewed')}
                >
                    Reviewed
                </button>
                <button 
                    className={filter === 'accepted' ? 'active' : ''}
                    onClick={() => setFilter('accepted')}
                >
                    Accepted
                </button>
                <button 
                    className={filter === 'rejected' ? 'active' : ''}
                    onClick={() => setFilter('rejected')}
                >
                    Rejected
                </button>
            </div>

            <div className="applications-list">
                {applications.map(app => (
                    <div key={app.id} className="application-item">
                        <div className="application-header">
                            <h3>{app.full_name}</h3>
                            <span className={`status ${app.status}`}>
                                {app.status}
                            </span>
                        </div>
                        <div className="application-details">
                            <p><strong>Position:</strong> {app.vacancy_title}</p>
                            <p><strong>Email:</strong> {app.email}</p>
                            <p><strong>Phone:</strong> {app.phone}</p>
                            <p><strong>Experience:</strong> {app.experience}</p>
                        </div>
                        <div className="application-actions">
                            <button onClick={() => downloadResume(app.resume_url, `${app.full_name}_resume.pdf`)}>
                                Download Resume
                            </button>
                            <button onClick={() => setSelectedApp(app)}>
                                View Details
                            </button>
                            {app.status === 'pending' && (
                                <>
                                    <button onClick={() => handleStatusChange(app.id, 'accepted')}>
                                        Accept
                                    </button>
                                    <button onClick={() => handleStatusChange(app.id, 'rejected')}>
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {selectedApp && (
                <div className="application-modal">
                    <div className="modal-content">
                        <h2>Application Details</h2>
                        <div className="application-full-details">
                            {/* Full application details */}
                        </div>
                        <button onClick={() => setSelectedApp(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationReview; 