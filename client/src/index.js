import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import App from "./App";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <App />
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
