import React, { ReactNode } from 'react';
import './index.css'
import Sidebar from '../Components/Sidebar';
interface Layout {
  children?: ReactNode;
}

const Layout: React.FC<Layout> = ({ children }) => {
  return (
    <div className="sidebar-layout">
     <Sidebar/>
      
      <div className="main-content">
        {children}
       
        </div>
        
    </div>
  );
};

export default Layout;