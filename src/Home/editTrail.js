import { React, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "../Navigation/footer.js";
import * as client from "../Users/client.js";
import "./index.css";

function EditTrail() {
  const { id, trailId } = useParams();
  const navigate = useNavigate();

  const [trail, setTrail] = useState({
    name: "",
    url: "",
    length: 0,
    description: "",
  });

  const currentTrail = async () => {
    const curr = await client.findTrailByID(trailId);
    setTrail(curr.data[0]);
    console.log(trail);
  };

  useEffect(() => {
    currentTrail();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="container-fluid m-3">
        <h2 className="pb-3">Edit a Trail</h2>
        <div className="form-group w-50">
          <label className="form-label">Trail Name:</label>
          <input
            value={trail.name}
            type="Text"
            className="form-control mb-2"
            onChange={(e) => setTrail({ ...trail, name: e.target.value })}
          ></input>

          <label className="form-label">URL:</label>
          <input
            value={trail.url}
            type="Text"
            className="form-control mb-2"
            onChange={(e) => setTrail({ ...trail, url: e.target.value })}
          ></input>

          <label className="form-label">Length (miles):</label>
          <input
            value={trail.length}
            type="Number"
            className="form-control mb-2"
            onChange={(e) => setTrail({ ...trail, length: e.target.value })}
          ></input>

          <label className="form-label">Description:</label>
          <input
            value={trail.description}
            type="Text"
            className="form-control mb-2"
            onChange={(e) =>
              setTrail({ ...trail, description: e.target.value })
            }
          ></input>
        </div>

        <Link
          to={`/home/${id}`}
          className="btn btn-success mt-3 w-25"
          onClick={() => {
            // need to add trail to favourite before editing
            client.addToFavourites(id, trailId);
            // update trail
            client.updateTrail(trail);
            alert("Trail details saved!");
          }}
        >
          Save
        </Link>

        <Link to={`/home/${id}`} className="btn btn-warning mt-3 ms-3 w-25">
          Cancel
        </Link>
      </div>
      <Footer />
    </div>
  );
}
export default EditTrail;
