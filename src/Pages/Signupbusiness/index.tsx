import "./index.css";
import Input from "../../Components/Input";
import { ChangeEvent, useState } from 'react';
import Logo from "../../Components/Logo";
import SignUpButton from "../../Components/Signupbutton";

export default function Signupbusiness() {
    const [state, setState] = useState({ email: "", password: "", FirstName: "", LastName: "" }); 

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <div>
            <div className="header">
                <div className="logo-text">
                    <Logo/>
                    <p> Business </p>
                </div>
                <div className="buttons-header">
                    <button onClick={() => window.location.href = "/login"} className="btn-login">
                        Login
                    </button>
                    <button onClick={() => window.location.href = "/Signupcreator"} className="btn-sgnup">
                        Signup as creator
                    </button>
                </div>
            </div>
            <div className="signuppage">
                <div className="signupform">
                    <h3>Business Account Setup </h3>
                    <p>Use your <b>company email address</b> to get a free <br></br>
                    HypeAuditor business account.</p>
                    <Input name="email" type="text" placeholder="name@company.com" label="Work email:" id="id1" value={state.email} onChange={handleChange}/>
                    <Input name="password" type="password" placeholder="password" label="Password:" id="id2" value={state.password} onChange={handleChange}/>

                    <div className="inputcontainer">
                        <Input name="FirstName" type="text" placeholder="FirstName" label="FirstName:" id="id3" value={state.FirstName} onChange={handleChange}/>
                        <Input name="LastName" type="text" placeholder="LastName" label="LastName:" id="id4" value={state.LastName} onChange={handleChange}/>
                    </div>

                    <div className="signupbtn">
                        <SignUpButton/>
                    </div>

                    <div className="paragraph-container">
                        <p>By submitting the form above, you agree to our<span className="teems"> Terms and
                        Conditions</span> and <span className="privacy-policy"> our Privacy Policy.</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
