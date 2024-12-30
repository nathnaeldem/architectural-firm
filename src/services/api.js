import axios from 'axios';

const API_BASE_URL = 'http://your-backend-url/api';

export const api = {
    // Projects
    getProjects: () => axios.get(`${API_BASE_URL}/projects/read.php`),
    
    // Team Members
    getTeamMembers: () => axios.get(`${API_BASE_URL}/team/read.php`),
    
    // Announcements
    getAnnouncements: () => axios.get(`${API_BASE_URL}/announcements/read.php`),
    
    // Job Applications
    submitApplication: (data) => axios.post(`${API_BASE_URL}/applications/create.php`, data),
    
    // Stats
    getStats: () => axios.get(`${API_BASE_URL}/stats/read.php`)
}; 