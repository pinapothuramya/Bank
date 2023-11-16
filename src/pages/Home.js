import React,{useState,useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';


const Home=()=> {
  let navigate=useNavigate()
  const [users, setUsers] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const [pageSize, setPageSize] = useState(10);
const [totalPages, setTotalPages] = useState(1);
const [abbreviationError, setAbbreviationError] = useState('');
const[ifscError,setIfscError]=useState('');
const[user,setUser]=useState({
  bankname:"",
  abbrevation:"",
  ifsc:"",
  status:""



})
const [successMessage, setSuccessMessage] = useState('');
const [errors, setErrors] = useState({
  bankname: "",
  abbrevation: "",
  ifsc: "",
  status: "",
});

const{bankname,abbrevation,ifsc,status}=user
const onInputChange=(e)=>
{
  setUser({...user,[e.target.name]:e.target.value})
}

const onSubmit=async(e)=>{
  e.preventDefault();

  let formValid = true;
  let newError = { ...errors };
  
  if (!user.bankname) {
    newError.bankname = "BankName Is Not Null";
    formValid = false;
  } else if (!/^[A-Za-z ]*$/.test(user.bankname)) {
    newError.bankname = "Bank name Contains Only Letters";
  } else if (user.bankname.length < 7 || user.bankname.length > 50) {
    newError.bankname = "BankName must be greater than 7 characters";
    formValid = false;
  }
  
  if (!formValid) {
    setErrors(newError);
    window.alert("***BankName Contains only letter its should be greater than 7 characters***");
    return;
  }
  let formValid2 = true;
  let newError2 = '';

// Validate Abbreviation
if (!user.abbrevation) {
newError2 = "Abbreviation is required";
formValid2 = false;
} else if (!/^[A-Z]*$/.test(user.abbrevation)) {
newError2 = "Abbreviation must be in capital letters";
} else if (user.abbrevation.length < 3 || user.abbrevation.length > 7) {
newError2 = "Abbreviation must be between 3 - 7 characters";
formValid2 = false;
}

if (!formValid2) {
setAbbreviationError(newError2);
window.alert("***Abbreviation field error: " + newError2 + "***");
return;
}

let ifscValid = true;
let newIfsc = '';

// Validation for Ifsc code

if (!user.ifsc) {
newIfsc = "Ifsc Code is required";
ifscValid = false;
} else if (!/^[A-Z0-9 ]*$/.test(user.ifsc)) {
newIfsc = "Ifsc Code contains Characters and Numbers only";
ifscValid = false;
} else if (user.ifsc.length < 10 || user.ifsc.length > 11) {
newIfsc = "Ifsc Must be Between 10 and 11 characters";
ifscValid = false;
}

if (!ifscValid) {
setIfscError(newIfsc);
window.alert("***Ifsc code field: " + newIfsc + " ***");
return;
}

 






  try{
  await axios.post(`http://localhost:8080/bankapp/bank`,user)
 // navigate("/loadUsers")
 setSuccessMessage("Created SuccessFully");
 window.alert("new Bank Created SuccessFully");
 window.location.reload();
  }catch(error)
  {
    console.log("Error SubmittingForm:",error);
  }

}

useEffect(() => {
  loadUsers();
}, [currentPage, pageSize]);

const loadUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/bankapp/paging?page=${currentPage}&size=${pageSize}`);
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
<h2 align="center">Bank Page</h2>
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="text-center m-4">Create New BankAccount</h2>
       <form onSubmit={(e)=>onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="BankName" className="form-label"><b>Enter Bank Name   </b></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Bank Name"
            name="bankname"
            value={bankname}
            onChange={(e)=>onInputChange(e)}
           
          />
        </div>
        <div className="mb-3">
<label htmlFor="Abbreviation" className="form-label"><b>Abbreviation </b></label>
<input
  type="text"
  className={`form-control ${abbreviationError ? 'is-invalid' : ''}`}
  placeholder="Enter Bank Abbreviation"
  name="abbrevation"
  value={abbrevation}
  onChange={(e) => onInputChange(e)}
/>
{abbreviationError && <div className="invalid-feedback">{abbreviationError}</div>}
</div>

        <div className="mb-3">
          <label htmlFor="Ifsc" className="form-label"><b>IfscCode   </b></label>
          <input
            type="text"
            className={`form-control ${ifscError?'is-valid':''}`}
            placeholder="Enter Your IFSC code"
            name="ifsc"
            value={ifsc}
            onChange={(e)=>onInputChange(e)}
           
          />
          {ifsc&&<div class="Invalid-feedback">{ifscError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="Status" className="form-label"><b>Status   </b></label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Status"
            name="status"
            value={status}
            onChange={(e)=>onInputChange(e)}
           
          />
        </div>
        <button type="submit" className="btn btn-outline-primary mx-2">
  Submit
</button>
<Link type="cancel" className="btn btn-outline-danger mx-2" to="/">
  Cancel
</Link>
 </form>
 {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}
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
      <table className="table border shadow table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Bank Name</th>
            <th scope="col">Abbrevation</th>
            <th scope="col">ifsc</th>
            <th scope="col">Status</th>
            <th scope="col">details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th>{user.bankid}</th>
              <td>{user.bankname}</td>
              <td>{user.abbrevation}</td>
              <td>{user.ifsc}</td>
              <td>{user.status ? 'True' : 'False'}</td>
              <td>
                <button className="btn btn-success mx-2">View</button>
                <Link className="btn btn-outline-success mx-2" to="/edit">Edit</Link>
                <Link className="btn btn-danger mx-2" to="/delete">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
);
};

export default Home;