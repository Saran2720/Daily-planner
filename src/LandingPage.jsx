import React from "react";
import { Link } from "react-router-dom";
import landingImg from "./assets/landing.png";
import "./landing.css";
const LandingPage = () => {
  return (
    <>
      <div className="landingpage">
        <div className="container-fluid p-0">
          <figure className="landingimg">
            <img src={landingImg} alt="#" />
          </figure>
          <div className="row m-0 mt-5">
            <div className="col-12 text-center my-5">
              <h2>Welcome to Daily Planner</h2>
              <p>
                "Welcome to your task manager! Stay organized, set priorities,
                and tackle your day with confidence."
              </p>
            </div>
            <div className="col text-center mt-5">
              <button className="btn letsStartbtn py-2">
                <Link to={"/Task"}>Lets Start</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
