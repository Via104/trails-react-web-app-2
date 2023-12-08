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
 
import AltImg from "./DefaultImg.png"

function Details() {
  const { trailId } = useParams();
  const trails = useSelector((state) => state.trailsReducer.trails)
  const [trail, setTrail] = useState({})
  const [tags, setTags] = useState({})
  // console.log(trailId)
  // console.log(trails)
  // console.log("finding trail")
  const getTrail = async (trailId) => {
    const t = await client.findTrailByID(trailId)
    setTrail(t.data[0])
    // const [t] = 
    // console.log("finding trail");
    // console.log(trails.filter((trail) => trail._id === trailId))
    console.log(`trail: ${JSON.stringify(t)}`)
    // console.log(`trail: ${t.data}`)
    console.log(`trail1: ${JSON.stringify(trail)}`)
    console.log(`trail1: ${trail.name}`)

  }

  const stars = (rating) => {
    let s = []
    for (let i = 0; i < 5; i++) {
      s.push(<FaRegStar className="text-warning mb-1" />)
    }
    let x = 0
    for (x = 0; x < rating - 1; x++) {
      s[x] = <FaStar className="text-warning mb-1" />
    }
    console.log(x)
    let rem = rating - x
    if (rem >= 0.8) {
      s[x] = <FaStar className="text-warning mb-1" />
    }
    else if (rem >= 0.3) {
      s[x] = <FaStarHalfAlt className="text-warning mb-1" />
    }

    return s;
  }

  const findTrailById = (trailId) => {
    // const [t] = 
    // console.log("finding trail");
    // console.log(trails.filter((trail) => trail._id === trailId))
    setTrail(trails.filter((trail) => trail._id == trailId)[0])
    setTags(trail.tags)
    console.log(`trail: ${JSON.stringify(trail)}`)
    console.log(`trail tags: ${trail.tags}`)
    console.log(`tags: ${tags}`)
    console.log(JSON.stringify(tags))

  }

  useEffect(() => {
    // findTrailById(trailId)
    getTrail(trailId)
  }, [trailId])

  // console.log(trail)
  // console.log(trail.length)
  console.log(stars(3.5))
  const imgRef = useRef();
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center">
        <div className="card mt-4 details shadow rounded align-middle">
        <img style={{ "object-fit": "cover", 'object-position': '50% 75%', 'filter': 'brightness(50%)', 'height': '600px' }}
          src={trail.thumbnail || AltImg}
          // ref={imgRef()}
          // onError={this.img.src=AltImg}
          className="card-img-top" 
          alt="Not Found"
        ></img>
          {/* {trail.thumbnail? 
            // <img style={{ "object-fit": "cover", 'object-position': '50% 75%', 'filter': 'brightness(50%)', 'height': '600px' }} className="card-img-top" src={trail.thumbnail} alt='../Resources/DefaultImg.png'></img>
            // :<img style={{ "object-fit": "cover", 'object-position': '50% 75%', 'filter': 'brightness(50%)', 'height': '600px' }} className="card-img-top" src={trail.thumbnail} alt="Card Image cap"></img>
          } */}
          {/* IMAGE OVERLAY */}
          <div className="card-img-overlay h-50 d-flex flex-column  justify-content-start">
            <div className="d-flex">
              <h3 className="card-title text-light me-auto display-1 justify-content-end">{trail.name}</h3>
              {/* <PiHeart className="text-light" onClick={() => {alert('hi')}} size={50} /> */}
              <button className="m-0 p-0" onClick={() => { alert('hi') }} style={{ 'border': 'none', 'background': 'none' }}><PiHeart className="text-light" size={50} /> </button>
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
            {/* <div className="d-flex">
              <h3 className="card-title text-light me-auto display-1">{trail.name}</h3>
              
            </div>
            <div className="flex-fill">
              <p className="text-light h6">{trail.difficulty} {trail.rating}</p>
              <FaCamera className="text-light" size={50} />
              <FaCar className="text-light" size={50} />
              <div className="info align-bottom" style={{ 'background-color': 'rgba(0,0,0,0.5)' }}>
                hello
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>


  )
}

export default Details;