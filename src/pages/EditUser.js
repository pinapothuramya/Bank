import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  let navigate = useNavigate();
  const { bankid } = useParams();

  const [user, setUser] = useState({
    bankname: '',
    abbrevation: '',
    ifsc: '',
    status: '',
  });

  useEffect(() => {
    loadUser();
  }, []);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/bankapp/bank/${bankid}`, user);
      navigate('/');
      window.alert('Submitted Successfully!');
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/bankapp/bank/${bankid}`);
      setUser(result.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Bank Account</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="BankName" className="form-label">
                <b>Name </b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Bank Name"
                name="bankname"
                value={user.bankname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Abbreviation" className="form-label">
                <b>Abbreviation </b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Bank Abbreviation"
                name="abbrevation"
                value={user.abbrevation}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Ifsc" className="form-label">
                <b>IfscCode </b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your IFSC code"
                name="ifsc"
                value={user.ifsc}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Status" className="form-label">
                <b>Status </b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Status"
                name="status"
                value={user.status}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <Link type="submit" className="btn btn-outline-primary mx-2" to="/createnewbank">
              Update
            </Link>
            <Link to="/" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
