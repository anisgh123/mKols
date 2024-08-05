import React from 'react';
import './index.css'


interface SignUpButtonProps {
    onClick: () => void;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ onClick }) => {
    return (
        <button type="button" onClick={onClick} className="btn-signup">
            Sign Up
        </button>
    );
}

export default SignUpButton;
