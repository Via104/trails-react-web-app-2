import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-success p-3 mt-5">
      <div className="d-flex">
        <ul class="list-group list-group-flush p-2">
          <Link
            to={`/search`}
            className="list-group-item border-0 fw-bolder bg-success"
          >
            Explore
          </Link>
          {/* <Link to={`/`} className="list-group-item border-0">
              Countries
            </Link>
            <Link to={`/`} className="list-group-item border-0">
              Cities
            </Link> */}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
