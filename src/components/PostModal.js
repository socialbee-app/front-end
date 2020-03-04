import React, { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Redux
// import { getPost } from "../redux/actions/dataActions";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const styles = theme => ({
  ...theme.spreader,
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0
  },
  separator: {
    border: "none",
    margin: 4
  },
  userImage: {
    borderRadius: "50%",
    objectFit: "cover",
    minWidth: 125,
    minHeight: 125,
    maxHeight: 175,
    maxWidth: 175
  },
  content: {
    padding: 20
  }
});

const PostModal = props => {
  const {
    classes,
    post,
    UI,
    dispatch,
    handleModalOpen,
    handleModalClose,
    modalOpen
  } = props;

  // const [modalOpen, setModalOpen] = useState(false);

  // const handleModalOpen = () => {
  //   setModalOpen(true);
  //   dispatch(getPost(post.postId));
  // };

  // const handleModalClose = () => {
  //   setModalOpen(false);
  // };

  const modalContent = UI.loading ? (
    <CircularProgress size={150} />
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img
          src={post.userImage}
          alt="User Image"
          className={classes.userImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${post.username}`}
        >
          @{post.username}
        </Typography>
        <hr className={classes.separator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(post.createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.separator} />
        <Typography variant="body1">{post.body}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      {/* <Tooltip title="Expand">
        <IconButton onClick={handleModalOpen}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Tooltip> */}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        fullWidth
        maxWidth="sm"
        // onBackdropClick={handleModalClose}
        className={classes.container}
      >
        {/* <Tooltip title="Close">
          <IconButton
            aria-label="close modal"
            aria-haspopup="true"
            onClick={handleModalClose}
            color="inherit"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip> */}
        <DialogContent className={classes.content}>
          {modalContent}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(PostModal);
