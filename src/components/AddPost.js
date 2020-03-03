import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../redux/actions/userActions";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import AddIcon from "@material-ui/icons/Add";

const styles = {};

const AddPost = props => {
  const { menuId } = props;
  return (
    <Tooltip title="Create a post">
      <IconButton
        aria-label="add a post"
        aria-controls={menuId}
        aria-haspopup="true"
        // onClick={}
        color="inherit"
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default withStyles(styles)(AddPost);
