import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    _id: null,
    username: "",
    password: "",
    role: "REGULAR",
  });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      if (user.username === "" || user.password === "") {
        alert("Username and passowrd cannot be empty!");
      } else {
        await client.signup(user);
        alert("Sign up successful!");
        navigate("/signin");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container-fluid w-50 pt-2">
      <h1>Signup</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <label>Username:</label>
      <input
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="form-control mb-2"
      />
      <label>Password:</label>
      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="Password"
        className="form-control mb-2"
      />

      <div className="form-group">
        <label>Role:</label>
        <select
          className="form-control form-select mb-2"
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="REGULAR">Regular</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <button onClick={signup} className="btn btn-success w-100 mb-2">
        Sign Up
      </button>
      <button
        onClick={() => navigate("/signin")}
        className="btn btn-warning w-100"
      >
        Back to Sign In
      </button>
    </div>
  );
}

export default Signup;