import React from "react";

import User from "./User";
import Card from "../UI/Card";

import classes from "./ListUsers.module.css";

const ListUsers = (props) => {
  return (
    <div>
      <Card className={classes.users}>
        {props.allUsers.length === 0 && <p>No users added yet!</p>}
        {props.allUsers.length > 0 && (
          <ul>
            {props.allUsers.map((user) => (
              <User
                styles={classes.users}
                key={user.id}
                name={user.name}
                age={user.age}
              />
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default ListUsers;
