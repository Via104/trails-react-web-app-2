import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAccount
} from "../../store/accountReducer.js";
import Navigation from "../Navigation";
import Footer from "../Navigation/footer.js";
import * as UserClient from "../Users/client.js";
import * as TrailClient from "../Search/client.js"
import "./index.css";

function NewHome() {
  // const { id } = useParams();
  const navigate = useNavigate();

  const [trails, setTrails] = useState([]); // trails displayed on home
  const [favorites, setfavorites] = useState([]); // users favorited trails
  // const [account, setAccount] = useState({});
  const account = useSelector((state) => state.accountReducer.account)
  const dispatch = useDispatch();


  const fetchfavorites = async (id) => {
    const favs = await UserClient.findfavoritesByUserId(account._id);
    console.log("favs: " + favs);
    setfavorites(favs);
    // setTrails(favs);
  };

  // add a given trail to favorites
  const saveToFavorites = async (trail) => {
    const updatedUser = await UserClient.addToFavorites(account, trail);
    setfavorites([...favorites, trail]);
    console.log(`updated user: ${updatedUser}`)
    dispatch(setAccount(updatedUser))
    alert("Added trail to favorite!");
  };

  const fetchAllTrails = async () => {
    const fetchedTrails = await TrailClient.findAllTrails();
    setTrails(fetchedTrails.data);
  };

  const fetchAccount = async () => {
    try {
      const account = await UserClient.account();

      setAccount(account);
      setfavorites(account.favorites)
      console.log(`account: ${account}`)
    } catch (err) {
      console.log(err.response.data.message)
      navigate("/signin");
    }
  };

  // const addTrail = async () => {
  //   navigate(`/addTrail/${id}`);
  //   fetchfavorites(id); // re-fetch all favorites
  //   setTrails([...favorites, ...trails]);
  // };

  useEffect(() => {
    // fetchAccount();
    fetchAllTrails();
    // fetchfavorites(id);
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

      {/* Local favorite
       trails */}
      <div className="container-fluid p-3">
        <h3>Local Favorites</h3>

        {/* able to add a trail if admin */}
        {account.role === "ADMIN" && (
          <button
            // onClick={() => addTrail()}
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
              to={`/details/${trail.id}`} //{trail.url}
              style={{ textDecoration: "none" }}
            >
              <div className="card home" id={trail.id}>
                {/* <img src="..." className="card-img-top" alt="..."></img> */}
                <p className="fs-6 fw-bold">{trail.name}</p>
                <p className="fs-6 fw-lighter text-wrapper">
                  {trail.description}
                </p>
                <p>Length: {trail.length} miles</p>
                <p className="fw-light fst-italic">Rating: {trail.rating}</p>

                <div className="row justify-content-around">
                  {/* able to add to favorite
                   if logged in */}
                  {account._id && (
                    <Link
                      className="btn btn-warning"
                      style={{ width: "150px" }}
                      onClick={() => {
                        saveToFavorites(trail); // save trail to favs
                      }}
                    >
                      Save to favorite
                    </Link>
                  )}

                  {/* able to edit a trail if admin */}
                  {account.role === "ADMIN" && (
                    <Link
                      // to={`/editTrail/${id}/${trail.id}`}
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
export default NewHome;