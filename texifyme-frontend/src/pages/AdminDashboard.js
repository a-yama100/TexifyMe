// E:\programming\Project\TexifyMe\texifyme-frontend\src\pages\AdminDashboard.js

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import CommonButton from '../components/Button';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/admin/dashboard', {
          headers: {
            'Authorization': token
          }
        });
        const data = await response.json();
        setAdminData(data);
      } catch (error) {
        console.error("Error fetching admin data", error);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5 flex-grow-1">
        <h2>Admin Dashboard</h2>
        {adminData && (
          <div className="alert alert-info mt-4">
            <h4>Total Users: {adminData.totalUsers}</h4>
          </div>
        )}
        {/* ここに他の管理者情報や機能を追加することができます */}
        {/* 必要に応じてCommonButtonを使用してボタンを追加できます */}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
