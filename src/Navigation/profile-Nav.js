import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import * as client from "../Users/client";
import { useSelector, useDispatch } from "react-redux";
import { setAccount } from "../store/accountReducer";

function Navigation({userId}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = (path) => (pathname.includes(path) ? "active" : "");
  const account = useSelector((state) => state.accountReducer)
  const dispatch = useDispatch()

  // const [currentUser, setCurrentUser] = useState({
  //   _id: null,
  //   username: "",
  //   password: "",
  //   role: "REGULAR",
  // });

  const links = [
    { to: "/home", label: "Home" },
    { to: "/community", label: "Community" },
  ];
  const linksAtEnd = [{ to: "/profile", label: "Profile" }];

  

  const signout = async () => {
    await client.signout();
    dispatch(setAccount({}))
    navigate("/home");
    alert("Signing you out");
  };

  // const fetchCurrentUser = async () => {
  //   try {
  //     const currentUser = await client.account();

  //     if (currentUser._id === undefined) {
  //       console.log("Anonymous user detected");
  //       setCurrentUser(null);
  //     } else {
  //       setCurrentUser(currentUser);
  //     }
  //   } catch (error) {
  //     console.log("Current user was not found");
  //   }
  // };

  // //check victora useeffect and render loading
  useEffect(() => {
  }, [userId]);

  return (
    <div className="d-flex justify-content-between p-2">
      <div className="align-middle">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`pe-3 ${active(link.to)}`}
            style={{ textDecoration: "none", color: "darkgreen" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div>
        {linksAtEnd.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`pe-3 ${active(link.to)}`}
            style={{ textDecoration: "none", color: "darkgreen" }}
          >
            {link.label}
          </Link>
        ))}
        {/* shows sign in button if not logged in */}
        {!userId && (
          <Link
            key={"/signin"}
            to={"/signin"}
            className="btn bg-success text-white"
          >
            Sign In
          </Link>
        )}
        {userId && (
          <Link onClick={signout} className="btn bg-secondary text-white">
            Sign Out
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navigation;
