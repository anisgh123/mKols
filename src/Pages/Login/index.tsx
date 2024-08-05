import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input';
import loginslider from '../../Assets/Images/Icons/loginslider.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function Login() {
    const [state, setState] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const login = async () => {
        try {
            const res = await axios.post('http://localhost:5000/login', state);
            toast.success('Login successful');
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('firstName', res.data.firstName);
            localStorage.setItem('lastName', res.data.lastName);
            localStorage.setItem('photo', res.data.photo);
            localStorage.setItem('country', res.data.country);
            localStorage.setItem('bio', res.data.bio);
            setTimeout(() => {
                navigate('/setting-page');
            }, 2000); // Delay for 2 seconds to show the toast
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(err.response ? err.response.data : err.message);
            } else {
                console.error(err);
            }
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
                    <button onClick={() => window.location.href = "/actor-space"} className="Signup">
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
                    <button className="login-button" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    );
}
