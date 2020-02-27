import React from "react";
import "./App.css";

// Material-UI
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Views
import home from "./views/home";
import signup from "./views/signup";
import login from "./views/login";

// Components
import NavBar from "./components/Navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#424242",
      light: "#6d6d6d",
      dark: "#1b1b1b",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#fdd835",
      light: "#ffff6b",
      dark: "#c6a700",
      contrastText: "#000000"
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

export default App;
