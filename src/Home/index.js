import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import Navigation from "../Navigation";

function Home() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const [trails, setTrails] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const fetchTrails = async () => {
    // const trails = await client.findTrailsById();
    setTrails(trails);
  };
  useEffect(() => {
    fetchTrails();
  }, []);

  return (
    <div>
      <Navigation />

      {/* search section */}
      <div className="mt-3 bg-success">
        <h1 className="text-center pt-3">Find a trail</h1>
        <div className="d-flex justify-content-center p-3">
          <input
            className="form-control me-3 w-50"
            placeholder="Search by city or trail name"
          ></input>
          <Link key={`/search`} to={`/search`} className="btn btn-secondary">
            Explore!
          </Link>
        </div>
      </div>

      {/* Local favourite trails */}
      <div className="container-fluid p-3">
        <h3>Local favourites near (...city name...)</h3>
        <div className="d-flex">
          <Link
            to={`/`}
            className="card w-25 me-2"
            style={{ textDecoration: "none" }}
          >
            <div className="card-body">
              <img src="..." className="card-img-top" alt="..."></img>
              <p className="fw-light">Rating</p>
              <p className="fs-6 fw-bold">Trail name</p>
              <p className="fs-6 fw-lighter">Location</p>
            </div>
            <Link className="btn btn-secondary w-50">Save to favourite</Link>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-success p-3">
        <div className="d-flex">
          <ul class="list-group list-group-flush p-2">
            <Link to={`/search`} className="list-group-item border-0 fw-bolder">
              Explore
            </Link>
            <Link to={`/`} className="list-group-item border-0">
              Countries
            </Link>
            <Link to={`/`} className="list-group-item border-0">
              Cities
            </Link>
          </ul>
          <ul class="list-group list-group-flush p-2">
            <Link to={`/`} className="list-group-item border-0 fw-bolder">
              ...
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Home;
