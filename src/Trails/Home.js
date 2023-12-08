import { Routes, Route, Navigate, useParams, Link } from "react-router-dom";
import { useParms, useLocation } from "react-router-dom"
import db from "./Database"
import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
function Home() {
  const trails = useSelector((state) => state.trailsReducer.trails);
  // console.log(trails);




  return (
    <div className="container-fluid">
      <div className="d-flex"><h2>HomePage</h2></div>
      {trails.map((trail, index) => (
        <Link to={`/details/${trail._id}`}
          key={index}
          className="card" style={{ "width": "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{trail.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>
        </Link>
      ))}




    </div>


  )
}

export default Home;