import React from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import * as client from "../Users/client";

function Navigation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const links = [
    { to: id ? `/home/${id}` : "/home", label: "Home" },
    { to: "/community", label: "Community" },
  ];
  const linksAtEnd = [
    { to: id ? `/profile` : "/profile", label: "Profile" },
  ];
  const active = (path) => (pathname.includes(path) ? "active" : "");
  const { pathname } = useLocation();

  const signout = async () => {
    await client.signout();
    navigate("/home");
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
        {!id && (
          <Link
            key={"/signin"}
            to={"/signin"}
            className="btn bg-success text-white"
          >
            Sign In
          </Link>
        )}
        {id && (
          <Link onClick={signout} className="btn bg-secondary text-white">
            Sign Out
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navigation;
