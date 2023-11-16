import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Accountad = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [firstNameError,setFirstNameError]=useState('');
  const [lastNameError,setLastNameError]=useState('');
  const [emailError,setEmailError]=useState('');
  const [user, setUser] = useState({
    balance: '',
    status: '',
    customer:{
    firstname: '',
    lastname: '',
    email: ''
    }
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({
    balance: '',
    status: '',
    customer:{
    firstname: '',
    lastname: '',
    email: ''
    }
  });
  const { balance, status, customer: { firstname, lastname, email } } = user;

  
  const onInputChange = (e) => {
    if (e.target.name.startsWith('customer.')) {
      setUser({
        ...user,
        customer: {
          ...user.customer,
          [e.target.name.replace('customer.', '')]: e.target.value,
        },
      });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  

  const onSubmit = async (e) => {
    e.preventDefault();
  
    let formValid = true;
    let newError = { ...errors };
  
    if (!user.customer.firstname) {
      newError.customer.firstname = "FirstName Is Not Null";
      formValid = false;
    } else if (!/^[A-Za-z ]*$/.test(user.customer.firstname)) {
      newError.customer.firstname = "Firstname Contains Only Letters";
    } else if (user.customer.firstname.length < 3 || user.customer.firstname.length > 50) {
      newError.customer.firstname = "FirstName must be greater than 3 characters";
      formValid = false;
    }
  
    if (!formValid) {
      setFirstNameError(newError.customer.firstname);
      window.alert("***FirstName field error: " + newError.customer.firstname + "***");
      return;
    }
    let lastnameValid=true;
    let newlastname='';

    if (!user.customer.lastname) {
      newError.customer.lastname = "LastName Is Not Null";
      formValid = false;
    } else if (!/^[A-Za-z ]*$/.test(user.customer.lastname)) {
      newError.customer.lastname = "Firstname Contains Only Letters";
    } else if (user.customer.lastname.length < 3 || user.customer.lastname.length > 50) {
      newError.customer.lastname = "FirstName must be greater than 3 characters";
      formValid = false;
    }
    if(!lastnameValid)
    {
      setLastNameError(newlastname);
      window.alert("***LastName is Filed : "+newlastname+" ****");
      return;
    }
    //email validation
    let emailValid=true;
    let newEmail='';
    if (!user.customer.email) {
      newError.customer.email = "Email is required";
      formValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.customer.email)) {
      newError.customer.email = "Invalid email format";
      formValid = false;
    }
  
    if (!emailValid) {
      setErrors(newEmail);
      window.alert("***Form has errors. Please check the fields.***");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/bankapp/account/account`, user);
      setSuccessMessage("Created SuccessFully");
      window.alert("Account Created Successfully");
      window.location.reload();
      console.log('Form submitted successfully');
    } catch (error) {
      console.log('Error Submitting Form:', error);
    }
  };
  

  useEffect(() => {
    
    loadUsers();
  }, [currentPage, pageSize]);

  const loadUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bankapp/account/accountpaging?page=${currentPage}&size=${pageSize}`);
      console.log(response.data); // Log the response data
      if (response.status === 200) {
        setUsers(response.data);
        setTotalPages(response.data.totalPages);
        console.log('Users State:', response.data.content); // Log the users state
        console.log('Total Pages:', response.data.totalPages);
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
    setCurrentPage(1);
  };

  return (
<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-info">
<div className="container-fluid">
<h2 className="text-center m-6">Admin Dashboard</h2>
       
  <button className="navbar-toggler" 
  type="button" 
  data-bs-toggle="collapse" 
  data-bs-target="#navbarSupportedContent"
   aria-controls="navbarSupportedContent" 
  aria-expanded="false"
   aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <Link type="button" class="btn btn-outline-dark" to="/admin">Adimn Home</Link>
     
</div>

</nav>
<h1 align="center">Accounts</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Create New Account</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Balance" className="form-label"><b>Enter The Min Account Balance   </b></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter The Balance"
                  name="balance"
                  value={balance}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="form-label"><b>Enter The Status </b></label>
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
                <label htmlFor="firstname" className="form-label"><b>First Name   </b></label>
                <input
                  type="text"
                    className={`form-control ${firstNameError ? 'is-invalid' : ''}`}
                    placeholder="Enter Your firstname"
                    name="customer.firstname"
                    value={firstname}
                     onChange={(e) => onInputChange(e)}
                />

                {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}

              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label"><b>Last Name   </b></label>
                <input
              type="text"
              className={`form-control ${lastNameError ? 'is-invalid' : ''}`}
              placeholder="Enter Your last Name"
              name="customer.lastname"
              value={lastname}
                onChange={(e) => onInputChange(e)}
                />
              {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label"><b>Email  </b></label>
                <input
                  type="text"
                  className={`form-control ${emailError ? 'is-invalid' : ''}`}
                  placeholder="Enter Emaile"
                  name="customer.email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <button type="submit" className="btn btn-outline-primary mx-2">
                Submit
              </button>
              <Link type="cancel" className="btn btn-outline-danger mx-2" to="/">
                Cancel
              </Link>
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
                  <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage -0)} disabled={currentPage === 1}>
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
                <th scope="col">Id</th>
                <th scope="col">Balance</th>
                <th scope="col">Status</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
            {users && users.map((user, index) => (
  <tr key={index}>
    <th>{user.accountno}</th>
    <td>{user.balance}</td>
    <td>{user.status ?  'False':'True' }</td>
    <td>{user.customer ? user.customer.firstname : 'Sitha'}</td>
    <td>{user.customer ? user.customer.lastname : 'Ram'}</td>
    <td>{user.customer ? user.customer.email : 'Sitha@Gmail.com'}</td>
  </tr>
))}

</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Accountad;
