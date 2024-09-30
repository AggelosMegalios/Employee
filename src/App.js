import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApplicantDashboard from './ApplicantDashboard';
import NewApplication from './NewApplication';
import CompanyProfile from './CompanyProfile';
import ApplicationStatus from './ApplicationStatus';
import LoginPage from './LoginPage';
import EmployeeDashboard from './EmployeeDashboard';  // Import Employee Dashboard
import AdminDashboard from './AdminDashboard';  // Import Admin Dashboard

const App = () => {
  return (
      <Router>
        <Routes>
          {/* Route for Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route for Applicant Dashboard */}
          <Route path="/applicant-dashboard" element={<ApplicantDashboard />} />

          {/* Route for New Application */}
          <Route path="/new-application" element={<NewApplication />} />

          {/* Route for Company Profile */}
          <Route path="/company-profile" element={<CompanyProfile />} />

          {/* Route for Application Status */}
          <Route path="/application-status" element={<ApplicationStatus />} />

          {/* Route for Employee Dashboard */}
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

          {/* Route for Admin Dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Redirect or default route */}
          <Route path="/" element={<LoginPage />} /> {/* Default to login page */}
        </Routes>
      </Router>
  );
};

export default App;

