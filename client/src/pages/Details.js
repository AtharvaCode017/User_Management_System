// client/src/pages/Details.js

import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    const navigate = useNavigate();

    const getdata = async () => {
        const res = await fetch(`http://localhost:5000/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            setUserdata(data);
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    // Delete Logic (Reusable here too!)
    const deleteuser = async (id) => {
        const res2 = await fetch(`http://localhost:5000/deleteuser/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        const deletedata = await res2.json();
        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            navigate("/"); // Go back home after delete
        }
    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome {getuserdata.fname}</h1>

            <div className="card sx={{ maxWidth: 600 }}">
                <div className="card-body">
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}><button className="btn btn-primary mx-2"><i className="fas fa-pen"></i></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}><i className="fas fa-trash"></i></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src={getuserdata.profile ? getuserdata.profile : "/profile.png"} style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span >{getuserdata.fname} {getuserdata.lname}</span></h3>
                            <h3 className="mt-3">Age: <span >{getuserdata.age ? getuserdata.age : "20"}</span></h3>
                            <p className="mt-3"><i className="fas fa-envelope"></i> Email: <span>{getuserdata.email}</span></p>
                            <p className="mt-3"><i className="fas fa-briefcase"></i> Job: <span>{getuserdata.status}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">
                            <p className="mt-5"><i className="fas fa-mobile-alt"></i> Mobile: <span>{getuserdata.mobile}</span></p>
                            <p className="mt-3"><i className="fas fa-map-marker-alt"></i> Location: <span>{getuserdata.location}</span></p>
                            <p className="mt-3">Description: <span>Lorem ipsum dolor sit amet.</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;