import React from 'react';
import { useLocation } from  'react-router-dom';  // Import useLocation

const ApplicantDashboard = () => {
  const location = useLocation();  // Get the state from the location

  return (
    <div>
      <h1>Applicant Dashboard</h1>

      {/* Display success message if it exists */}
      {location.state && location.state.message && (
        <div style={{ color: 'green' }}>
          {location.state.message}
        </div>
      )}

      <ul>
        <li><a href="/new-application">New Application</a></li>
        <li><a href="/company-profile">Company Profile</a></li>
        <li><a href="/application-status">Application Status</a></li>
      </ul>
    </div>
  );
};

export default ApplicantDashboard;