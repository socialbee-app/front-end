import React from "react";
import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const styles = theme => ({
  ...theme.spreader
});

const LikeButton = props => {
  const { postId } = props;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const likedPost = () => {
    if (user.likes && user.likes.find(like => like.postId === postId)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {!user.isAuthenticated ? (
        <Tooltip title="Like">
          <IconButton>
            <Link to="/login">
              <FavoriteBorder color="primary" />
            </Link>
          </IconButton>
        </Tooltip>
      ) : likedPost() ? (
        <Tooltip title="Unlike">
          <IconButton
            onClick={event => {
              event.stopPropagation();
              dispatch(unlikePost(postId));
            }}
          >
            <FavoriteIcon color="primary" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Like">
          <IconButton
            onClick={event => {
              event.stopPropagation();
              dispatch(likePost(postId));
            }}
          >
            <FavoriteBorder color="primary" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default withStyles(styles)(LikeButton);
