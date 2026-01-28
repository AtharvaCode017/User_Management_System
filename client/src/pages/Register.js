// client/src/pages/Register.js

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const navigate = useNavigate("");

    const [inputdata, setInputData] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "Male",
        location: "",
        status: "Active",
        profile: ""
    });

    // Handle Input Changes
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    // Submit Data to Backend
    const submitUserData = async (e) => {
        e.preventDefault();

        const { fname, lname, email, mobile, gender, location, status, profile } = inputdata;

        // Validation
        if (fname === "") {
            toast.error("First name is required!")
        } else if (lname === "") {
            toast.error("Last name is required!")
        } else if (email === "") {
            toast.error("Email is required!")
        } else if (!email.includes("@")) {
            toast.error("Enter valid email!")
        } else if (mobile === "") {
            toast.error("Mobile is required!")
        } else if (mobile.length > 10) {
            toast.error("Enter valid mobile!")
        } else if (gender === "") {
            toast.error("Gender is required!")
        } else if (status === "") {
            toast.error("Status is required!")
        } else if (profile === "") {
            toast.error("Profile is required!")
        } else if (location === "") {
            toast.error("Location is required!")
        } else {
            // API Call
            const res = await fetch("https://mern-backend-api-fc8r.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, lname, email, mobile, gender, location, status, profile
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                toast.error("Error: User already exists or invalid details");
                console.log("Invalid Registration");
            } else {
                toast.success("Registration Successful!");
                console.log("Registration Successful");
                
                // Optional: Redirect to Home after 2 seconds
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        }
    }

    return (
        <div className="container">
            <h2 className='text-center mt-1'>Register Your Details</h2>
            <form className='mt-3'>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">First Name</label>
                        <input type="text" value={inputdata.fname} onChange={setInputValue} name='fname' className="form-control" placeholder='Enter FirstName' />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Last Name</label>
                        <input type="text" value={inputdata.lname} onChange={setInputValue} name='lname' className="form-control" placeholder='Enter LastName' />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Email address</label>
                        <input type="email" value={inputdata.email} onChange={setInputValue} name='email' className="form-control" placeholder='Enter Email' />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Mobile</label>
                        <input type="text" value={inputdata.mobile} onChange={setInputValue} name='mobile' className="form-control" placeholder='Enter Mobile' />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Select Gender</label>
                        <div className="form-check form-check-inline ms-3">
                            <input className="form-check-input" type="radio" name="gender" value="Male" onChange={setInputValue} checked={inputdata.gender === "Male"} />
                            <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" value="Female" onChange={setInputValue} checked={inputdata.gender === "Female"} />
                            <label className="form-check-label">Female</label>
                        </div>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Select Status</label>
                        <select className="form-select" name='status' onChange={setInputValue} value={inputdata.status}>
                            <option value="Active">Active</option>
                            <option value="InActive">InActive</option>
                        </select>
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Select Profile</label>
                        <input type="text" className="form-control" name='profile' value={inputdata.profile} onChange={setInputValue} placeholder="Enter Image URL" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Enter Location</label>
                        <input type="text" value={inputdata.location} onChange={setInputValue} name='location' className="form-control" placeholder='Enter Location' />
                    </div>
                    
                    <button type="submit" onClick={submitUserData} className="btn btn-primary">Submit</button>
                </div>
            </form>
            <ToastContainer position="top-center" />
        </div>
    )
}

export default Register;
