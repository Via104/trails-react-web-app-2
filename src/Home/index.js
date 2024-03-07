import { React, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "../Navigation/profile-Nav.js";
import Footer from "../Navigation/footer.js";
import * as client from "../Users/client.js";
import "./index.css";
import Search from "../Search/search.js";
import  { useSelector, UseDispatch} from 'react-redux';
import { setAccount } from "../store/accountReducer.js";

function Home() {
  console.log("HOME PAGE")
  const navigate = useNavigate();
  const {account} = useSelector((state) => state.accountReducer)
  console.log(account)

  const [trails, setTrails] = useState([]); // trails displayed on home
  const [favorites, setFavorites] = useState([]); // users favorited trails
  // current logged in user, fields are empty if not logged in
  // const [account, setAccount] = useState({
  //   _id: null,
  //   username: "",
  //   passowrd: "",
  //   role: "REGULAR",
  // });
  // const account = {}
  // console.log(account)

  const fetchFavorites = async () => {
    // If the user is signed in, fetch their liked trails
    if (account._id) {
      // List of trail objects that are liked by the user
      const favs = await client.findFavoritesByUserId(account._id);
      setFavorites(favs);
    }
  };

  //fetch the trails to be displayed on the home page
  const fetchAllTrails = async () => {
    const fetchedTrails = await client.findAllTrails();
    const idsInFavs = favorites.map((item) => item.id);
    // trails that have not been marked as favourite
    const notFavoredTrails = fetchedTrails.data.filter(
      (item) => !idsInFavs.includes(item.id)
    );
    const customizedTrails = await client.findAllCustomizedTrails();
    setTrails([...customizedTrails, ...notFavoredTrails]);
  };

  // // fetch the account of the signed in user
  // const fetchAccount = async () => {
  //   try {
  //     // User object of the signed in user, empty object if not signed in
  //     const user = await client.account();
  //     console.log(user)
  //     setAccount(user);
  //   } catch (err) {
  //     alert('Could not fetch account.')
  //     navigate("/signin");
  //   }
  // };

  useEffect(() => {
    // const fetchAccount = async () => {
    //   try {
    //     // User object of the signed in user, empty object if not signed in
    //     const user = await client.account();
    //     console.log(user)
    //     setAccount(user);
    //   } catch (err) {
    //     alert('Could not fetch account.')
    //     navigate("/signin");
    //   }
    // };
    // fetchAccount();
    fetchFavorites();
    fetchAllTrails();

    
  }, [account]);


    return (
    <div>
      <Navigation userId={account._id} />

      {account._id && (
        <div className="text-center mb-4">
          <h1>Welcome {account.username}!</h1>
        </div>
      )}
      {/* search section */}
      <div className="mt-2 bg-success">
        <h2 className="text-center pt-3">Find a trail</h2>
        <Search />
      </div>

      {/* Local favorite trails */}
      <div className="container-fluid p-3">
        <h3>Local Favorites</h3>

        {/* able to add a trail if admin */}
        {account && account.role === "ADMIN" && (
          <button
            onClick={() => navigate(`/addTrail/${account._id}`)}
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
