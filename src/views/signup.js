import React, { useState } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/socialbee2.png";
import axios from "axios";
import { Link } from "react-router-dom";

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

const Signup = props => {
  const { classes } = props;

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    loading: false,
    errors: {}
  });

  const handleSubmit = event => {
    event.preventDefault();
    setValues({
      ...values,
      loading: true
    });
    const newUserData = {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      username: values.username
    };
    axios
      .post("/signup", newUserData)
      .then(res => {
        console.log("res.data", res.data);
        localStorage.setItem("IdToken", `Bearer ${res.data.token}`);
        setValues({
          ...values,
          loading: false
        });
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        setValues({
          ...values,
          errors: err.response.data,
          loading: false
        });
      });
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
          Signup
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="confirmPassword"
            className={classes.textField}
            helperText={values.errors.confirmPassword}
            error={values.errors.confirmPassword ? true : false}
            value={values.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="username"
            name="username"
            type="text"
            label="username"
            className={classes.textField}
            helperText={values.errors.username}
            error={values.errors.username ? true : false}
            value={values.username}
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
            Signup
            {values.loading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
