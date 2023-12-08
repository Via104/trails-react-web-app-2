import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TrailAPI_API , API_KEY} from "./client";
import * as client from "./client";
import 'bootstrap/dist/css/bootstrap.min.css';


function Search() {

    const [searchLatitude, setSearchLatitude] = useState(0);
    const [searchLongitude, setSearchLongitude] = useState(0);

    const [searchID, setSearchID] = useState(288869);

    const [results, setResults] = useState([]);

    const fetchTrails = async () => {

        console.log("fetch reached");
        const trails = await client.findTrails(searchLatitude, searchLongitude);
        setResults(trails);

        console.log("fetch complete");

    }

    const findByID = async () => {

        console.log("find reached");
        const trails = await client.findTrailByID(searchID);
        setResults(trails);

        console.log("find complete");
    }

    useEffect(() => {
        findByID()
      }, []);


    return (
        <div>
            <input 
                type='number' 
                id='Latitude'
                placeholder='Latitude...'
                value={searchLatitude}
                onChange={(event) => {
                    setSearchLatitude(event.target.value);
                } }>
            </input>

            <input 
                type='number' 
                id='Longitude'
                placeholder='Longitude...'
                value={searchLongitude}
                onChange={(event) => {
                    setSearchLongitude(event.target.value);
                } }>
            </input>

            <button onClick={() => fetchTrails()}>
                Generate Search
            </button>

            <input 
                type='number' 
                id='Id'
                placeholder='Id...'
                value={searchID}
                onChange={(event) => {
                    setSearchID(event.target.value);
                } }>
            </input>

            <button onClick={() => findByID()}>
                Search By ID
            </button>


            <hr/>

            {/* <pre>
                {JSON.stringify(results, null, 2)}
            </pre> */}

            <div class="d-flex flex-row flex-wrap">
                {results.map((trail) => (
                    <div class="card .col-md-8">
                        <img src="green2.jpg"
                            class="card-img-top" alt="..."></img>
                        <div class="card-body">
                            <h5 class="card-title">{trail.name}</h5>
                            <p class="card-text">
                                {trail.description}
                            </p>
                        </div>
                    </div>    
                ))}
            </div>
        </div>
    );
}

export default Search;