import './App.css';

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

//import AdminPage from './pages/AdminPage';
//import CustomerPage from './pages/CustomerPage';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react'
// import { login } from '../Service/ApiService';
import Navbar from './layout/Navbar';

import Login2 from './Component/Login2';
import Mainnav from './layout/Mainnav';

import Customernav from './layout/Customernav';
import Home from './pages/Home';
import CreateCustomer from './pages/CreateCustomer';
import Accountad from './pages/Accountad';
import Account from './pages/Account';
import Transafer from './pages/Transafer';
import Passbook from './pages/Passbook';
import EditUser from './pages/EditUser';
import DeleteBank from './pages/DeleteBank';

function App() {

  return (
    <div>

     <BrowserRouter>
     
        <Routes>
        {/* <Navbar /> */}
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/admin" element={<Mainnav/>} />
        <Route path="/customer" element={<Customernav />} />
        <Route path="/createnewbank" element={<Home />} />
        <Route path="/edit" element={<EditUser />} />
          {/* <Route path="/createnewbank" element={<AddUsers/>} />  */}
          <Route path="/delete" element={<DeleteBank />} /> 
          <Route path="/createcustomer" element={<CreateCustomer />}/>
          {/* <Route path="/creatcustomer" element={<AddCustomer />} />
           */}
           <Route path="/accountad" element={<Accountad />} />
           
          <Route exact path="/accounts" element={<Account />} />
          <Route path="/transfer" element={<Transafer />} />
          <Route path="/passbook" element={<Passbook     />} />
          
        </Routes>
        
      
      </BrowserRouter>
     
        
      

    </div>
  )

  }

export default App;
