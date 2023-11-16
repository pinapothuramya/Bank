import axios from 'axios';
import React, { useRef, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
export default function AddUsers() {
    let navigate=useNavigate()
  const [user, setUser] = useState({
    bankname: "",
    abbrevation: "",
    ifsc: "",
    status: ""
  });
  const { bankname, abbrevation, ifsc, status } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit=async(e)=>
  {
    e.preventDefault();
    await axios.post(`http://localhost:8080/bankapp/bank`,user)
    navigate("/")
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Create New BankAccount</h2>
          <form onSubmit={(e)=>onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="BankName" className="form-label"><b>Name   </b></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Bank Name"
              name="bankname"
              value={bankname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Abbreviation" className="form-label"><b>Username  </b></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Bank Abbreviation"
              name="abbrevation"
              value={abbrevation}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Ifsc" className="form-label"><b>password   </b></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your IFSC code"
              name="ifsc"
              value={ifsc}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Status" className="form-label"><b>Status   </b></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Status"
              name="status"
              value={status}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <Link type="submit" className="btn btn-outline-primary mx-2" to="/createnewbank">Submit</Link>
          <Link type="cancel" className="btn btn-outline-danger mx-2" to="/">Cancel </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
