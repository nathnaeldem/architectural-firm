import './App.css';

// import './Components/admin/ProjectManager.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Updated to HashRouter
import Navbar from './Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import About from './Components/About';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import Announcements from './Components/Announcements';
import AdminDashboard from './Components/admin/AdminDashboard';
import AdminLogin from './Components/admin/AdminLogin';
import ProjectManager from './Components/admin/ProjectManager';
import ProtectedRoute from './Components/admin/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Registration from './Components/admin/Registration';
import TaskChecker from './Components/admin/TaskChecker';
import AdminTaskUploader from './Components/admin/AdminTaskUploader';
import AnnouncementManager from './Components/admin/AnnouncementManager';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pmanager" element={<ProjectManager />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>}/>
            <Route path='/dashboard' element={<AdminDashboard />}/>
  
            <Route path="/admin/task" element={<TaskChecker />} />
            <Route path="/admin/registration" element={<Registration />} />
            <Route path="/admin/tasku" element={<AdminTaskUploader />} />
            <Route path="/admin/announce" element={<AnnouncementManager />} />
            <Route
              path="/admin/project-manager"
              element={
                <ProtectedRoute>
                  <ProjectManager />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
