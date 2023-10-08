// E:\programming\Project\TexifyMe\texifyme-frontend\src\pages\Home.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommonButton from '../components/Button';

const Home = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1>Welcome to TexifyMe</h1>
                    <p>Convert your mathematical images into LaTeX format easily!</p>
                    <CommonButton className="btn btn-primary btn-lg" label="Get Started" onClick={() => window.location.href = '/register'} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
