import React, { useState } from "react";

// Redux
import { addPost } from "../redux/actions/dataActions";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  ...theme.spreader,
  submitButton: {
    position: "relative",
    marginTop: 20,
    marginBottom: 10,
    float: "right"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0
  }
});

const AddPost = props => {
  const { classes, menuId, UI, dispatch } = props;

  const [post, setPost] = useState({
    open: false,
    body: "",
    errors: {}
  });

  const handleOpen = () => {
    setPost({
      ...post,
      open: true
    });
  };

  const handleClose = () => {
    setPost({
      ...post,
      open: false,
      errors: {}
    });
  };

  const handleChange = event => {
    setPost({
      ...post,
      body: event.target.value,
      errors: {}
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (post.body === "") {
      setPost({
        ...post,
        errors: { body: "Post must not be empty" }
      });
      return;
    }
    dispatch(addPost(post));
    setPost({
      ...post,
      body: "",
      open: false,
      errors: {}
    });
  };

  return (
    <>
      <Tooltip title="Add a post">
        <IconButton
          aria-label="add a post"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={post.open} onClose={handleClose} fullWidth maxWidth="sm">
        <Tooltip title="Close">
          <IconButton
            aria-label="close modal"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleClose}
            color="inherit"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <DialogTitle>Create Your Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Add your post here..."
              multiline
              rows="3"
              placeholder="What are you wanting to share?"
              error={post.errors.body ? true : false}
              helperText={post.errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(AddPost);
