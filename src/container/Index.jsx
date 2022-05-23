import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

export default function Index() {
     // * siapkan variable penampung data user 
     const [name, setname] = useState('');
     const [alluser, setalluser] = useState([]);
     const [total, settotal] = useState(0)

     // menggunakan useEffect untuk mengambil data user dari backend
     useEffect(() => {
         (
             async () => {
                 const resp = await fetch("http://localhost:8080/api/user", {
                     headers: {'Content-Type': 'application/json'},
                     credentials: 'include', // * untuk mengambil cookies dari server
                 });
 
                 // ambil data user dari backend
                 const data = await resp.json();
                 // ganti data user di state
                 setname(data.name);
             }
         )();
     })
    return (
        <>
            <BrowserRouter>
            <Navbar name={name} setname={setname}/>
                <Routes>
                    <Route path = "/" exact element={<Home name={name} user={alluser} total={total}/>}/>
                    <Route path = "/login" exact element={<Login setname={setname} settotal={settotal} setalluser={setalluser}/>}/>
                    <Route path = "/register" exact element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </>
    ) 
}