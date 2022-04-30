import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

const Rout = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}> </Route>
        </Routes>
    );
};

export default Rout;
