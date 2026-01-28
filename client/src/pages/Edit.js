// client/src/pages/Edit.js

import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {

    const navigate = useNavigate("");
    const { id } = useParams(""); // Get the ID from the URL

    const [inputdata, setInputData] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        location: "",
        status: "",
        profile: ""
    });

    // 1. Handle Input Changes
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData((preval) => {
            return { ...preval, [name]: value }
        })
    }

    // 2. Fetch Old Data to Fill the Form
    const getdata = async () => {
        const res = await fetch(`https://mern-backend-api-fc8r.onrender.com/getuser/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setInputData(data); // Fill the form with existing data
            console.log("Data loaded for edit");
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    // 3. Send Updated Data to Backend
    const updateuser = async (e) => {
        e.preventDefault();

        const { fname, lname, email, mobile, gender, location, status, profile } = inputdata;

        const res2 = await fetch(`https://mern-backend-api-fc8r.onrender.com/updateuser/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fname, lname, email, mobile, gender, location, status, profile
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if (res2.status === 422 || !data2) {
            toast.error("Fill the data!");
        } else {
            toast.success("Data Updated Successfully!");
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }

    return (
        <div className="container">
            <h2 className='text-center mt-1'>Update Your Details</h2>
            <form className='mt-3'>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">First Name</label>
                        <input type="text" value={inputdata.fname} onChange={setInputValue} name='fname' className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Last Name</label>
                        <input type="text" value={inputdata.lname} onChange={setInputValue} name='lname' className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Email address</label>
                        <input type="email" value={inputdata.email} onChange={setInputValue} name='email' className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Mobile</label>
                        <input type="text" value={inputdata.mobile} onChange={setInputValue} name='mobile' className="form-control" />
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
                        <input type="text" className="form-control" name='profile' value={inputdata.profile} onChange={setInputValue} />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Enter Location</label>
                        <input type="text" value={inputdata.location} onChange={setInputValue} name='location' className="form-control" />
                    </div>
                    
                    <button type="submit" onClick={updateuser} className="btn btn-primary">Update</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Edit;
