import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "../Navigation/footer.js";
import * as client from "../Users/client.js";
import "./index.css";

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

  const fetchFavourites = async (id) => {
    const favs = await client.findFavouritesByUserId(id);
    console.log("favs: " + favs);
    setFavourites(favs);
    // setTrails(favs);
  };

  // add a given trail to favourites
  const saveToFavourites = async (userId, trail) => {
    await client.addToFavourites(userId, trail);
    setFavourites([...favourites, trail]);
    alert("Added trail to favourite!");
  };

  const fetchAllTrails = async () => {
    const fetchedTrails = await client.findAllTrails();
    setTrails(fetchedTrails.data);
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

  const addTrail = async () => {
    navigate(`/addTrail/${id}`);
    fetchFavourites(id); // re-fetch all favourites
    setTrails([...favourites, ...trails]);
  };

  useEffect(() => {
    fetchAccount(id);
    fetchAllTrails();
    // fetchFavourites(id);
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
        <h3>Local Favourites</h3>

        {/* able to add a trail if admin */}
        {account.role === "ADMIN" && (
          <button
            onClick={() => addTrail()}
            // to={`/addTrail/${id}`}
            className="btn btn-success mb-3"
          >
            Add a trail
          </button>
        )}

        <div className="container bg-body-secondary">
          {trails.map((trail) => (
            <Link
              key={trail.id}
              to={trail.url}
              style={{ textDecoration: "none" }}
            >
              <div className="card" id={trail.id}>
                {/* <img src="..." className="card-img-top" alt="..."></img> */}
                <p className="fs-6 fw-bold">{trail.name}</p>
                <p className="fs-6 fw-lighter text-wrapper">
                  {trail.description}
                </p>
                <p>Length: {trail.length} miles</p>
                <p className="fw-light fst-italic">Rating: {trail.rating}</p>

                <div className="row justify-content-around">
                  {/* able to add to favourite if logged in */}
                  {id && (
                    <Link
                      className="btn btn-warning"
                      style={{ width: "150px" }}
                      onClick={() => {
                        saveToFavourites(id, trail); // save trail to favs
                      }}
                    >
                      Save to favourite
                    </Link>
                  )}

                  {/* able to edit a trail if admin */}
                  {account.role === "ADMIN" && (
                    <Link
                      to={`/editTrail/${id}/${trail.id}`}
                      className="btn btn-primary"
                      style={{ width: "100px" }}
                    >
                      Edit
                    </Link>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
export default Home;
