
import {Routes, Route, Navigate} from "react-router";
import Search from "./search.js";
function Trails() {
    return (
        <div>

            <h1>TRAILS PAGE</h1>
           
            <Routes>
                <Route path="/" element={<Navigate to="Profile" />} />
                <Route path="Profile" element={<h1>Profile</h1>} />
                <Route path="Search" element={ <Search/>} />               
            </Routes>
  
        </div>
       
     );
}


export default Trails;