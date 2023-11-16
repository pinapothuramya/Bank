import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'; // Import Card component from react-bootstrap

const Navbar = () => {
  const bodyStyle = {
    backgroundImage: "url('https://www.india.com/wp-content/uploads/2014/08/666.jpg')",
    backgroundSize: 'cover',
    color: 'white',
    minHeight: '100vh', // Ensure the background covers the entire viewport height
    // Add any other styles you may need
  };

  return (
    <div style={bodyStyle}>
      <div className="container">
        

        <div className="row mt-5">
          <div className="col-md-4 mx-auto">
            <Card >
              <Card.Body>
                <Card.Title>
                  <h1 align="center" className='Colours'>
                    <b>Welcome To Bank </b>
                  </h1>
                </Card.Title>
                <Card.Text>
                  
                </Card.Text>
                <div align="center">
                <Link type="button" className="btn btn-outline-dark mt-3" to="login">
          Click To Login
        </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
