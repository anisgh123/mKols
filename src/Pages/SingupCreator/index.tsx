import "./index.css";
import Input from "../../Components/Input";
import { ChangeEvent, useState } from 'react';
import Logo from "../../Components/Logo";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signupbcreator() {
    const [state, setState] = useState({ email: "", password: "", FirstName: "", LastName: "" });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const signupCreator = async () => {
        try {
            const res = await axios.post('http://localhost:5000/signup-creator', state);
            toast.success(res.data, { position: "top-center" });
        } catch (err) {
            console.error(err);
            toast.error('Signup failed', { position: "top-center" });
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="header">
                <div className="logo-text">
                    <Logo />
                    <p> Influencer </p>
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
                    <Input name="email" type="text" placeholder="name@company.com" label="Workemail:" id="creator-input" value={state.email} onChange={handleChange} />
                    <Input name="password" type="password" placeholder="password" label="Password:" id="creator-input" value={state.password} onChange={handleChange} />

                    <div className="inputcontainer">
                        <Input name="FirstName" type="text" placeholder="FirstName" label="FirstName:" id="id3" value={state.FirstName} onChange={handleChange} />
                        <Input name="LastName" type="text" placeholder="LastName" label="LastName:" id="id4" value={state.LastName} onChange={handleChange} />
                    </div>

                    <div className="buttonsignup">
                        <button className="signupbtn-creator" onClick={signupCreator}>Continue</button>
                    </div>

                    <div className="paragraph-container">
                        <p>By submitting the form above, you agree to our <span className="teems"> Terms and Conditions</span> and <span className="privacy-policy"> our Privacy Policy.</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

