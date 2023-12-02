import { React, useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "../Navigation";
import * as client from "../Users/client.js";

function Home() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trails, setTrails] = useState([]); // trails displayed on home
  const [favourites, setFavourites] = useState([]); // users favourited trails
  const [account, setAccount] = useState({
    _id: null,
    username: "",
    passowrd: "",
    role: "REGULAR",
  });

  const fetchFavourites = async () => {
    const favs = await client.findFavouritesByUserId(id);
    setFavourites(favs);
  };

  const saveToFavourites = async (trail) => {
    setFavourites(trail);
    await client.addToFavourites(account);
  };

  const fetchAllTrails = async () => {
    const trails = await client.findAllTrails();
    setTrails(trails);
  };

  const fetchAccount = async (id) => {
    try {
      if (id) {
        const account = await client.findUserById(id);
        setAccount(account);
      } else {
        const account = await client.account();
        setAccount(account);
      }
    } catch (err) {
      navigate("/signin");
    }
  };

  useEffect(() => {
    fetchAccount(id);
    console.log("current account: " + account);
    // fetchAllTrails();
    // fetchFavourites();
  }, []);

  return (
    <div>
      <Navigation />
      <div>Current User: {id}</div>

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

        {/* able to add a trail if admin */}
        {account.role === "ADMIN" && (
          <Link className="btn btn-success mb-3">Add a trail</Link>
        )}

        <div className="d-flex">
          {/* {trails.map((trail) => { */}
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

            <div className="row">
              {/* ablt to add to favourite if logged in */}
              {id && (
                <Link
                  className="btn btn-warning w-50"
                  // onClick={saveToFavourites({ id })}
                >
                  Save to favourite
                </Link>
              )}

              {/* able to edit a trail if admin */}
              {account.role === "ADMIN" && (
                <Link className="btn btn-primary w-50">Edit</Link>
              )}
            </div>
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
