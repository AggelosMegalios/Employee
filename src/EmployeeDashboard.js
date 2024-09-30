import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('JWT Token:', token);
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get('http://localhost:8080/api/applications/all', {
                    headers: {'Authorization': `Bearer ${token}`},
                });
                setApplications(response.data);
            } catch (error) {
                console.error('Failed to fetch applications', error);
                setError('Failed to fetch applications.' + error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);


    const handleAccept = async (applicationId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:8080/api/applications/approve/${applicationId}`,
                {}, // No body needed if it's a simple accept action
                { headers: {'Authorization': `Bearer ${token}`} }
            );
            setMessage(`Application ${applicationId} accepted successfully.`);
            // Ενημέρωση της λίστας με τις αιτήσεις
            setApplications(applications.filter(app => app.id !== applicationId));
            setSelectedApplication(null);
        } catch (error) {
            console.error('Failed to accept application', error);
            setError('Failed to accept application.' + error);
        }
    };

    const handleReject = async (applicationId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:8080/api/applications/reject/${applicationId}`,
                {}, // No body needed if it's a simple reject action
                { headers: {'Authorization': `Bearer ${token}`} }
            );
            setMessage(`Application ${applicationId} rejected successfully.`);
            // Ενημέρωση της λίστας με τις αιτήσεις
            setApplications(applications.filter(app => app.id !== applicationId));
            setSelectedApplication(null);
        } catch (error) {
            console.error('Failed to reject application', error);
            setError('Failed to reject application.' + error);
        }
    };


    // Render loading state, error message, or the applications list
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1>Employee Applications</h1>
            {message && <div style={{ color: 'green' }}>{message}</div>} {/* Success message */}
            <ul>
                {applications.map(application => (
                    <li key={application.id} onClick={() => setSelectedApplication(application)}> {/* Select application */}
                        <p>{application.company.name}</p>
                    </li>
                ))}
            </ul>

            {selectedApplication && (
                <div>
                    <h2>Selected Application</h2>
                    <p><strong>Title:</strong> {selectedApplication.title}</p>
                    <p><strong>Description:</strong> {selectedApplication.description}</p>
                    {/* Action buttons for accepting or rejecting */}
                    <button onClick={() => handleAccept(selectedApplication.id)}>Accept</button>
                    <button onClick={() => handleReject(selectedApplication.id)}>Reject</button>
                </div>
            )}
        </div>
    );
}



export default EmployeeDashboard;

