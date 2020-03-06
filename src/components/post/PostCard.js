import React, { useState } from "react";
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
  const {
    classes,
    post: {
      body,
      createdAt,
      userImage,
      username,
      postId,
      likeCount,
      commentCount
    },
    user,
    likes,
    dispatch,
    UI
  } = props;

  const deleteButton =
    user.isAuthenticated && username === user.credentials.username ? (
      <DeletePost postId={postId} dispatch={dispatch} />
    ) : null;

  // Post Modal Code
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
    dispatch(getPost(postId));
  };

  const handleModalClose = () => {
    setModalOpen(false);
    clearErrors();
  };

  dayjs.extend(relativeTime);
  return (
    <>
      <Card onClick={handleModalOpen} className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${username}`}
            color="primary"
          >
            {username}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <Tooltip title="comments">
            <IconButton>
              <ChatIcon color="primary" />
            </IconButton>
          </Tooltip>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
      {modalOpen && (
        <PostModal
          post={props.post}
          UI={UI}
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          user={user}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default withStyles(styles)(PostCard);
