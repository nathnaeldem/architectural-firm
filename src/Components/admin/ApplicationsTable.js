import React, { useEffect, useState } from 'react';

const ApplicationsTable = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('arega/getApplications.php') // Replace with your API URL
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const text = await response.text();
                try {
                    return JSON.parse(text);
                } catch (err) {
                    throw new Error(`Invalid JSON: ${text}`);
                }
            })
            .then((data) => {
                setApplications(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setError(error);
                setLoading(false);
            });
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Applications</h1>
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Position</th>
                        <th>Experience</th>
                        <th>Cover Letter</th>
                        <th>Submitted At</th>
                        <th>Resume</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.full_name}</td>
                            <td>{app.email}</td>
                            <td>{app.phone}</td>
                            <td>{app.position}</td>
                            <td>{app.experience}</td>
                            <td>{app.cover_letter || 'N/A'}</td>
                            <td>{new Date(app.submitted_at).toLocaleString()}</td>
                            <td>
                                {app.resume_content ? (
                                    <a
                                        href={`data:application/pdf;base64,${app.resume_content}`}
                                        download={app.resume_name || 'resume.pdf'}
                                    >
                                        Download Resume
                                    </a>
                                ) : (
                                    'No Resume'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationsTable;
