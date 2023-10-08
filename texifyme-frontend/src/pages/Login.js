// E:\programming\Project\TexifyMe\texifyme-frontend\src\pages\Login.js

import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommonButton from '../components/Button';

const Login = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
      try {
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('userId', result.userId);
          if (result.isAdmin) {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/dashboard";
          }
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
  };

  console.log('Register errors:', errors);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5 flex-grow-1">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" {...register("email", { required: true })} className="form-control" />
            {errors?.email?.message && <span>Email is required</span>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" {...register("password", { required: true })} className="form-control" />
            {errors?.password?.message && <p>This field is required</p>}
          </div>
          <CommonButton label="Login" variant="primary" onClick={handleSubmit(onSubmit)} />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;