import { React } from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import Sidebar from './Components/SideBar';
import Content from "./Components/Content";
import BottomBar from "./Components/BottomBar";

function App() {

  return (
    <Router>
      <div className="wrapper">
        <Sidebar />
        <Content />
      </div>
      <BottomBar />
    </Router>
  );
}

export default App;
