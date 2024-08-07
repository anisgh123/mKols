import React, { ChangeEvent, useState } from 'react';
import Input from '../../Components/Input';
import Logo from '../../Components/Logo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import axios, { AxiosError } from 'axios';

const SignupBusiness: React.FC = () => {
  const [state, setState] = useState({ email: "", password: "", firstName: "", lastName: "", accountType: "business" });

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
      <div className="header-business">
        <div className="logo-text">
          <Logo />
          <p> Business </p>
        </div>
        <div className="buttons-header">
          <button onClick={() => window.location.href = "/login"} className="btn-login">
            Login
          </button>
          <button onClick={() => window.location.href = "/signup-creator"} className="btn-sgnup">
            Signup as creator
          </button>
        </div>
      </div>
      <div className="signuppage">
        <div className="signupform">
          <h3>Business Account Setup </h3>
          <p>Use your <b>company email address</b> to get a free <br />
              HypeAuditor business account.</p>
          <Input name="email" type="text" placeholder="name@company.com" label="Work email:" id="business-email" value={state.email} onChange={handleChange} />
          <Input name="password" type="password" placeholder="password" label="Password:" id="business-password" value={state.password} onChange={handleChange} />
          <div className="inputcontainer">
            <Input name="firstName" type="text" placeholder="First Name" label="First Name:" id="business-firstName" value={state.firstName} onChange={handleChange} />
            <Input name="lastName" type="text" placeholder="Last Name" label="Last Name:" id="business-lastName" value={state.lastName} onChange={handleChange} />
          </div>
          <div className="buttonsignup">
            <button className="signupbtn-business" onClick={handleSubmit}>Continue</button>
          </div>
          <div className="paragraph-container">
            <p>By submitting the form above, you agree to our <span className="teems"> Terms and Conditions</span> and <span className="privacy-policy"> our Privacy Policy.</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupBusiness;
