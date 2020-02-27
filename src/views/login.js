import React from "react";
import PropTypes from "prop-types";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  form: {
    textAlign: "center"
  }
};

const Login = props => {
  const { classes } = props;

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <p>fillerrrrr</p>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
