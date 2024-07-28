import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Register, Login, NotFound } from "../pages";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
