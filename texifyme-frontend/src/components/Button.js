// E:\programming\Project\TexifyMe\texifyme-frontend\src\components\Button.js

import React from 'react';
import { Button } from 'react-bootstrap';

const CommonButton = ({ label, variant = "primary", onClick }) => {
    return (
        <Button variant={variant} onClick={onClick}>
            {label}
        </Button>
    );
};

export default CommonButton;
