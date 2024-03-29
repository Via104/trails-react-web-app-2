import { Routes, Route, Navigate, useParams, json, Link } from "react-router-dom";
import { useParms, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import './index.css';
import { FaCamera } from "react-icons/fa";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaCar, FaLocationDot } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { PiHeartFill, PiHeart } from "react-icons/pi";
import * as Client from "../Search/client"
import * as LikesClient from "../Likes/client"
import Navigation from "../Navigation/profile-Nav";
import AltImg from "./DefaultImg.png"
import { setAccount } from "../store/accountReducer";

function Details() {
  const { trailId } = useParams();
  console.log(`TRAIL ID: ${trailId}`)
  const [trail, setTrail] = useState()
  const [isFavorite, setIsFavorite] = useState(false)
  const {account} = useSelector((state) => state.accountReducer)
  const [likes, setLikes] = useState([])

  console.log(`details: ${JSON.stringify(account)}`)

  useEffect(() => {
    // Getting trail object
    const getTrailAndLikes = async () => {
      Client.findTrailByID(trailId).then(t => {
        setTrail(t)
        console.log('trail')
        console.log(trail)
      })

      LikesClient.findUsersOfLikedTrail(trailId).then(l => {
        setLikes(l[0].users)
        console.log('likes')
        console.log(l[0].users)
        // setIsFavorite becomes true if the current userId matches any of the userIds
        // in this trails list of liked users
        if (account._id && l[0].users.filter(user => user._id === account._id).length > 0) {
          setIsFavorite(true)
        }
      })
    }
    getTrailAndLikes()
  }, [trailId])

  const saveToFavorites = async (trail) => {
    // check if user is signed in
    console.log("**saveToFavorites**")
    console.log(trail)
    if (!account._id) {
      alert("Create account to add to favorites!")
    }
    else {
      try {
        const like = await LikesClient.createUserLikesTrail(account._id, trail);
        setIsFavorite(true)
        alert("Added trail to favorite!");
      } 
      catch (err) {
        alert("failed to add to favorite")
      }
    }

  };

  const removeFromFavorites = async (trail) => {
    console.log('**removeFromFavorites')
    if (!account._id) {
      alert("Create account to add to favorites!")
    }
    else {
      try {
        const status = await LikesClient.deleteUserLikesTrail(account._id, trail.id);
      console.log(status)
      setIsFavorite(false)
      alert("removed from favorites!");
      }
      catch (err) {
        console.log('removeFromFavorites failed')
        console.log(err)
      }
    }
  };

  const stars = (rating) => {
    let s = []
    for (let i = 0; i < 5; i++) {
      s.push(<FaRegStar key={i} className="text-warning mb-1" />)
    }
    let x = 0
    for (x = 0; x < rating - 1; x++) {
      s[x] = <FaStar key={x} className="text-warning mb-1" />
    }
    let rem = rating - x
    if (rem >= 0.8) {
      s[x] = <FaStar className="text-warning mb-1" />
    }
    else if (rem >= 0.3) {
      s[x] = <FaStarHalfAlt className="text-warning mb-1" />
    }
    return s;
  }


  const DetailsPage = () => {
    console.log("THIS IS THE ACCOUNT")
    console.log(account)
    console.log(account._id)
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <div className="card mt-4 details shadow rounded align-middle">
            <img style={{ "objectFit": "cover", 'objectPosition': '50% 75%', 'filter': 'brightness(50%)', 'height': '500px'}}
              src={trail.thumbnail || AltImg}
              className="card-img-top"
              alt="Not Found"
            ></img>
            {/* IMAGE OVERLAY */}
            <div className="card-img-overlay d-flex flex-column  justify-content-start" style={{'height': '500px'}}>
              <div className="d-flex">
                <h3 className="card-title text-light me-auto display-1 justify-content-end">{trail.name}</h3>
                {isFavorite ? <PiHeartFill onClick={() => { removeFromFavorites(trail) }} style={{ 'border': 'none', 'background': 'none' }} className=" btn text-danger" size={100} /> : <PiHeart onClick={() => { saveToFavorites(trail) }} style={{ 'border': 'none', 'background': 'none' }} className="btn text-light" size={100} />}
                {/* <button className="m-0 p-0" onClick={() => { alert('hi'); saveToFavorites(trail) }} style={{ 'border': 'none', 'background': 'none' }}>
                {isFavorite? <PiHeartFill className=" btn text-danger" size={50}/> : <PiHeart className="text-light" size={50}/>}
              </button> */}
              </div>
              <div className="flex-fill">

                <span className="text-light align-text-bottom m-0 display-7"><FaLocationDot className="me-1 mb-1" />{trail.city}, {trail.region}</span>
              </div>
            </div>
            {/* TRAIL CONTENT */}
            <div className="card-body h-75 d-flex flex-column text-dark">
              <div className="flex-grow">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column align-items-center col-4">
                    <div className="text-dark justify-content-center fs-6 fw-normal">Rating</div>

                    <b className="fw-bold">{stars(trail.rating).map((star) => star)}<span className="ms-1">{trail.rating}</span></b>
                  </div>
                  <div className="d-flex flex-column align-items-center col-4">
                    <div className="text-dark justify-content-center">Length</div>
                    <b>{trail.length} mi</b>
                  </div>
                  <div className="d-flex flex-column align-items-center col-4">
                    <div className="text-dark justify-content-center">Difficulty</div>
                    <b>{trail.difficulty}</b>
                  </div>
                </div>
                {/* DESCRIPTION */}
                <p className="display-6 fs-4 fw-normal">Description</p>
                <hr />
                <p className="ms-2 card-text me-2"> {trail.description}</p>

                {/* FEATURES */}
                {trail.features && (
                  <div>
                    <p className="display-6 fs-4 card-text fw-normal">Features</p>
                    <hr />
                    <p className="ms-2 card-text mb-3 me-2">{trail.features}</p>
                  </div>)}
                {/* DIRECTIONS */}
                <p className="display-6 fs-4 card-text fw-normal">Directions</p>
                <hr />
                <p className="ms-2 card-text me-2">{trail.directions}</p>
                <p className="display-6 fs-4 card-text fw-normal">Likes</p>
                <hr />
                <div className="overflow">
                  {likes && likes.map((l) => (
                    <div className="">
                      <Link
                        to={`/profile/${l._id}`} //{trail.url}
                        style={{ 'textDecoration': "none" }}>
                        <p className="ms-2 card-text text-dark me-2"><PiHeartFill className="text-danger mb-1 me-1" />Liked by {l.username}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }

  return (
    <div>{trail && account? <div><Navigation userId={account._id} /> {DetailsPage()}</div> : <div>Still Loading</div>}</div>
  )
}


export default Details;