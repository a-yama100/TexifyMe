// E:\programming\Project\TexifyMe\texifyme-frontend\src\App.js

import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AccountSettings from './pages/AccountSettings';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<AccountSettings />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* 他のルートもここに追加 */}
          </Routes>
      </Router>
  );
}

export default App;
