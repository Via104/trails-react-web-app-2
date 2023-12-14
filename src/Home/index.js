import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "../Navigation/profile-Nav.js";
import Footer from "../Navigation/footer.js";
import * as client from "../Users/client.js";
import "./index.css";
import Search from "../Search/search.js";

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
    // fetch favs if signed in
    if (id) {
      const favs = await client.findFavouritesByUserId(id);
      setFavourites(favs);
    }
  };

  const fetchAllTrails = async () => {
    const fetchedTrails = await client.findAllTrails();
    const idsInFavs = favourites.map((item) => item.id);
    // trails that have not been marked as favourite
    const notFavoredTrails = fetchedTrails.data.filter(
      (item) => !idsInFavs.includes(item.id)
    );
    const customizedTrails = await client.findAllCustomizedTrails();
    setTrails([...customizedTrails, ...notFavoredTrails]);
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
    fetchFavourites(id);
    fetchAllTrails();
  }, []);

  return (
    <div>
      <Navigation />

      {/* search section */}
      <div className="mt-3 bg-success">
        <h1 className="text-center pt-3">Find a trail</h1>
        <Search />
      </div>

      {/* Local favourite trails */}
      <div className="container-fluid p-3">
        <h3>Local Favourites</h3>

        {/* able to add a trail if admin */}
        {account.role === "ADMIN" && (
          <button
            onClick={() => navigate(`/addTrail/${id}`)}
            className="btn btn-success mb-3"
          >
            Add a trail
          </button>
        )}

        {/* trail cards */}
        <div className="container bg-body-secondary">
          {trails.map((trail) => (
            <Link
              key={trail.id}
              to={`/details/${trail.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card" id={trail.id}>
                <p className="fs-6 fw-bold">{trail.name}</p>
                <p className="fs-6 fw-lighter text-wrapper">
                  {trail.description}
                </p>
                <p>Length: {trail.length} miles</p>
                <p className="fw-light fst-italic">
                  Rating: {trail.rating}/5.00
                </p>

                <div className="row justify-content-around"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Home;
