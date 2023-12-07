import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    _id: null,
    username: "",
    password: "",
    role: "REGULAR",
  });
  const navigate = useNavigate();

  const signin = async () => {
    try {
      if (user.username === "" || user.password === "") {
        alert("Username and password cannot be empty!");
      } else {
        const currentUser = await client.signin(user);
        navigate("/home/" + currentUser._id);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container-fluid w-50 pt-2">
      <h1>Sign In</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        className="form-control mb-2"
      />
      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        placeholder="Password"
        className="form-control mb-2"
      />
      <button onClick={signin} className="btn btn-success w-100 mb-3">
        Sign In
      </button>
      <p>Don't have an account yet?</p>
      <button
        onClick={() => navigate("/signup")}
        className="btn btn-warning w-100"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Signin;
