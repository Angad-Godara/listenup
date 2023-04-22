import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/SideBar";
import Content from "./Components/Content";
import BottomBar from "./Components/BottomBar";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<>
        <div className="wrapper">
          <Sidebar />
          <Content />
        </div>
        <BottomBar />
        </>}/>
      </Routes>
    </Router>
  );
}

export default App;
