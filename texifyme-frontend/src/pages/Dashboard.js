// E:\programming\Project\TexifyMe\texifyme-frontend\src\pages\Dashboard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UploadForm from '../components/UploadForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommonButton from '../components/Button';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem('userId');
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [memberType, setMemberType] = useState(''); // memberTypeのstateを追加

  const handleHistoryClick = (history) => {
    setSelectedHistory(history);
  };

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}/dashboard`, {
            headers: {
              'Authorization': token
            }
          });
          console.log("API Response:", response);
          const data = await response.json();
          console.log("API Data:", data);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}/member-type`)
    .then(response => {
      console.log(response.data);  // この行を追加
      setMemberType(response.data.MemberTypes);
    })
    .catch(error => {
      console.error("Error fetching member type:", error);
    });
  }, [userId]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5 flex-grow-1">
        <h2 className="mb-4">Your Dashboard</h2>
        {userData && (
          <>
            <h3>Hello, UserID: {userData.id} | User:Email: {userData.email}!</h3>
            {userData.role === 'admin' && (
              <div className="card mt-4">
                <div className="card-body">
                  <h4 className="card-title">Admin Section</h4>
                  <p className="card-text">This is a special section only administrators can see!</p>
                  <Link className="btn btn-primary" to="/admin/dashboard">Go to Admin Dashboard</Link>
                </div>
              </div>
            )}
            <h3 className="mt-4">画像をアップロードしてLaTeXに変換</h3>
            <UploadForm />
            <h4 className="mt-4">Your Conversion Histories</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {userData.histories && userData.histories.map(history => (
                  <tr key={history.id} onClick={() => handleHistoryClick(history)}>
                    <td>{history.filename}</td>
                    <td>{history.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="card mt-4 mb-4">
              <div className="card-body">
                <h4 className="card-title">Account Information</h4>
                <p className="card-text">
                  <strong className="larger-text">あなたの会員種別:</strong> <span className="badge bg-success custom-badge">{memberType}</span>
                </p>
              </div>
            </div>
            {selectedHistory && (
              <div className="mt-4">
                <h4>詳細:</h4>
                <p>LaTeX: {selectedHistory.latexText}</p>
                <img className="img-fluid" src={selectedHistory.imagePath} alt="Converted LaTeX result" />
              </div>
            )}
            <CommonButton 
              className="mt-4"
              label="Account Settings" 
              variant="secondary" 
              onClick={() => window.location.href = '/settings'}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
