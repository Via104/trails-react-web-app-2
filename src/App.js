import React, { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

import { Navigate } from "react-router";
import Home from "./Home";
import Signin from "./Users/signin";
import Signup from "./Users/signup";
import axios from "axios";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
