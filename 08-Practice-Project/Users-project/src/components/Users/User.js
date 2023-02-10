import React from "react";

import classes from './User.module.css'

const User = props => {
  return (
    <li className={`${props.styles} ${classes.user}`}>
      Name: {props.name}, Age: {props.age}
    </li>
  );
}

export default User;