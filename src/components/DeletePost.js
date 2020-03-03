import React, { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/actions/dataActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = {
  deleteButton: {
    position: "absolute",
    right: 10,
    bottom: 27.5
  }
};

const DeletePost = props => {
  const [open, setOpen] = useState(false);

  const { classes, postId, dispatch } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(postId));
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete Post">
        <IconButton onClick={handleOpen} className={classes.deleteButton}>
          <DeleteOutline color="secondary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(DeletePost);
