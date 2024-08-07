import React, { ChangeEvent, useState } from 'react';
import Input from '../../Components/Input';
import Logo from '../../Components/Logo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import axios, { AxiosError } from 'axios';

const SignupCreator: React.FC = () => {
  const [state, setState] = useState({ email: "", password: "", firstName: "", lastName: "", accountType: "creator" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', state);
      toast.success('Signup successful');
      window.location.href = '/login';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(`Signup failed: ${error.response.data.message}`);
        } else {
          toast.error('Signup failed');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="header">
        <div className="logo-text">
          <Logo />
          Influencer
        </div>
        <div className="buttons-header">
          <button onClick={() => window.location.href = "/login"} className="btn-login">
            Login
          </button>
          <button onClick={() => window.location.href = "/signup-business"} className="btn-sgnup">
            Signup as Business
          </button>
        </div>
      </div>
      <div className="signuppage">
        <div className="signupform">
          <h3>Creator Account Setup </h3>
          <p>Register and get access to actionable account insights, auto-updating media kits, and potential brand collaborations.</p>
          <Input name="email" type="text" placeholder="name@company.com" label="Work email:" id="creator-email" value={state.email} onChange={handleChange} />
          <Input name="password" type="password" placeholder="password" label="Password:" id="creator-password" value={state.password} onChange={handleChange} />
          <div className="inputcontainer">
            <Input name="firstName" type="text" placeholder="First Name" label="First Name:" id="creator-firstName" value={state.firstName} onChange={handleChange} />
            <Input name="lastName" type="text" placeholder="Last Name" label="Last Name:" id="creator-lastName" value={state.lastName} onChange={handleChange} />
          </div>
          <div className="buttonsignup">
            <button className="signupbtn-creator" onClick={handleSubmit}>Continue</button>
          </div>
          <div className="paragraph-container">
            <p>By submitting the form above, you agree to our <span className="teems"> Terms and Conditions</span> and <span className="privacy-policy"> our Privacy Policy.</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupCreator;
