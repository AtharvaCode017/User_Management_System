// client/src/pages/Home.js

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    const [search, setSearch] = useState("");
    
    // Pagination States
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const getdata = async () => {
        // Pass page number to backend
        const res = await fetch(`http://localhost:5000/getdata?search=${search}&page=${page}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error fetching data");
        } else {
            // Backend now sends { userdata: [...], Pagination: {...} }
            setUserdata(data.userdata);
            setPageCount(data.Pagination.pageCount);
        }
    }

    // Pagination Functions
    const handlePrevious = () => {
        setPage(() => {
            if (page === 1) return page;
            return page - 1;
        })
    }

    const handleNext = () => {
        setPage(() => {
            if (page === pageCount) return page;
            return page + 1;
        })
    }

    const deleteuser = async (id) => {
        const res2 = await fetch(`http://localhost:5000/deleteuser/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        const deletedata = await res2.json();
        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            getdata();
        }
    }

    useEffect(() => {
        getdata();
    }, [search, page]) // Re-run when Search OR Page changes

    const exportuser = async () => {
        // Simply opening this URL triggers the download
        window.open("http://localhost:5000/exportcsv", "_self");
    }

    return (
        <div className="container mt-5">
            <div className="main_div">
                {/* Search Bar */}
                <div className="search_add mt-4 d-flex justify-content-between">
                    <div className="search col-lg-4">
                        <form className="d-flex">
                            <input 
                                type="search" 
                                placeholder="Search User" 
                                className="form-control" 
                                onChange={(e)=>setSearch(e.target.value)} 
                            />
                            <button className="btn btn-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="add_btn">
                        <button className="btn btn-success mx-2" onClick={exportuser}>Export to Csv</button>           
                        <NavLink to="/register" className="btn btn-primary"> + Add User</NavLink>
                    </div>
                </div>

                {/* Table */}
                <table className="table mt-4">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Job</th>
                            <th scope="col">Number</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getuserdata.length > 0 ? getuserdata.map((element, id) => {
                                return (
                                    <tr key={id}>
                                        <th scope="row">{id + 1 + ((page - 1) * 5)}</th> {/* Fix ID count logic */}
                                        <td>{element.fname} {element.lname}</td>
                                        <td>{element.email}</td>
                                        <td>{element.status}</td>
                                        <td>{element.mobile}</td>
                                        <td className="d-flex justify-content-between">
                                            <NavLink to={`view/${element._id}`}><button className="btn btn-success"><i className="fas fa-eye"></i></button></NavLink>
                                            <NavLink to={`edit/${element._id}`}><button className="btn btn-primary"><i className="fas fa-pen"></i></button></NavLink>
                                            <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            }) : <p className='text-center'>No Data Found</p>
                        }
                    </tbody>
                </table>

                {/* Pagination Buttons */}
                <div className="d-flex justify-content-end mt-4">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link" onClick={handlePrevious} disabled={page === 1}>Previous</button>
                            </li>
                             
                             {/* Show current page number */}
                            <li className="page-item disabled"><a className="page-link" href="#">{page} of {pageCount}</a></li>

                            <li className="page-item">
                                <button className="page-link" onClick={handleNext} disabled={page === pageCount}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>
    )
}

export default Home;