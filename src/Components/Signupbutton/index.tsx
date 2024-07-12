import React from 'react';
import './index.css'
const SignUpButton: React.FC = () => {
  const handleSignUp = () => {
    // Handle signup logic here
    console.log('User signed up!');
  };

  return (
    <div className='btn'>
    <button  className="signup-button" onClick={handleSignUp}>
  Continue
    </button>
    </div>
  );
}

export default SignUpButton;