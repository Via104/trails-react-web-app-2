import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router";
import Home from "./Home";
import AddTrail from "./Home/addTrail";
import Signin from "./Users/signin";
import Signup from "./Users/signup";
import Profile from "./Profile";
import Details from "./Details/Details";
import Community from "./Community";
import { Provider } from "react-redux";
import store from "./store";



function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<Home />} />
            <Route path="/addTrail/:id" element={<AddTrail />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/community" element={<Community />} />


            <Route path="/details/:trailId" element={<Details />} />


          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
