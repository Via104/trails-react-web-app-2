import { Routes, Route, Navigate, useParams, json, Link } from "react-router-dom";
import { useParms, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import './index.css';
import { FaCamera } from "react-icons/fa";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaCar, FaLocationDot } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { PiHeartFill, PiHeart } from "react-icons/pi";
import * as LikesClient from '../Likes/client'
import AltImg from "../Details/DefaultImg.png"
import Navigation from "../Navigation/profile-Nav";

function Community() {
  const [likes, setLikes] = useState()
  const {account} = useSelector((state) => state.accountReducer)

  useEffect(() => {
    LikesClient.findLikedTrails().then(l => {
      setLikes(l)
    })
  }, [])


  const community = () => {
    console.log('setLikes')
    console.log(likes)
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <div className=" community">
            {
              likes.map((l) => (
                <div className="card community shadow rounded">
                  <Link
                    className="community-link"
                    to={`/details/${l.trailId}`}>
                    <img style={{ "objectFit": "cover", 'objectPosition': '50% 75%', 'filter': 'brightness(50%)' }}
                      src={l.thumbnail || AltImg}
                      className="card-img-top community"
                      alt="Not Found"
                    ></img>
                    <div className="card-img-overlay d-flex flex-column  justify-content-start" style={{ }}>
                      <p className="display-5 text-light">{l.name}</p>
                      <span className="text-light align-text-bottom m-0 display-7"><FaLocationDot className="me-1 mb-1" />{l.city}, {l.region}</span>
                    </div>
                  </Link>

                  <div className="card-body community ">
                    {/* <p className="display-6 fs-4 card-text fw-normal">Description</p>
                    <hr />
                    <p className="">{l.description}</p> */}
                    <p className="display-6 fs-4 card-text fw-normal">Activity</p>
                    <hr />
                    <div className="activity">
                      {l.user_docs.map((user) => (
                        <div className="">
                          <Link
                            className="community-link"
                            to={`/profile/${user._id}`} //{trail.url}
                            style={{ 'textDecoration': "none" }}>
                            <p className="ms-2 card-text text-dark me-2"><PiHeartFill className="text-danger mb-1 me-1" />Liked by {user.username}</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

    )
  }

  return (
    <div>{likes ? <div><Navigation userId={account._id} /> {community()} </div> : <div>Still Loading</div>}</div>
  )
}

export default Community;