import React ,{useState,useEffect}from 'react';
import axios from 'axios';
const CusHome3 = () => {
  const [users,setUsers]=useState([]);
  const [currentPage,setCurrentPage]=useState(0);
  const [pageSize,setPageSize]=useState(10);
  const[totalPages,setTotalPages]=useState(1);

  useEffect(()=>
  {
    loadUsers();

  },[currentPage,pageSize]);
  console.log("Starting");
  
  const loadUsers = async () => {
    try {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYW15YXMiLCJpYXQiOjE2OTk4NDg5NzAsImV4cCI6MTcwMjQ0MDk3MCwicm9sZSI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XX0.t__s9dGWRTCZXOEJVKxiCPKwYnd8kxAp1ufxJ1wUmR01xU71KWiyLHVrnpiRHg-HqE2jdnRf8lDN0H6lAiKhRg'; // Replace with your actual authentication token
      const response = await axios.get(
        `http://localhost:8080/addCustomer/pagin?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('API Response:', response);
  
      if (response.status === 200) {
        setUsers(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  const handlePageChange=(page)=>
  {
    setCurrentPage(page);
  }
  const handlePageSizeChange=(size)=>
  {
    setPageSize(size);
    setCurrentPage(1);
  }

  return (
    
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
     <table className="table border shadow table striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">FirstName</th>
          <th scope="col">LastName</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Mobile Number</th>
        </tr>
      </thead>
   
      <tbody>
        
        {users.map((user,index)=>
        (
          <tr key={index}>
            <th>{user.customerId}</th>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.status?'True':'False'}</td>
            <td>{user.mobileno}</td>
          </tr>
          
        ))}
      </tbody>
     </table>
     </div>
    </div>
  );
};

export default CusHome3;
