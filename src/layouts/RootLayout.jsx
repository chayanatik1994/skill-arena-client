import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Home/Shared/Footer/Footer';
import Navbar from '../Pages/Home/Shared/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div>
          <Navbar></Navbar>
           <Outlet></Outlet> 
           <Footer/>
        </div>
    );
};

export default RootLayout;