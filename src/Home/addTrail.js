import { React, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "../Navigation/footer.js";
import * as client from "../Users/client.js";
import "./index.css";

const uniqueId = Date.now().toString(36);

function AddTrail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trail, setTrail] = useState({
    id: uniqueId,
    name: "",
    url: "",
    length: 0,
    description: "",
  });

  // checks if all fields are filled out
  const checkTrailValidity = async () => {
    if (
      trail.name === "" ||
      trail.url === "" ||
      trail.length === "" ||
      trail.description === ""
    ) {
      alert("Please fill in all fields.");
    } else {
      // add new trail to favourites
      await client.addToFavourites(id, trail); // update users collection
      await client.addToFavouritesTrails(id, trail); // update trails collection
      alert("Trail added successfully!");
      navigate(`/home/${id}`, { replace: true });
    }
  };

  return (
    <div>
      <Navigation />
      <div className="container-fluid m-3">
        <h2 className="pb-3">Add a Trail</h2>
        <div className="form-group w-50">
          <label className="form-label">Trail Name* :</label>
          <input
            type="Text"
            className="form-control mb-2"
            onChange={(e) => setTrail({ ...trail, name: e.target.value })}
          ></input>

          <label className="form-label">URL* :</label>
          <input
            type="Text"
            className="form-control mb-2"
            onChange={(e) => setTrail({ ...trail, url: e.target.value })}
          ></input>

          <label className="form-label">Length (miles)* :</label>
          <input
            type="Number"
            className="form-control mb-2"
            onChange={(e) => setTrail({ ...trail, length: e.target.value })}
          ></input>

          <label className="form-label">Description* :</label>
          <input
            type="Text"
            className="form-control mb-2"
            onChange={(e) =>
              setTrail({ ...trail, description: e.target.value })
            }
          ></input>
        </div>

        <div
          className="btn btn-success mt-3 w-25"
          onClick={() => {
            checkTrailValidity();
          }}
        >
          Save
        </div>

        <Link to={`/home/${id}`} className="btn btn-warning mt-3 ms-3 w-25">
          Cancel
        </Link>
      </div>
      <Footer />
    </div>
  );
}
export default AddTrail;
