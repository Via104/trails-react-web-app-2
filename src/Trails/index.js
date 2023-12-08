import store from "./store";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Details from './Details/Details';
import Home from './Home';
import Search from "./Search/search";
import NewHome from "./Home/index.js";

function Trails() {
  return (
    <Provider store={store}>
      <HashRouter>
      <div className="container-fluid">
        <Routes>
        {/* <Route path="/" element={<Navigate to="home" />} /> */}
        <Route path="/" element={<Navigate to="newHome" />} />
        <Route path="newHome" element={<NewHome/>} />
          {/* <Route path="home" element={<Home/>}/> */}
          <Route path="details/:trailId" element={<Details/>}/>
          <Route path="search" element={ <Search/>} />
        </Routes>
      </div>
    </HashRouter>
    </Provider>
  )
}

export default Trails;