import logo from './logo.svg';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Home from './Trails/Home'
import Trails from './Trails';
function App() {
  return (
    <div>
      <Trails/>
    </div>
    
  );
}

export default App;
