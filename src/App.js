import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Views
import home from "./views/home";
import signup from "./views/signup";
import login from "./views/login";

// Components
import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/signup" component={signup} />
            <Route path="/login" component={login} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
