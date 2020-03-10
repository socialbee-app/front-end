import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Redux
import { getPost } from "../../redux/actions/dataActions";
import { useSelector, useDispatch } from "react-redux";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Paper, Link as MUILink } from "@material-ui/core";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
  ...theme.spreader
});

const StaticProfile = props => {
  const { classes, profile } = props;
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

  const renderContent = profile.profileData ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img
            src={profile.profileData.imageUrl}
            className="profile-image"
            alt="profile"
          />
        </div>
        <hr />
        <div className="profile-details">
          <MUILink
            component={Link}
            to={`/users/${profile.profileData.username}`}
            color="primary"
            variant="h5"
          >
            @{profile.profileData.username}
          </MUILink>
          <hr />
          {profile.profileData.bio && (
            <Typography variant="body2">{profile.profileData.bio}</Typography>
          )}
          <hr />
          {profile.profileData.location && (
            <>
              <LocationOn color="primary" />
              <span>{profile.profileData.location}</span>
              <hr />
            </>
          )}
          {profile.profileData.website && (
            <>
              <LinkIcon color="primary" />
              <a
                href={profile.profileData.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {profile.profileData.website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{" "}
          <span>
            Joined {dayjs(profile.profileData.createAt).format("MMM YYYY")}
          </span>
        </div>
      </div>
    </Paper>
  ) : (
    <p>...Loading</p>
  );

  return <div>{renderContent}</div>;
};

export default withStyles(styles)(StaticProfile);
