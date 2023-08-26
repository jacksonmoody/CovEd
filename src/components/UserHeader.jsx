import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "../styling/User.scss";

export default function UserHeader(props) {
  return (
    <div className="user__header">
      <div className="user__header-image">
        <Avatar alt="Username" src={props.currentUser?.image} sx={{ width: 120, height: 120 }} />
      </div>
      <div className="user__header-text">
        <Typography variant="h3" className="user__header-text-name">
          {props.currentUser?.displayName}
        </Typography>
        <Typography variant="h5" className="user__header-text-subtext">
          {props.currentUser?.type} Dashboard
        </Typography>
      </div>
    </div>
  );
}
