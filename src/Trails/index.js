import store from "./store";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Details from './Details/Details';
import Home from './Home';
import Search from "./Search/search";
import NewHome from "./Home/index.js";
import Signin from "./Users/signin.js";
import Signup from "./Users/signup.js";
import Navigation from "./Navigation/index.js";
import Community from "./Community/index.js";

function Trails() {
  return (
    <Provider store={store}>
      <HashRouter>
      <div className="container-fluid">
        <Routes>
        {/* <Route path="/" element={<Navigate to="home" />} /> */}
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<NewHome/>} />
          {/* <Route path="home" element={<Home/>}/> */}
          <Route path="details/:trailId" element={<Details key ={new Date()}/>}/>
          <Route path="search" element={ <Search/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/community" element={<Community/>} />
        </Routes>
      </div>
    </HashRouter>
    </Provider>
  )
}

export default Trails;