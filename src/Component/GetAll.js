import React, { useState, useEffect } from 'react';
import { getStudents1 } from '../Service/user';

const GetAll = () => {
    const [pageSize, setPageSize] = useState(5); // Set initial values for pageSize and pageNumber
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        getStudents(); // Load data when the component mounts
    }, []); // Empty dependency array ensures it only runs once on mount

    const getStudents = async () => {
        console.log("pageSize>>>>>>>>", pageSize);
        console.log("pageNumber>>>>", pageNumber);

        // Validation of page number and page size
        let response = await getStudents1(pageNumber, pageSize);
        if (response.data) {
            setData(response.data.content);
        }
    };

    return (
        <>
            <div className="form-floating">
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
            <div className="form-floating">
                <select
                    className="form-select"
                    id="floatingSelectPage"
                    aria-label="Floating label select example"
                    onChange={(e) => {
                        setPageNumber(e.target.value);
                    }}
                    value={pageNumber}
                >
                   <option selected>Page Number</option>
          <option value="1" selected={1 == pageNumber}>
            1
          </option>
          <option value="2" selected={2 == pageNumber}>
            2
          </option>
          <option value="3" selected={3 == pageNumber}>
            3
          </option>
          <option value="4" selected={4 == pageNumber}>
            4
          </option>
          <option value="5" selected={5 == pageNumber}>
            5
          </option>
          <option value="6" selected={6 == pageNumber}>
            6
          </option>
          <option value="7" selected={7 == pageNumber}>
            7
          </option>
                </select>
                <label htmlFor="floatingSelectPage">Page Number</label>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={getStudents}
                >
                    Load Data
                </button>
            </div>

            {data.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d) => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                                <td>{d.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available.</p>
            )}
        </>
    );
};

export default GetAll;
