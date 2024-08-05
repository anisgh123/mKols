import Input from "../../Components/Input";
import Logo from "../../Components/Logo";
import './index.css';
import { ChangeEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [state, setState] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const { token, email } = useParams();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    if (state.password !== state.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/reset-password/${token}/${email}`, { password: state.password });
      setMessage(response.data.message);
      navigate('/login'); // Redirect to login page after successful password reset
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message || "Failed to reset password");
      } else {
        setMessage("Failed to reset password");
      }
    }
  };

  return (
    <div>
      <div className="Logo">
        <Logo />
      </div>
      <div className="home">
        <div className="box">
          <div className="reset-password-container">
            <h1>Enter New Password</h1>
            <Input
              name="password"
              type="password"
              placeholder="e.g.******"
              label="New Password:"
              id="resetinput1"
              value={state.password}
              onChange={handleChange}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="e.g.******"
              label="Confirm Password:"
              id="resetinput1"
              value={state.confirmPassword}
              onChange={handleChange}
            />
            <button className="button" type="button" onClick={handleSubmit}>Submit</button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;




