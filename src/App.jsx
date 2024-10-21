import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import LandingPage from "./LandingPage";
import Task from "./Task";

const App = () => {
  const location = useLocation(); 

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key} 
        classNames="fade" 
        timeout={300} 
      >
        <div className="container m-0 p-0">
          <div className="row m-0 justify-content-center">
            <div className="col-12 col-sm-12 col-md-10 col-lg-3 p-0">
              <Routes location={location}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Task" element={<Task />} />
              </Routes>
            </div>
          </div>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
