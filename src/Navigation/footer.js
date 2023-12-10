import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-success p-3 mt-5">
      <div className="d-flex">
        <ul class="list-group list-group-flush p-2 ">
          <li className="list-group-item fw-bold border-0 bg-success">
            Authors: Daniel Ouilikon, Victoria Gomez-Small, Yimeng Chen
          </li>
          <li className="list-group-item fw-bold border-0 bg-success">
            Institutional Association: Northeastern University
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
