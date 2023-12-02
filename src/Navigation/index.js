import React from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import * as client from "../Users/client";

function Navigation() {
  const id = useParams();
  const navigate = useNavigate();
  const links = [
    { to: "/home", label: "Home" },
    { to: "/community", label: "Community" },
    { to: "/favourite", label: "Favourites" },
  ];
  const linksAtEnd = [{ to: "/profile", label: "Profile" }];
  const active = (path) => (pathname.includes(path) ? "active" : "");
  const { pathname } = useLocation();

  const signout = async () => {
    await client.signout();
    navigate("/signin");
  };
  return (
    <div className="d-flex justify-content-between p-2">
      <div>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`pe-3 ${active(link.to)}`}
            style={{ textDecoration: "none" }}
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
            style={{ textDecoration: "none" }}
          >
            {link.label}
          </Link>
        ))}
        {/* shows sign in button if not logged in */}
        {!id && (
          <Link
            key={"/signin"}
            to={"/signin"}
            className="btn bg-success text-white"
          >
            Sign In
          </Link>
        )}
        <Link onClick={signout} className="btn bg-danger text-white">
          Sign Out
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
