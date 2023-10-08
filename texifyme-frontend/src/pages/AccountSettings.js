// E:\programming\Project\TexifyMe\texifyme-frontend\src\pages\AccountSettings.js

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommonButton from '../components/Button';

const AccountSettings = () => {
  const [inputUserId, setInputUserId] = useState(localStorage.getItem('userId') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    if (inputUserId) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/${inputUserId}`);
          const data = await response.json();
          setEmail(data.email || '');
        } catch (error) {
          console.error("Error fetching user details", error);
        }
      };

      fetchUserDetails();
    }
  }, [inputUserId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users/settings/${inputUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: inputUserId, email, password, currentPassword }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error updating user details", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5 flex-grow-1">
        <h2>Account Settings</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>User ID:</label>
            <input type="text" className="form-control" value={inputUserId} onChange={e => setInputUserId(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Current Password:</label>
            <input type="password" className="form-control" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <CommonButton label="Update" variant="primary" onClick={handleUpdate} />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AccountSettings;
