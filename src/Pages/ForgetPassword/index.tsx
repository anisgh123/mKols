import React, { useState, ChangeEvent } from 'react';
import Input from "../../Components/Input";
import Logo from "../../Components/Logo";
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/forget-password', { email });
      toast.success('Reset link sent to email');
    } catch (error) {
      toast.error('Error sending reset link');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="head">
        <Logo />
      </div>
      <div className="home">
        <div className="box">
          <div className="reset-password-container">
            <h1>Reset your Password</h1>
            <p>Submit your email address and we'll send you <br /> a link to reset your password</p>
            <Input
              name="email"
              type="email"
              placeholder="e.g.email@maycompany.com"
              label="Work E-mail:"
              id="forgetinput"
              value={email}
              onChange={handleChange}
            />
            <button className="button" type="button" onClick={handleSubmit}>
              Submit
            </button>
            <p className="changed-mind">Changed your mind? <a href="/login">Log In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
