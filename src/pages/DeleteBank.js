import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteBank = () => {
  let navigate = useNavigate();
  const { bankid } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/bankapp/bank/${bankid}`);
        setUser(result.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    loadUser();
  }, [bankid]);

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/bankapp/bank/${bankid}`);
      navigate('/');
      window.alert('Deleted Successfully!');
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Delete Bank Account</h2>
          <p>
            Are you sure you want to delete the bank account for {user.bankname} ({user.ifsc})?
          </p>
          <Link to="/createnewbank" className="btn btn-outline-danger mx-2">
            Delete
          </Link>
          <Link to="/createnewbank" className="btn btn-outline-secondary mx-2">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteBank;
