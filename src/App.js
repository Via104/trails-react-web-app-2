import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

import { Navigate } from "react-router";
import Home from "./Home";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
