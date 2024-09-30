import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';  // Import useNavigate

const NewApplication = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    members: '',
    purpose: '',
    location: '',
    file: null,
  });

  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('companyName', formData.companyName);
    formDataToSend.append('members', formData.members);
    formDataToSend.append('purpose', formData.purpose);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('file', formData.file);

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8080/api/applications', formDataToSend, {
          headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'multipart/form-data',
          },
      });
  
      alert('Application submitted successfully!');
      
      // Navigate back to the applicant dashboard
      navigate('/applicant-dashboard', { state: { message: 'Application submitted successfully!' } });

    } catch (error) {
      console.error('Failed to submit application', error);
      alert('Failed to submit the application.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Members (comma-separated):</label>
        <input
          type="text"
          name="members"
          value={formData.members}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Purpose:</label>
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Main Location:</label>
        <input
          type="text"
          name="location"  
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Articles of Association (PDF):</label>
        <input type="file" name="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Send Application</button>
    </form>
  );
};

export default NewApplication;
