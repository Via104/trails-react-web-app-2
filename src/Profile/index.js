
import * as client from "../Users/client.js";
import { useNavigate, useParams } from "react-router";
import * as reducer from "../Users/reducer";
import { useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/index.js";

import { FaUser } from "react-icons/fa";

function Profile() {

    const { id } = useParams();

    const isMyProfile = (id === undefined);

    const [currentUser, setCurrentUser] = useState(null);
    const [viewedUser, setViewedUser] = useState(null);
    const [favourites, setFavourites] = useState([]); // users favourited trails
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signout = async () => {
      await client.signout();
      dispatch(reducer.setCurrentUser(null));
      //setCurrentUser(null);
      navigate("/signin");
    };

    const fetchCurrentUser = async () => {
      try {
        const currentUser = await client.account();
        //console.log("Profile" + currentUser);
        setCurrentUser(currentUser);
        setFavourites(currentUser.favourites);
        //console.log("setstate complete - dispatch next")
        dispatch(reducer.setCurrentUser(currentUser));
      } catch (error) {
        console.log("Current user was not found")
        //navigate("signin");
      }
    };

    const fetchViewedUser = async (id) => {
        try {
          const viewedUser = await client.findUserById(id);
          //console.log("Profile" + currentUser);
          setViewedUser(viewedUser);
          setFavourites(viewedUser.favourites);
          //console.log("setstate complete - dispatch next")
          //sdispatch(reducer.setCurrentUser(currentUser));
        } catch (error) {
          console.log("Current user was not found")
          //navigate("signin");
        }
      };

    const updateUser = async () => {
        //console.log("attempting update with id: " + currentUser._id + "\nobject: " + currentUser)
        await client.updateUser(currentUser._id, currentUser);
        //console.log("curr pass: " + currentUser.password);
        navigate(`/profile`)
    };

    useEffect(() => {
        console.log("This is my profile: " + isMyProfile);
        fetchCurrentUser();
        if (!isMyProfile) {
            console.log("I am viewing a user who I will get now");
            fetchViewedUser(id);
            console.log("I have retrieved the user: " + (!viewedUser));
        }
    }, []);

    //If not signed in no Profile screen
    if (!currentUser) {
        console.log("no user");
        return (
            <div>
                Sorry current user not found
            </div>
        );
    } 

    return (
        <div>
            <Navigation />
            
            {isMyProfile && currentUser && (
                <div>

                <div className="mt-3 bg-success">
                    {/* <FaUser className="text-center"/> */}
                    <h1 className="text-center pt-3">{currentUser.username}'s Profile</h1>
                </div>

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

                <pre>{JSON.stringify(currentUser, null, 2)}</pre>
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
                            {/* able to add to favourite if logged in
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
                            MAYBE CHANGE TO REMOVE FROM FAVORITES IF TIME PERMITS*/}

                            {/* able to edit a trail if admin */}
                            {currentUser.role === "ADMIN" && (
                                <Link
                                to={`/editTrail/${currentUser.id}/${trail.id}`}
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


                {currentUser.role === "ADMIN" && (
                    <Link to="/project/users" className="btn btn-warning">
                    users
                    </Link>
                )}
                </div>
            )}


            {!isMyProfile && (
                <div>
                    <div className="mt-3 bg-success">
                        {/* <FaUser className="text-center"/> */}
                        <h1 className="text-center pt-3">{viewedUser.username}'s Profile</h1>
                    </div>

                    <h1> {viewedUser.username}'s favorites</h1>

                    <div className="container bg-body-secondary">
                        {favourites.map((trail) => (
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
                                {/* able to add to favourite if logged in
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
                                MAYBE CHANGE TO REMOVE FROM FAVORITES IF TIME PERMITS*/}

                                {/* able to edit a trail if admin */}
                                {currentUser.role === "ADMIN" && (
                                    <Link
                                    to={`/editTrail/${currentUser.id}/${trail.id}`}
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




            )}


        </div>
    );

}
export default Profile;