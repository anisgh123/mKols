import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupBusiness from './Pages/Signupbusiness'
import SignupCreator from './Pages/SingupCreator';
import Login from './Pages/Login';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import Layout from'./Layout';
import OffersList from './Pages/OffersList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signupcreator" element={<SignupCreator />} />
        <Route path="/signupbusiness" element={<SignupBusiness />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />


       
      </Routes>
      
      <Routes>
      <Route path="/offers-list" element= {<Layout><OffersList /></Layout>} />
      </Routes>
     
    </Router>
  );
};

export default App;
