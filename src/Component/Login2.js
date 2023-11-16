



import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login2 = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    //const navigate=new useNavigate();



    const handleSubmit = async (e) => {

        e.preventDefault();
        let response
        try {
            response = await axios.post(`http://localhost:8080/api/auth/login`,
                {
                    "username": userName,
                    "password": password
                }
            );
            //     if (response.status === 200) {
            //         naviagte('/Mainnav')
            //     }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        console.log("userName ==" + userName + "  password==" + password);
        //let response=await login(userName,password);

        console.log(response,response.data);

        if (response.data.role == 'ROLE_ADMIN') {

            navigate('/admin');
        }
        if (response.data.role == 'ROLE_USER') {
            console.log("fool");
             navigate('/customer')
        }

    }






    return (

        <div>

            <div className="container">

                <div className="row">

                    <div className="h1 text-primary text-center mt-5 ">
                        Log In Form
                    </div>

                    <div className="col-6 offset-3">
                        <form>
                            <div class="form-row align-items-center">
                                <div class="col-auto my-2">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect">Preference</label>
                                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                        <option selected>Choose...</option>
                                        <option value="1">Admin</option>
                                        <option value="2">Customer</option>

                                    </select>
                                </div>
                            </div>
                        </form>

                        <form className="shadow-lg p-5">
                            <div className="mb-4">
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
                            <button type="submit" className="btn-lg btn-primary rounded-pill border-3"
                                onClick={
                                    handleSubmit
                                }
                            >Submit</button>
                        </form>                  </div>

                </div>



            </div>

        </div>

    )
};

export default Login2;
