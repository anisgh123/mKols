import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signupbusiness from './Pages/Signupbusiness';
import SignupCreator from './Pages/SingupCreator';
import Login from './Pages/Login';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import Layout from './SidebarLayout';
import OffersList from './Pages/OffersList';
import MakeOffer from './Pages/Makeoffer';
import ActorSpace from './Pages/ActorSpace';
import SettingPage from './Pages/SettingPage';
import ProfilePage from './Pages/ProfilePage';



const App: React.FC = () => {
  return (
    <Router>

      <Routes>
      
        <Route path="/actor-space" element={<ActorSpace />} />
        <Route path="/signup-creator" element={<SignupCreator />} />
        <Route path="/signup-business" element={<Signupbusiness />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:token/:email" element={<ResetPassword />} />
        <Route path="/offers-list" element={<Layout><OffersList /></Layout>} />
        <Route path="/makeoffer" element={<Layout><MakeOffer /></Layout>} />
        <Route path="/setting-page" element={<Layout><SettingPage /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;



