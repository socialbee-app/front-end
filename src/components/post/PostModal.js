import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Components
import Comments from "./Comments";
import LikeButton from "./LikeButton";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = theme => ({
  ...theme.spreader,
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0
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
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(post.createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{post.body}</Typography>
        <LikeButton postId={post.postId} />
        <span>{post.likeCount} Likes</span>
        <Tooltip title="comments">
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </Tooltip>
        <span>{post.commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <Comments comments={post.comments} />
    </Grid>
  );

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        fullWidth
        maxWidth="sm"
        className={classes.container}
      >
        <DialogContent className={classes.content}>
          {modalContent}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(PostModal);
