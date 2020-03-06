import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Redux
import { useSelector } from "react-redux";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.spreader,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 20
  }
});

const Comments = props => {
  const { classes } = props;

  const comments = useSelector(state => state.data.post.comments);

  return (
    <Grid container>
      {comments ? (
        comments.map((comment, i) => {
          const { body, createdAt, userImage, username } = comment;
          return (
            <React.Fragment key={i}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${username}`}
                        color="primary"
                      >
                        @{username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {i !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </React.Fragment>
          );
        })
      ) : (
        <p>There are any comments for this post</p>
      )}
    </Grid>
  );
};

export default withStyles(styles)(Comments);
