import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Paper, Link as MuiLink } from "@material-ui/core";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative"
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
    }
  }
});

const StaticProfile = props => {
  const { classes, profile } = props;
  console.log("profile", profile);
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={user.imageUrl} className="profile-image" alt="profile" />
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
  );
};

export default withStyles(styles)(StaticProfile);
