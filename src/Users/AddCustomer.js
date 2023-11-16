import axios from 'axios';
import React, { useRef, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
export default function AddCustomer() {
    let navigate=useNavigate()
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    status: "",
    mobileno:""
  });
  const { firstname, lastname, email, status,mobileno } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/addCustomer/customers', user);
      navigate('/');
    } catch (error) {
      console.error('Error making POST request:', error);
      // Handle the error as needed, e.g., display an error message.
    }
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New Customer</h2>
          <form onSubmit={(e)=>onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="BankName" className="form-label"><b>FirstName   </b></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your First Name"
              name="firstname"
              value={firstname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Lastname" className="form-label"><b>Abbreviation   </b></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Ifsc" className="form-label"><b>Email   </b></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter mail"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
         
          <div className="mb-3">
            <label htmlFor="Status" className="form-label"><b>Mobolenumber   </b></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Status"
              name="status"
              value={status}
              onChange={(e) => onInputChange(e)}
            />
             <div className="mb-3">
            <label htmlFor="Status" className="form-label"><b>Status   </b></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Mobile number"
              name="mobileno"
              value={mobileno}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          </div>
          <button type="submit" className="btn btn-outline-primary">Submit</button>
          <Link type="cancel" className="btn btn-outline-danger mx-2" to="/">Cancel </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
