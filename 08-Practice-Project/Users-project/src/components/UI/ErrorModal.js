import React from "react";

import Card from "./Card";
import classes from './ErrorModal.module.css'
import Button from "./Button";

const ErrorModal = props =>{
  return(
    <div className={classes.backdrop}>
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>Error</h2>
        </header>
        <div className={classes.content}>
          <p>{props.children}</p>
          <Button onClick={props.onCancel}>Ok</Button>
        </div>
      </Card>
    </div>
  );
}

export default ErrorModal;