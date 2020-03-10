import React from "react";

import Badge from "@material-ui/core/Badge";

import NotificationsIcon from "@material-ui/icons/Notifications";

const Count = props => {
  const { counter } = props;
  // let notificationsIcon;
  // if (notifications && notifications.length > 0) {
  //   console.log("here");
  //   const num = notifications.filter(noti => noti.read === false).length > 0
  //     ? (notificationsIcon = (
  //         // <Badge
  //         //   badgeContent={
  //         //     num
  //         //   }
  //         //   color="secondary"
  //         // >
  //         //   <NotificationsIcon />
  //         // </Badge>
  //       ))
  //     : (notificationsIcon = <NotificationsIcon />);
  // } else {
  //   notificationsIcon = <NotificationsIcon />;
  // }
  // useEffect;

  return counter > 0 ? (
    <Badge badgeContent={counter} color="secondary">
      <NotificationsIcon />
    </Badge>
  ) : (
    <NotificationsIcon />
  );
};

export default Count;
