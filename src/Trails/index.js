import store from "./store";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Details from './Details/Details';
import Home from './Home';

function Trails() {
  return (
    <Provider store={store}>
      <HashRouter>
      <div className="container-fluid">
        <Routes>
        <Route path="/" element={<Navigate to="/trails" />} />
          <Route path="/trails" element={<Home/>}/>
          <Route path="/trails/details/:trailId" element={<Details/>}/>
        </Routes>
      </div>
    </HashRouter>
    </Provider>
  )
}

export default Trails;