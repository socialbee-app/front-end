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

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
};

const Login = props => {
  const { classes } = props;

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    errors: {}
  });

  const handleSubmit = event => {
    event.preventDefault();
    setValues({
      ...values,
      loading: true
    });
    const userData = {
      email: values.email,
      password: values.password
    };
    axios
      .post("/login", userData)
      .then(res => {
        console.log("res.data", res.data);
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
