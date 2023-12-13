import React, { useEffect, useState} from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import * as client from "../Users/client";
import { useSelector, useDispatch } from "react-redux";
import {
  setAccount
} from "../store/accountReducer";

function Navigation() {
  const { id } = useParams();
  const { pathname } = useLocation();
  // const navigate = useNavigate();
  const active = (path) => (pathname.includes(path) ? "active" : "");
  const account = useSelector((state) => state.accountReducer.account)
  const dispatch = useDispatch();
  const links = [
    { to: "/home", label: "Home" },
    { to: "/community", label: "Community" },
    // { to: id ? `/favourites/${id}` : "/favourites", label: "Favourites" },
  ];
  const linksAtEnd = [
    { to: "/profile", label: "Profile" },
  ];
  
  console.log(`id ${id}`)
  
  useEffect(() => {
    try {
      client.account().then(user => {
        dispatch(setAccount(user))
      })
    } catch (err) {
      console.log(`Navigation: you are not signed in`)
    }
    
  }, [])

  const signout = async () => {
    await client.signout();
    dispatch(setAccount({}))
    // navigate("/signin");
  };

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
        {account._id? <button className="btn bg-success text-white" onClick={() => {signout()}}>Sign out</button> :
          <Link
            key={"/signin"}
            to={"/signin"}
            className="btn bg-success text-white">
            Sign In
          </Link>
        }
        {/* {id && (
          <Link 
            // onClick={signout}
            className="btn bg-secondary text-white">
            Sign Out
          </Link>
        )} */}
      </div>
    </div>
  );
}

export default Navigation;