import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    // * siapkan variable untuk menampung menu pada navbar
    let menu
     
    // * logout handler
    const logout = async () => {
        // * hit endpoint yang sudah kita bikin (http://localhost:8080/api/logout)
       const resp =  await fetch('http://localhost:8080/api/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // * untuk mengambil cookies dari server
        })
        props.setname('')        
    }


    // * jika nama user tidak ada, maka tampilkan menu default dari navbar
    if (props.name === undefined) {
        menu = (
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link active" aria-current="page" >Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link active" >Login</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <div className="nav-link active me-3" aria-current="page" >Hi, {props.name}</div>
                </li>
                <li className="nav-item">
                    <Link to="/login"  className="nav-link active bg-danger rounded text-center" onClick={logout}>Logout</Link>
                </li>
            </ul>
        )
    }


    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    GO-React-JWT
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {menu}
                </div>
            </div>
        </nav>
    )
}

