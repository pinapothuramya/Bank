import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home2() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState({
    balance: '',
    status: '',
    firstname: '',
    lastname: '',
    email: '',
  });

  const { balance, status, firstname, lastname, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/bankapp/account', user);
    // Reload the users after adding a new one
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage, pageSize]);

  const loadUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/bankapp/account/accountpaging?page=${currentPage}&size=${pageSize}`
      );

      if (response.status === 200 && response.data?.content) {
        setUsers(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to the first page when page size changes
  };

 
  return (

<div>
    
<div className="container">
  <div className="row">
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h2 className="text-center m-4"> Create A ccount</h2>
      <form onSubmit={(e)=>onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="Balance" className="form-label"><b> Min Balance</b></label>
          <input
          type="text"
          className="form-control"
          placeholder="Enter The Min Account balance"
          name="balance"
          value={balance}
          onChange={(e)=>onInputChange(e)} />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label"><b>Status</b></label>
          <input
           type="text"
           className="form-control"
           placeholder="Enter status"
           name="status"
           value={status}
           onChange={(e) => onInputChange(e)}
         />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label"><b>Enter the name</b></label>
         <input type="text"
              className="form-control"
              placeholder="Enter Name Of The Person"
              name="firstname"
              value={firstname}
              onChange={(e) => onInputChange(e)}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label"><b>Enter the Sur Name</b></label>
          <input
           type="text"
           className="form-control"
           placeholder="Enter Surname"
           name="lastname"
           value={lastname}
           onChange={(e) => onInputChange(e)}
         />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label"><b>Enter the email</b></label>
         <input type="text"
              className="form-control"
              placeholder="Enter the Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
        </div>
        <Link type="cancel" className="btn btn-outline-success mx-2" to="/newhome">Submit</Link>
<Link type="cancel" className="btn btn-outline-danger mx-2" to="/">Cancel</Link>

      </form>
    </div>
  </div>
</div>

    <div className="container">
      <div className="py-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="form-floating" style={{ flex: 1, maxWidth: '100px' }}>
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={(e) => {
                handlePageSizeChange(e.target.value);
              }}
              value={pageSize}
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <label htmlFor="floatingSelect">Page Size</label>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {[...Array(totalPages)].map((_, page) => (
                <li className={`page-item ${currentPage === page + 1 ? 'active' : ''}`} key={page}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <table className="table border shadow table-striped">
          <thead>
            <tr>
              <th scope="col">AccountNumber</th>
              {/* <th scope="col">openingdate</th> */}
              <th scope="col">balance</th>
              <th scope="col">Status</th>
              <th scope="col">FirstName</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.accountno}</td>
                {/* <td>{user.openingdate ? user.openingdate : getCurrentDateTime()}</td> */}

                {/* <td>{getCurrentDate()}</td> */}
                <td>{user.balance}</td>
                <td>{user.status ? 'True' : 'False'}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-success mx-2">View</button>
                  <button className="btn btn-outline-success mx-2">Edit</button>
                  <button className="btn btn-danger mx-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
