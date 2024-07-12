import "./index.css";
import Input from "../../Components/Input";
import { ChangeEvent, useState } from 'react';
import Coverimg from "../../Components/Coverimg";


export default function Login() {
    const [state, setState] = useState({email:"", password:""}); 

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]:value}))
    }

    return (  
        <div className="login-container">
            <div className="slider">
                <Coverimg/>
            </div>
            <div className="Login-page">
                <div className="loginhaeder">
                    Don't have an account ?
                  
      
  
                    <button onClick={() => window.location.href ="/signupbusiness"} className="Signup">
                        Singup
                    </button>
                 
                </div>
                <div className="loginbox">
                    <h3 className="text">Log in </h3> 
                    <Input  name="email"  type="email" placeholder="e.g.email@maycompany.com" label="Work E-mail:"   id ="id1" value={state.email } onChange={handleChange}/>
                    <Input  name="password" type="password" placeholder="e.g.******" label="Password:"  id ="id2" value={state.password} onChange={handleChange}/>
                    <div className="links-container">
                        <span>Don't have Password ? <a href="url1" id="link1">Get magic link   </a></span>  
                        <a href="url2" className="forgetpasswordlink">Forget Password</a>  
                    </div>
             
                    <button  className="login-button">Login</button>
                </div>
            </div>
        </div>
    );
}