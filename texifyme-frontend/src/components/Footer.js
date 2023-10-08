// E:\programming\Project\TexifyMe\texifyme-frontend\src\components\Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center py-4" style={{ 
            backgroundColor: '#333', 
            marginTop: '20px', 
            color: '#fff', 
            width: '100%',
            position: 'relative'
        }}>
            © {new Date().getFullYear()} TexifyMe. All rights reserved.
        </footer>
    );
};

export default Footer;
