import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { useDispatch } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

// Material-UI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import Tooltip from "@material-ui/core/ToolTip";

const Notifications = props => {
  const { notifications } = props;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    anchorEl: null,
    notifications: []
  });

  dayjs.extend(relativeTime);

  const handleOpen = event => {
    setState({
      ...state,
      anchorEl: event.target
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  const onOpen = () => {
    let unreadNotificationIds = notifications
      .filter(noti => noti.read === "false")
      .map(noti => noti.notificationId);
    dispatch(markNotificationsRead(unreadNotificationIds));
  };

<<<<<<< HEAD
  console.log("notifications", notifications);

  let counter = 0;
=======
  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter(noti => noti.read === "false").length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter(noti => noti.read === "false").length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }
>>>>>>> 959513d7c86ce7f1c1e2f1f2c2f1113f2d31a2ed

  let notificationsList =
    notifications && notifications.length > 0 ? (
      notifications.map((noti, i) => {
        const phrase = noti.type === "like" ? "liked" : "commented on";
        const time = dayjs(noti.createdAt).fromNow();
        const iconColor = noti.read ? "primary" : "secondary";
        const icon =
          noti.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        <MenuItem key={i} onClick={handleClose}>
          {icon}
          <Typography
            component={Link}
            color="default"
            variant="body1"
            to={`/users/${noti.recipient}/post/${noti.postId}`}
          >
            {noti.sender} {phrase} your post {time}
          </Typography>
        </MenuItem>;
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications...</MenuItem>
    );

  return (
    <>
      <Tooltip placement="bottom" title="Notifications">
        <IconButton
          aria-owns={state.anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={state.anchorEl}
        open={Boolean(state.anchorEl)}
        onClose={handleClose}
        onEntered={onOpen}
        placement="bottom"
      >
        {notificationsList}
      </Menu>
    </>
  );
};

export default Notifications;
