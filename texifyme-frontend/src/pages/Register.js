// E:\programming\Project\TexifyMe\texifyme-frontend\src\pages\Register.js

import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommonButton from '../components/Button';

const Register = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        console.log("Submitted data:", data);
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (errors) {
                console.log('Register errors:', errors);
              }
            if (response.ok) {
                window.location.href = "/dashboard";
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    console.log('Register errors:', errors);

    return (
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <div className="container mt-5 flex-grow-1">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="form-group">
                <label>Email:</label>
                <input type="email" {...register("email", { required: true })} className="form-control" />
                {errors?.email?.message && <span>Email is required</span>}
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" {...register("password", { required: true })} className="form-control" />
                {errors?.password?.message && <span>Password is required</span>}
              </div>
              {/* 他のフォームフィールドもここに追加できます */}
              <CommonButton label="Register" variant="primary" onClick={handleSubmit(onSubmit)} />
            </form>
          </div>
          <Footer />
        </div>
      );
  };
  
  export default Register;
