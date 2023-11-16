import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Customernav.css';
import Account from '../pages/Account';
import Transafer from '../pages/Transafer';
import Passbook from '../pages/Passbook';
import EditUser from '../pages/EditUser'
const Customernav = () => {
  return (
    <div className='Colours'>
    <div >
        <Navbar className='bg-info' variant="dark">
            <Container>
                <div className="d-flex justify-content-between w-100">
                    <Navbar.Brand href="#home" className="text-white">
                        <h3>
                            <b>Mono Bank</b>
                        </h3>
                    </Navbar.Brand>
                    <Navbar.Brand href="#home" className="text-white">
                        <h3>Home</h3>
                    </Navbar.Brand>
                    <Navbar.Brand href="#home" className="text-white">
                    <h3>Accounts</h3>
                    </Navbar.Brand>
                    <Navbar.Brand href="#home" className="text-white">
                    <h3>Transfer</h3>
                    </Navbar.Brand>
                    <Navbar.Brand href="#home" className="text-white">
                    <h3>PassBook</h3>
                    </Navbar.Brand>
                    <Link type="button" class="btn btn-outline-dark" to="/">Log Out</Link>
    
            
                </div>
            </Container>
        </Navbar>
        <div>
          <h2 align="center" className='Colours'>Customer Home</h2>
        </div>
        <Container className="mt-5">
        
          <div className="row">
            <div className="col-md-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>
                    <h1 align="center"className='Colours'>
                      <b>Accounts</b>
                    </h1>
                  </Card.Title>
                  <Card.Text>
                    <h6 align="center">For the Account Deatios</h6>
                  </Card.Text>
                  <div align="center">
                  <Link type="button" class="btn btn-outline-info" to="/accounts">Click Here</Link>
      
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>
                    <h1 align="center" className='Colours'>
                      
                      <b>PassBook</b>
                    </h1>
                  </Card.Title>
                  <Card.Text>
                  <h6 align="center">For the PassBook Details</h6>
                
                    </Card.Text>
                  <div align="center">
                  <Link type="button" class="btn btn-outline-info" to="/passbook" >Click Heare</Link>
        </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>
                    <h1 align="center"className='Colours'>
                    <b>Transafer</b>
                    </h1>
                  </Card.Title>
                  <Card.Text>
                  <h6 align="center">All Transactions Details</h6>
                 
                    
                  </Card.Text>
                  <div align="center">
                  <Link type="button" class="btn btn-outline-info" to="/transfer">Click Here</Link>
      
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div>
           
         
            
      
        
       
          </div>
       
      </Container>
        
    </div>
    </div>
  );
};

export default Customernav;