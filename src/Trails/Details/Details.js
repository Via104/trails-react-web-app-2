import { Routes, Route, Navigate, useParams, json } from "react-router-dom";
import { useParms, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import './index.css';
import { FaCamera } from "react-icons/fa";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaCar, FaLocationDot } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { PiHeartFill, PiHeart } from "react-icons/pi";
import * as client from "../Search/client"
import * as UserClient from "../Users/client"
 
import AltImg from "./DefaultImg.png"

function Details({key}) {
  const { trailId } = useParams();
  const trails = useSelector((state) => state.trailsReducer.trails)
  const [trail, setTrail] = useState()
  const [account, setAccount] = useState({})
  const [favorites, setFavorites] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  const fetchAccount = async () => {
    try {
      const user = await UserClient.account();

      setAccount(user);
      setFavorites(user.favorites)
      console.log(`in fetch Account`)
      console.log(trailId)
      if (user.favorites.filter(t => t.id === Number(trailId)).length > 0) {
        console.log('this is favorited')
        setIsFavorite(true)
      }
      console.log(account)
    } catch (err) {
      console.log(err.response.data.message)
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
    return (
      <div className="container-fluid">
      <div className="d-flex justify-content-center">
        <div className="card mt-4 details shadow rounded align-middle">
        <img style={{ "objectFit": "cover", 'objectPosition': '50% 75%', 'filter': 'brightness(50%)', 'height': '600px' }}
          src={trail.thumbnail || AltImg}
          className="card-img-top" 
          alt="Not Found"
        ></img>
          {/* IMAGE OVERLAY */}
          <div className="card-img-overlay h-50 d-flex flex-column  justify-content-start">
            <div className="d-flex">
              <h3 className="card-title text-light me-auto display-1 justify-content-end">{trail.name}</h3>
              <button className="m-0 p-0" onClick={() => { alert('hi') }} style={{ 'border': 'none', 'background': 'none' }}>
                {isFavorite? <PiHeartFill className="text-danger" size={50}/> : <PiHeart className="text-light" size={50}/>}
              </button>
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
              <p className="display-6 fs-4 card-text fw-normal">Directions</p>
              <hr />

              {/* DIRECTIONS */}
              <p className="ms-2 card-text me-2">{trail.directions}</p>
              <div className="d-flex flex-wrap">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    )
  }

  useEffect(() => {
    UserClient.account().then(user => {
      setAccount(user);
      setFavorites(user.favorites)
      console.log(`in fetch Account`)
      console.log(trailId)
      if (user.favorites.filter(t => t.id === Number(trailId)).length > 0) {
        console.log('this is favorited')
        setIsFavorite(true)
      }
      console.log(account)
    })

    client.findTrailByID(trailId).then(t => {
      setTrail(t)
    })
    console.log(`stored trail: ${trail}`)
  }, [isFavorite])
 
  return (
    <div>{trail? DetailsPage() : <div>Still Loading</div>}</div>
    

  )
}


export default Details;