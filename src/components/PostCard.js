import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Components
import DeletePost from "./DeletePost";
import PostModal from "./PostModal";

// Redux
import { likePost, unlikePost, getPost } from "../redux/actions/dataActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

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

  const likedPost = () => {
    if (likes && likes.find(like => like.postId === postId)) {
      return true;
    } else {
      return false;
    }
  };

  const likeButton = !user.isAuthenticated ? (
    <Tooltip title="Like">
      <IconButton>
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </IconButton>
    </Tooltip>
  ) : likedPost() ? (
    <Tooltip title="Unlike">
      <IconButton onClick={() => dispatch(unlikePost(postId))}>
        <FavoriteIcon color="primary" />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Like">
      <IconButton onClick={() => dispatch(likePost(postId))}>
        <FavoriteBorder color="primary" />
      </IconButton>
    </Tooltip>
  );

  const deleteButton =
    user.isAuthenticated && username === user.credentials.username ? (
      <DeletePost postId={postId} dispatch={dispatch} />
    ) : null;

  // Post Modal Code
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
    dispatch(getPost(postId));
    console.log("wheee!");
  };

  const handleModalClose = () => {
    setModalOpen(false);
    console.log("wOOOOO!");
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
          {likeButton}
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
        />
      )}
    </>
  );
};

export default withStyles(styles)(PostCard);
