import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/socialbee2.png";
import axios from "axios";
import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme.spreader
});

const Login = props => {
  // const user = useSelector(state => state.userReducer);
  const errors = useSelector(state => state.UI.errors);
  const dispatch = useDispatch();

  const { classes } = props;

  const [values, setValues] = useState({
    email: "",
    password: "",
    errors: {}
  });

  useEffect(() => {
    if (errors) {
      setValues({
        ...values,
        errors: errors
      });
    }
  }, [errors]);

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: values.email,
      password: values.password
    };
    console.log("userData", userData);
    dispatch(loginUser(userData, props.history));
  };

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="bee logo" className={classes.image} />
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={values.errors.email}
            error={values.errors.email ? true : false}
            value={values.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={values.errors.password}
            error={values.errors.password ? true : false}
            value={values.password}
            onChange={handleChange}
            fullWidth
          />
          {values.errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {values.errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled={values.loading}
          >
            Login
            {values.loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
