
import Input from "../../Components/Input";


import './index.css'
import { ChangeEvent, useState } from 'react';

const ResetPassword = () => {
  const [state, setState] = useState({email:"", password:""}); 

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setState(prevState => ({...prevState, [name]:value}))
  }

  return (<div className="home">
    <div className="Logo">
  
    </div>
    <div className="box">
    <div className="reset-password-container">
   
      <h1>Enter New Password </h1>
  

      
      <Input  name="password" type="password" placeholder="e.g.******" label="New Password:"  id ="id2" value={state.password} onChange={handleChange}/>
      <Input  name="password" type="password" placeholder="e.g.******" label="Confirm Password:"  id ="id2" value={state.password} onChange={handleChange}/>
        <button className="button" type="submit">Submit</button>
     
    
    </div>
    </div>
    </div>

  );
};

export default ResetPassword;