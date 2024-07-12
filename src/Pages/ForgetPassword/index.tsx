import Input from "../../Components/Input";

import './index.css'
import { ChangeEvent, useState } from 'react';

const ForgetPassword = () => {
  const [state, setState] = useState({email:""}); 

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setState(prevState => ({...prevState, [name]:value}))
  }

  return (<div className="home">
  
    <div className="Logo">

    </div>
    <div className="box">
    <div className="reset-password-container">
   
      <h1>Reset your Password</h1>
      <p>Submit your email address and we'll send you a link to<br></br> reset your password</p>
      <Input  name="email"  type="email" placeholder="e.g.email@maycompany.com" label="Work E-mail:"   id ="id1" value={state.email } onChange={handleChange}/>
  
        <button className="button" type="submit">Submit</button>
     
      <p className="changed-mind" >Changed your mind? <a href="/Login">Log In</a></p>
    </div>
    </div>
    </div>

  );
};

export default ForgetPassword;