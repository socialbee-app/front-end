import React, { useState, useEffect } from "react";
import AppIcon from "../images/socialbee2.png";
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
  ...theme.spreader,
  button: {
    marginTop: 20,
    position: "relative"
  }
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
            helperText={values.errors.password || values.errors.general}
            error={
              values.errors.password || values.errors.general ? true : false
            }
            value={values.password}
            onChange={handleChange}
            fullWidth
          />
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

export default withStyles(styles)(Login);
