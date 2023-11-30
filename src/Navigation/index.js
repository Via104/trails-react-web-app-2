import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const links = [
    { to: "/home", label: "Home" },
    { to: "/community", label: "Community" },
    { to: "/favourite", label: "Favourites" },
  ];
  const linksAtEnd = [
    // { to: "/signup", label: "Signup" },
    // { to: "/admin", label: "Admin" },
    { to: "/profile", label: "Profile" },
  ];
  const active = (path) => (pathname.includes(path) ? "active" : "");
  const { pathname } = useLocation();
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
        <Link key={"/signin"} to={"/signin"} className="btn bg-secondary">
          signin
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
