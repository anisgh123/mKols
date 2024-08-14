import React, { ChangeEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../Components/Input';
import loginslider from '../../Assets/Images/Icons/loginslider.png';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';

const Login: React.FC = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };
  const navigate=useNavigate()
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', state);
      login(response.data.token, response.data.user);
      toast.success('Login successful');
      // window.location.href = '/home';
      console.log(response)
      navigate("/verif")

    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="slider">
        <img src={loginslider} alt="Login slider" style={{ height: "100vh" }} />
      </div>
      <div className="Login-page">
        <div className="loginhaeder">
          Don't have an account?
          <button  onClick={() =>navigate (  "/actor-space")} className="Signup">
            Signup
          </button>
        </div>
        <div className="loginbox">
          <h3 className="text">Log in</h3>
          <Input name="email" type="email" placeholder="e.g.email@maycompany.com" label="Work E-mail:" id="login-email" value={state.email} onChange={handleChange} />
          <Input name="password" type="password" placeholder="e.g.******" label="Password:" id="login-password" value={state.password} onChange={handleChange} />
          <div className="links-container">
            <span>Don't have Password? <a href="/forgetpassword" id="link1">Get magic link</a></span>
            <a href="/forgetpassword" className="forgetpasswordlink">Forget Password</a>
          </div>
          <button className="login-button" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
