import React, { useState } from 'react'
// import { login } from '../Service/ApiService';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {

    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const naviagte=new useNavigate();


    const handleSubmit=async(e)=>{

        e.preventDefault();
        let response
        try {
             response = await axios.post(`http://localhost:8080/api/auth/login`,{
                "username":"ramya",
                "password":"ramya"
            });
        //     if (response.status === 200) {
        //         naviagte('/Mainnav')
        //     }
         } catch (error) {
            console.error('Error fetching data:', error);
          }
        console.log("userName =="+userName+"  password=="+password);
        //let response=await login(userName,password);

        console.log(response);

        if(response.data.role=='ROLE_ADMIN'){
            naviagte('/admin')
        }
        if(response.data.role=='ROLE_CUSTOMER'){
            naviagte('/customer')
        }

    }
    return (
        <div>

            <div className="container">

                <div className="row">

                    <div className="h1 text-primary text-center mt-3">
                        Log In Form
                    </div>

                    <div className="col-8 offset-2">

                        <form className="shadow-lg p-5">
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                    onChange={
                                        (e) =>
                                            setUserName(e.target.value)
                                    }

                                    value={userName}



                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="text" className="form-control rounded-pill text-primary fw-bold"
                                    onChange={
                                        (e) =>
                                            setPassword(e.target.value)
                                    }

                                    value={password}
                                />
                            </div>
                            <button type="submit" className="btn-lg btn-success rounded-pill border-0"
                                onClick={
                                    handleSubmit
                                }
                            >Submit</button>
                        </form>
                    </div>

                </div>



            </div>

        </div>
    )
}

export default Login