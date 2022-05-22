import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

export default function Index() {
    return (
        <>
            <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path = "/" exact element={<Home/>}/>
                    <Route path = "/login" exact element={<Login/>}/>
                    <Route path = "/register" exact element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </>
    ) 
}