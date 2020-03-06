import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import EditDetails from "./EditDetails";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, logoutUser } from "../../redux/actions/userActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MUILink from "@material-ui/core/Link";
import { Typography, Paper, IconButton, Tooltip } from "@material-ui/core";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

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
      width: 175,
      height: 175,
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

  const dispatch = useDispatch();

  const { classes } = props;

  const handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Check if loading and nested is also checking if authenticated
  let profileMarkup = loading ? (
    <p>loading...</p>
  ) : isAuthenticated ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={user.imageUrl} className="profile-image" alt="profile" />
          <input
            type="file"
            id="imageInput"
            onChange={handleImageChange}
            hidden="hidden"
          />
          <Tooltip title="Edit Profile Picture" placement="right">
            <IconButton onClick={handleEditPicture} className="button">
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
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
          <span>Joined {dayjs(user.createAt).format("MMM YYYY")}</span>
        </div>
        <Tooltip title="Logout" placement="top">
          <IconButton onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </IconButton>
        </Tooltip>
        <EditDetails />
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
