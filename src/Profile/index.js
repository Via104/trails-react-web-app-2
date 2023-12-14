
import * as client from "../Users/client.js";
import { useNavigate, useParams } from "react-router";
import * as reducer from "../Users/reducer";
import { useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/profile-Nav.js";

function Profile() {

    const { id } = useParams();

    var isMyProfile = (id === undefined);

    const [isAnonUser, setIsAnonUser] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        _id: null,
        username: "",
        password: "",
        role: "REGULAR",
      });
    const [viewedUser, setViewedUser] = useState({
        _id: null,
        username: "",
        password: "",
        role: "REGULAR",
      });
    const [favourites, setFavourites] = useState([]); // users favourited trails
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signout = async () => {
      await client.signout();
      dispatch(reducer.setCurrentUser(null));
      //setCurrentUser(null);
      //navigate("/signin");
    };

    const fetchCurrentUser = async () => {
      try {
        const currentUser = await client.account();

        if(currentUser._id === undefined) {
            console.log("Anonymous user detected");
            setCurrentUser(null);
            setIsAnonUser(true);
            isMyProfile = false;
        } else {
            setCurrentUser(currentUser);
            if (isMyProfile) {
                setFavourites(currentUser.favourites);
            }
            setIsAnonUser(false);
            isMyProfile = true
        }
        
        //console.log("setstate complete - dispatch next")
        dispatch(reducer.setCurrentUser(currentUser));
      } catch (error) {
        console.log("Current user was not found")
        //navigate("signin");
      }
    };

    const fetchViewedUser = async (id) => {
        try {
          //setViewedUser(null);
          const viewedUser = await client.findUserById(id);
          setViewedUser(viewedUser);
          setFavourites(viewedUser.favourites);
          dispatch(reducer.setViewedUser(viewedUser));
        } catch (error) {
          console.log("Viewed user was not found")
          //navigate("signin");
        }
      };

    const updateUser = async () => {
        //console.log("attempting update with id: " + currentUser._id + "\nobject: " + currentUser)
        await client.updateUser(currentUser._id, currentUser);
        //console.log("curr pass: " + currentUser.password);
        navigate(`/profile`)
    };

    //check victora useeffect and render loading
    useEffect(() => {
        console.log("This is my profile: " + isMyProfile);
        fetchCurrentUser();
        if (!isMyProfile) {
            console.log("I am viewing a user who I will get now");
            fetchViewedUser(id);
        }
    }, [id, isMyProfile]);

    const profilePage = () => {

        return (
            <div>
                <Navigation />
    
                {/* Trying to access curernt user's profile when not logged in prompts you to login */}
                {isMyProfile && isAnonUser && (
                    <div>
                        <h1 className="text-center pt-3">Please login if you would like to see your profile info here!</h1>
                    </div>
    
                )}
                
                {isMyProfile && currentUser && (
                    <div>
    
                        <div className="mt-3 bg-success">
                            {/* <FaUser className="text-center"/> */}
                            <h1 className="text-center pt-3">{currentUser.username}'s Profile MINE</h1>
                        </div>

                        <h3 className="text-center pt-3">User Info</h3>
    
                        <div className="d-flex flex-row">
                            <div>Username: </div>
                            <input
                                type="username"
                                className="form-control"
                                value={currentUser.username}
                                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}/>
                            
                        </div>
    
                        <div className="d-flex flex-row">
                            <div>Password: </div>
                            <input
                                type="password"
                                className="form-control"
                                value={currentUser.password}
                                onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}/>
                            
                        </div>
    
                        {/* <pre>{JSON.stringify(currentUser, null, 2)}</pre> */}
                        <button onClick={signout} className="btn btn-danger">
                            Sign Out
                        </button>
                        <button onClick={updateUser}>Update</button>
                        <hr />
    
                        <h1> My favorites</h1>
                        <div className="container bg-body-secondary">
                            {favourites.map((trail) => (
                                <Link
                                key={trail.id}
                                to={`/details/${trail.id}`}
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
                                </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
    
    
                {!isMyProfile && viewedUser && (
                    <div>
                        <div className="mt-3 bg-success">
                            {/* <FaUser className="text-center"/> */}
                            <h1 className="text-center pt-3">{viewedUser.username}'s Profile NOT MINE</h1>
                        </div>
    
                        <h1> {viewedUser.username}'s favorites</h1>
    
                        <div className="container bg-body-secondary">
                            {favourites.map((trail) => (
                                <Link
                                key={trail.id}
                                to={`/details/${trail.id}`}
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

                                    </div>
                                </div>
                                </Link>
                            ))}
                        </div>
                        
                    </div>
    
                )}
    
    
            </div>
        );

    }

    return (

        <div>
            {
                (currentUser && !isAnonUser && favourites && isMyProfile) ||  //Viewing own profile page
                (currentUser && viewedUser && favourites && !isMyProfile) ||  //Viewing someone else's profile
                (isAnonUser)? 
                profilePage() : <div>Still Loading</div>}
            </div>

    );
    

}
export default Profile;