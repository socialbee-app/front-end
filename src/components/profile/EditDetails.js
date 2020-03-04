import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import { IconButton, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  ...theme.spreader,
  button: {
    float: "right"
  }
});

const EditDetails = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.credentials);

  const [profileDetails, setProfileDetails] = useState({
    bio: "",
    website: "",
    location: "",
    open: false
  });

  const { classes } = props;

  useEffect(() => {
    setProfileDetails({
      bio: user.bio ? user.bio : "",
      website: user.website ? user.website : "",
      location: user.location ? user.location : ""
    });
  }, []);

  const handleOpen = () => {
    setProfileDetails({
      ...profileDetails,
      open: true
    });
  };

  const handleClose = () => {
    setProfileDetails({
      ...profileDetails,
      open: false
    });
  };

  const handleChange = event => {
    setProfileDetails({
      ...profileDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: profileDetails.bio,
      website: profileDetails.website,
      location: profileDetails.location
    };

    dispatch(editUserDetails(userDetails));
  };

  return (
    <>
      <Tooltip title="Edit Details" placement="top">
        <IconButton onClick={handleOpen} className={classes.button}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={profileDetails.open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A snippet about you"
              className={classes.textField}
              value={profileDetails.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your website"
              className={classes.textField}
              value={profileDetails.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={profileDetails.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(EditDetails);
