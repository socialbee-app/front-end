import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Components
import DeletePost from "./DeletePost";
import PostModal from "./PostModal";
import LikeButton from "./LikeButton";

// Redux
import { getPost, clearErrors } from "../../redux/actions/dataActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
    alignItems: "flex-start",
    cursor: "pointer"
  },
  image: {
    minWidth: 200,
    minHeight: 200,
    maxHeight: 250,
    maxWidth: 250
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

const PostCard = props => {
  const { classes, post, user, dispatch, UI, match, location, history } = props;

  const deleteButton =
    user.isAuthenticated && post.username === user.credentials.username ? (
      <DeletePost postId={post.postId} dispatch={dispatch} />
    ) : null;

  // Post Modal Code
  const [modalOpen, setModalOpen] = useState(false);
  const [path, setPath] = useState({
    oldPath: "",
    newPath: ""
  });

  const handleModalOpen = () => {
    let oldPath = location.pathname;
    const newPath = `/users/${post.username}/post/${post.postId}`;

    setPath({
      oldPath,
      newPath
    });

    if (oldPath === newPath) {
      setPath({
        ...path,
        oldPath: `/users/${post.username}`
      });
    }

    if (oldPath !== "/") {
      history.push(newPath);
    }
    setModalOpen(true);
    dispatch(getPost(post.postId));
  };

  const handleModalClose = () => {
    history.push(path.oldPath);

    setPath({
      newPath: ""
    });

    setModalOpen(false);
    clearErrors();
  };

  useEffect(() => {
    if (match && match.params.postId && match.params.postId === post.postId) {
      handleModalOpen();
    }
  }, []);

  dayjs.extend(relativeTime);
  return (
    <>
      <Card onClick={handleModalOpen} className={classes.card}>
        <CardMedia
          image={post.userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${post.username}`}
            color="primary"
            onClick={e => e.stopPropagation()}
          >
            {post.username}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(post.createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{post.body}</Typography>
          <LikeButton postId={post.postId} />
          <span>{post.likeCount} Likes</span>
          <Tooltip title="comments">
            <IconButton>
              <ChatIcon color="primary" />
            </IconButton>
          </Tooltip>
          <span>{post.commentCount} comments</span>
        </CardContent>
      </Card>
      {modalOpen && (
        <PostModal
          openDialog={props.openDialog}
          post={post}
          UI={UI}
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          handleModalOpen={handleModalOpen}
          user={user}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default withStyles(styles)(PostCard);
