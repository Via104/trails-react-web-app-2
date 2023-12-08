import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useParms, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import './index.css';
import { FaCamera } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";

function Details() {
  const { trailId } = useParams();
  const trails = useSelector((state) => state.trailsReducer.trails)
  const [trail, setTrail] = useState({})
  const [tags, setTags] = useState({})
  // console.log(trailId)
  // console.log(trails)
  // console.log("finding trail")
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
    findTrailById(trailId)
  }, [trailId])

  // console.log(trail)
  // console.log(trail.length)





  return (
    <div className="d-flex flex-column">
      <div><h2>DetailsPage</h2></div>
      <div className="d-flex justify-content-center">
        <div className="card">
          <img style={{ "object-fit": "cover", 'height': '200px' }} className="card-img-top" src="https://cdn-assets.alltrails.com/uploads/photo/image/65495111/b69f316bb21126f19e83896e6f927443.jpg" alt="Card Image cap"></img>
          <div className="card-img-overlay">
            <div className="d-flex">

              <h3 className="card-title text-light me-auto">{trail.name}</h3>
              <button className="m-0 p-0" style={{ 'border': 'none', 'background': 'none' }} title="btn Add to list"><CiCirclePlus className="text-light" size={50} /> </button>
            </div>

            <p className="text-light h6">{trail.difficulty} {trail.rating}</p>
            <FaCamera className="text-light" size={50} />
            <FaCar className="text-light" size={50} />
          </div>
          <div className="card-body">
            <div className="d-flex flex-row">
              <div className="d-flex flex-column align-items-center col-4">
                <div className="text-muted justify-content-center">Length</div>
                <b>{trail.length} mi</b>
              </div>
              <div className="d-flex flex-column align-items-center col-4">
                <div className="text-muted justify-content-center">Elevation gain</div>
                <b>{trail.elevation_gain} ft</b>
              </div>
              <div className="d-flex flex-column align-items-center col-4">
                <div className="text-muted justify-content-center">Route type</div>
                <b>{trail.route_type}</b>
              </div>
            </div>
            <p className="ms-2 me-2"> {trail.summary}</p>

            <hr />
            <div className="d-flex flex-wrap">
              {/* {trail.tags.map((tag) => (<span className="tag p-1 m-1">{tag}</span>))} */}
              {/* {trail.tags} */}
              {/* {tags.map((tag) => (<span className="tag p-1 m-1">{tag}</span>))} */}


            </div>


            <hr />
            <p className="ms-2 me-2"> {trail.summary}</p>

            <h5 className="card-title">Card title</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Details;