import React from "react";
import "./App.css";
import jwtDecode from "jwt-decode";

// Material-UI
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

// Views
import home from "./views/home";
import signup from "./views/signup";
import login from "./views/login";

// Components
import NavBar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(themeFile);

let isAuthenticated;
const token = localStorage.IdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                path="/signup"
                component={signup}
                isAuthenticated={isAuthenticated}
              />
              <AuthRoute
                path="/login"
                component={login}
                isAuthenticated={isAuthenticated}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
