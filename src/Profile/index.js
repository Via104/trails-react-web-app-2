
import * as client from "../Users/client.js";
import { useNavigate, useParams } from "react-router";
import * as reducer from "../Users/reducer";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/profile-Nav.js";


function Profile() {

    const { id } = useParams();
    const { account } = useSelector((state) => state.accountReducer)
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
    const [profile, setProfile] = useState({
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


    const updateUser = async () => {
        //console.log("attempting update with id: " + currentUser._id + "\nobject: " + currentUser)
        await client.updateUser(currentUser._id, currentUser);
        //console.log("curr pass: " + currentUser.password);
        navigate(`/profile`)
    };


    useEffect(() => {
        console.log('**useEffect**')
        console.log('Param: ' + id)
        console.log('Account: ' + account._id)

        const fetchUser = async (id) => {
            console.log("**Profile fetchUser**")
            const user = await client.findUserById(id);
            setProfile(user)
            console.log(user)
            

        }
        if (id) {
            fetchUser(id)

        }
        else if (!id && account._id) {
            fetchUser(account._id)
        }
        else {
            // navigate('/home')
            alert("You must sign in to view your profile")
            
        }
    }, [id, account._id]);

    const profilePage = () => {
        return (
            <div>
                <Navigation userId={account._id} />

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
                            <h1 className="text-center pt-3">{currentUser.username}'s Profile</h1>
                        </div>

                        <h3 className="text-center pt-3">User Info</h3>

                        <div className="d-flex flex-row">
                            <div>Username: </div>
                            <input
                                type="username"
                                className="form-control"
                                value={currentUser.username}
                                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })} />

                        </div>

                        <div className="d-flex flex-row">
                            <div>Password: </div>
                            <input
                                type="password"
                                className="form-control"
                                value={currentUser.password}
                                onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })} />

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


                {!isMyProfile && viewedUser &&
                    (
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
                    )
                }
            </div>
        );
    }

    const publicProfile = () => {
        return (
            <div>
                <Navigation userId={account._id} /> 

                <div className="mt-3 bg-success">
                    <h1 className="text-center pt-3">{profile.username}'s Profile</h1>
                </div>

                <h1> {profile.username}'s favorites</h1>

                <div className="container bg-body-secondary">
                    {profile.favourites.map((trail) => (
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
                                <p className="fw-light fst-italic">Rating: {trail.rating}</p>
                                <div className="row justify-content-around">
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    const privateProfile = () => {
        return (
            <div>
                <Navigation userId={account._id} />

                <div className="mt-3 bg-success">
                    {/* <FaUser className="text-center"/> */}
                    <h1 className="text-center pt-3">{profile.username}'s Profile</h1>
                </div>

                <h3 className="text-center pt-3">User Info</h3>

                <div className="d-flex flex-row">
                    <div>Username: </div>
                    <input
                        type="username"
                        className="form-control"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })} />

                </div>

                <div className="d-flex flex-row">
                    <div>Password: </div>
                    <input
                        type="password"
                        className="form-control"
                        value={profile.password}
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })} />

                </div>

                {/* <pre>{JSON.stringify(currentUser, null, 2)}</pre> */}
                <button onClick={signout} className="btn btn-danger">
                    Sign Out
                </button>
                <button onClick={updateUser}>Update</button>
                <hr />

                <h1> My favorites</h1>
                <div className="container bg-body-secondary">
                    {profile.favourites.map((trail) => (
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
        )
    }


    return (
        <div>
            {profile._id?
                (id ? publicProfile() : (account._id? privateProfile() : <div>Please Login</div>)) :
                <div>Still Loading</div>
            }
        </div>

    );


}
export default Profile;
