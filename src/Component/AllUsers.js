import React, { useState, useEffect } from 'react';
import { getStudents1 } from '../Service/user'; // Assuming this import is correct

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const getStudents = async () => {
    const resp = await getStudents1(2, 3);
    if (resp?.data) {
      setData(resp.data);
      setTotalCount(resp.headers['x-total-count']);
    }
    console.log(resp?.data);
    console.log(resp?.headers['x-total-count']);
  };

  useEffect(() => {
    console.log("useEffect called");
    getStudents();
  }, [totalCount,pageSize,pageNumber]);

  return (
    <div>
      {/* Render your data here */}
    </div>
  );
};

export default AllUsers;
