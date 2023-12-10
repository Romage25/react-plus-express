import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Add from "./components/Add.jsx";
import Edit from "./components/Edit.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
