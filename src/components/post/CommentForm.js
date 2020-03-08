import React, { useState, useEffect } from "react";

// Redux
import { submitComment, clearErrors } from "../../redux/actions/dataActions";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  ...theme.spreader
});

const CommentForm = props => {
  const { classes, postId, user, UI, dispatch } = props;

  const [comment, setComment] = useState({
    body: "",
    errors: {}
  });

  useEffect(() => {
    UI.errors !== null &&
      setComment({
        ...comment,
        errors: UI.errors
      });

    dispatch(clearErrors());
  }, [UI.errors, dispatch]);

  const handleChange = event => {
    setComment({
      body: event.target.value,
      errors: {}
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(submitComment(postId, { body: comment.body }));
    setComment({
      body: "",
      errors: {}
    });
  };

  const addCommentForm = user.isAuthenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on post"
          error={comment.errors.comment ? true : false}
          helperText={comment.errors.comment}
          value={comment.body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;

  return addCommentForm;
};

export default withStyles(styles)(CommentForm);
