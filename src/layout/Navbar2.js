import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar2() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadUsers();
  }, [currentPage, pageSize]);

  const loadUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/addCustomer/paging?page=${currentPage}&size=${pageSize}`);
      if (response.status === 200) {
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

  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    status: "",
    mobileno: ""
  });

  const { firstname, lastname, email, status, mobileno } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/addCustomer/customers`, user);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Customer Page
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link type="button" className="btn btn-outline-dark" to="/createnewbank">
            Add New Customer
          </Link>
        </div>
      </nav>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
              <h2 className="text-center m-4">Register New Customer</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="First Name" className="form-label">
                    FirstName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Last Name" className="form-label">
                    LastName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter LastName"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="First Name" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="First Name" className="form-label">
                    Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Status"
                    name="status"
                    value={status}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="First Name" className="form-label">
                    Mobilenumber
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    name="text"
                    value={mobileno}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <button type="submit" className="btn btn-outline-primary">
                  Submit
                </button>
                <Link type="cancel" className="btn btn-outline-danger mx-2" to="/">
                  Cancel
                </Link>
              </form>
            </div>
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
                  setPageSize(e.target.value);
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
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">FIRSTNAME</th>
                <th scope="col">LASTNAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">Status</th>
                <th scope="col">MOBILENUMBER</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.status ? 'True' : 'False'}</td>
                  <td>{user.mobileno}</td>
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
