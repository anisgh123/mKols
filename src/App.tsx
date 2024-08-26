import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './Pages/Login';
import SignupBusiness from './Pages/Signupbusiness';
import SignupCreator from './Pages/SingupCreator';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import Layout from './SidebarLayout';
import OffersList from './Pages/OffersList';
import MakeOffer from './Pages/Makeoffer';
import ActorSpace from './Pages/ActorSpace';
import SettingPage from './Pages/SettingPage';
import ProfilePage from './Pages/ProfilePage';
import PrivateRoute from './PrivateRoute';
import OfferCreator from './Pages/OfferListCreator';
import FilterProfile from './Pages/FilterProfile';
import InstagramVerif from './Pages/InstagramVerif/InstagramVerif';
import Task  from './Pages/Task';
import HomePageBrand from './Pages/BrandHomePage';
import Overview from './Pages/Overview'
import ReportCreator from './Pages/ReportCreator';
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          
          <Route path="/actor-space" element={<ActorSpace />} />
          <Route path="/signup-creator" element={<SignupCreator />} />
          <Route path="/signup-business" element={<SignupBusiness />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:token/:email" element={<ResetPassword />} />
          <Route path="/offers-list" element={<PrivateRoute element={<Layout><OffersList /></Layout>} />} />
          <Route path="/makeoffer/:email/:id" element={<PrivateRoute element={<Layout><MakeOffer /></Layout>} />} />
          <Route path="/setting-page" element={<PrivateRoute element={<Layout><SettingPage /></Layout>} />} />
          <Route path="/profile/:id" element={<PrivateRoute element={<Layout><ProfilePage /></Layout>} />} />
          <Route path="/offercreator" element={<PrivateRoute element={<Layout><OfferCreator /></Layout>} />} />
          <Route path="/creators" element={<PrivateRoute element={<Layout><FilterProfile/></Layout>} />} />
          <Route path="/verif" element={<PrivateRoute element={<Layout><InstagramVerif/></Layout>} />} />
          <Route path="/tasks" element={<PrivateRoute element={<Layout><Task/></Layout>} />} />
          <Route path="/home-brand" element={<PrivateRoute element={<Layout><HomePageBrand/></Layout>} />} />
          <Route path="/report-creator" element={<PrivateRoute element={<Layout><ReportCreator/></Layout>} />} />
          <Route path="/Overview" element={<PrivateRoute element={<Layout><Overview/></Layout>} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
