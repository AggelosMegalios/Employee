import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');// Get token from local storage
        const response = await axios.get('http://localhost:8080/api/applications/user', {
          headers: {
           // 'Authorization': `Bearer ${token}`,  // Send token here
            'Authorization': 'Bearer ' + token,
          }
        });
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch applications', error);
        setError('Failed to fetch applications.');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Application Status</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Status</th>
              <th>Submitted At</th>
              <th>Approved At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.company.name}</td>
                <td>{application.status}</td>
                <td>{new Date(application.submittedAt).toLocaleString()}</td>
                <td>{application.approvedAt ? new Date(application.approvedAt).toLocaleString() : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicationStatus;
