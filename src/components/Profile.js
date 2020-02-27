import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Material-UI
import Button from "@material-ui/core/Button";
import MUILink from "@material-ui/core/Link";
import { Typography, Paper } from "@material-ui/core";
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// import themeFile from "../util/theme";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

// const theme = createMuiTheme(themeFile);

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: theme.palette.primary.main
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
});

const Profile = props => {
  const user = useSelector(state => state.user.credentials);
  const loading = useSelector(state => state.user.loading);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const { classes } = props;

  // Check if loading and nested is also checking if authenticated
  let profileMarkup = !loading ? (
    <p>loading...</p>
  ) : isAuthenticated ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <img src={user.imageUrl} alt="profile" />
        <hr />
        <div className="profile-details">
          <MUILink
            component={Link}
            to={`/users/${user.username}`}
            color="primary"
            variant="h5"
          >
            @{user.username}
          </MUILink>
          <hr />
          {user.bio && <Typography variant="body2">{user.bio}</Typography>}
          <hr />
          {user.location && (
            <>
              <LocationOn color="primary" />
              <span>{user.location}</span>
              <hr />
            </>
          )}
          {user.website && (
            <>
              <LinkIcon color="primary" />
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {" "}
                {user.website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined{dayjs(user.createAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="body2" align="center">
        No profile found, please login again
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
        >
          Signup
        </Button>
      </div>
    </Paper>
  );

  return profileMarkup;
};

export default withStyles(styles)(Profile);
