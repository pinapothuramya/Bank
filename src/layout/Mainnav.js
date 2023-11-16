import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

import Home from '../pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import AddUsers from '../Users/AddUsers';
import Home2 from '../Component/Home2';
import newCustomer from '../pages/newCustomer';
import './Mainnav.css'
function Mainnav() {
  return (
    <div className='Colours'>
      <Navbar className='bg-info' variant="dark">
        <Container>
          <div className="d-flex justify-content-between w-100">
            <Navbar.Brand href="#home" className="text-white">
              <h3>
                <b>Mono Bank</b>
              </h3>
            </Navbar.Brand>
            <Navbar.Brand href="#home" className="text-white">
              Home
            </Navbar.Brand>
            <Navbar.Brand href="#home" className="text-white">
              Bank
            </Navbar.Brand>
            <Navbar.Brand href="#home" className="text-white">
              Customers
            </Navbar.Brand>
            <Navbar.Brand href="#home" className="text-white">
              Accounts
            </Navbar.Brand>
            <Link type="button" class="btn btn-outline-dark" to="/">Log Out</Link>
    
          </div>
        </Container>
      </Navbar>
      <div>
          <h2 align="center" className='Colours'>Admin Home</h2>
        </div>

      <Container className="mt-5">
       
          <div className="row">
            <div className="col-md-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>
                    <h1 align="center"className='Colours'>
                      <b>Bank</b>
                    </h1>
                  </Card.Title>
                  <Card.Text>
                    <h6 align="center">Entire Bank Details</h6>
                  </Card.Text>
                  <div align="center">
                  <Link type="button" class="btn btn-outline-info" to="/createnewbank">Create New Bank</Link>
      
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>
                    <h1 align="center" className='Colours'>
                      <b>Customer</b>
                    </h1>
                  </Card.Title>
                  <Card.Text>
                    <h6 align="center">For All The Customer Details</h6>
                  </Card.Text>
                  <div align="center">
                  <Link type="button" class="btn btn-outline-info" to="/createcustomer">Click Here</Link>
      
        </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>
                    <h1 align="center" className='Colours'>
                      <b>Accounts</b>
                    </h1>
                  </Card.Title>
                  <Card.Text>
                    <h6 align="center">For the Account Details</h6>
                  </Card.Text>
                  <div align="center">
                  <Link type="button" class="btn btn-outline-info" to="/accountad">Create New Bank</Link>
      
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div>
            
      <Navbar /> 

      {/* {isCretermer && (
        <CreateCustomer />
      )} */}
      
      
          </div>
      </Container>
    </div>
  );
}

export default Mainnav;
