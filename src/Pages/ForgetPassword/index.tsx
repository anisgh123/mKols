import React, { useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';
import Input from "../../Components/Input";
import Logo from "../../Components/Logo";
import './index.css';

const ForgetPassword = () => {
  const [state, setState] = useState({ email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/forget-password', { email: state.email });
      setMessage(response.data.msg);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.msg || "Failed to send email");
      } else {
        setMessage("Failed to send email");
      }
    }
  };

  return (
    <div>
      <div className="head">
        <Logo />
      </div>
      <div className="home">
        <div className="box">
          <div className="reset-password-container">
            <h1>Reset your Password</h1>
            <p>Submit your email address and we'll send you a link to<br /> reset your password</p>
            <Input
              name="email"
              type="email"
              placeholder="e.g.email@maycompany.com"
              label="Work E-mail:"
              id="forgetinput"
              value={state.email}
              onChange={handleChange}
            />
            <button className="button" type="button" onClick={handleSubmit}>Submit</button>
            {message && <p>{message}</p>}
            <p className="changed-mind">Changed your mind? <a href="/login">Log In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
