import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../Components/Input';
import Logo from '../../Components/Logo';
import './index.css';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const { token, email } = useParams<{ token: string, email: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', { token, email, password });
      toast.success('Password reset successful');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="Logo">
        <Logo />
      </div>
      <div className="home">
        <div className="box">
          <div className="reset-password-container">
            <h1>Enter New Password</h1>
            <Input name="password" type="password" placeholder="e.g.******" label="New Password:" id="resetinput1" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input name="confirmPassword" type="password" placeholder="e.g.******" label="Confirm Password:" id="resetinput1" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className="button" type="button" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;