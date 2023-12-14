import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrailAPI_API, API_KEY } from "./client";
import * as client from "./client";
import "bootstrap/dist/css/bootstrap.min.css";

function Search() {
  const [searchLatitude, setSearchLatitude] = useState(0);
  const [searchLongitude, setSearchLongitude] = useState(0);

  const [searchID, setSearchID] = useState(288869);

  const [results, setResults] = useState([]);

  const fetchTrails = async () => {
    console.log("fetch reached");
    const trails = await client.findAllTrails();
    setResults(trails);

    console.log("fetch complete");
  };

  const findByID = async () => {
    console.log("find reached");
    const trails = await client.findTrailByID(searchID);
    setResults(trails);

    console.log("find complete");
  };

  useEffect(() => {
    findByID();
  }, []);

  return (
    <div className="container justify-content-center w-50">
      <div className="m-2 row justify-content-center">
        <h4 className="col-sm-2 col-form-label">Latitude</h4>
        <div class="col-sm-10">
          <input
            className="form-control mb-2"
            type="number"
            id="Latitude"
            value={38.79908}
            onChange={(event) => {
              setSearchLatitude(event.target.value);
            }}
          ></input>
        </div>

        <h4 className="col-sm-2 col-form-label">Longitude</h4>
        <div class="col-sm-10">
          <input
            className="form-control "
            type="number"
            id="Longitude"
            value={-104.88353}
            onChange={(event) => {
              setSearchLongitude(event.target.value);
            }}
          ></input>
        </div>
        <button
          className="btn btn-secondary w-50 m-3"
          onClick={() => fetchTrails()}
        >
          Generate Search
        </button>
      </div>
      {/* 
      <div className="d-flex w-75">
        <div className="form-group m-2">
          <input
            className="form-control"
            type="number"
            id="Id"
            value={searchID}
            onChange={(event) => {
              setSearchID(event.target.value);
            }}
          ></input>
          <button className="btn btn-secondary m-2" onClick={() => findByID()}>
            Search By ID
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Search;
