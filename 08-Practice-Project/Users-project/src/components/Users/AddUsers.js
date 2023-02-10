import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUsers.module.css";

const AddUser = (props) => {
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [missingData, setMissingData] = useState(false);

  const nameHandler = (event) => {
    setNameInput(event.target.value);
  };

  const ageHandler = (event) => {
    setAgeInput(event.target.value);
  };

  const closeModalHandler = () => {
    setMissingData(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (nameInput.trim().length === 0 || ageInput.trim().length === 0) {
      setMissingData(true);
      return;
    }
    const newUSer = {
      id: Math.random().toString(),
      name: nameInput,
      age: ageInput,
    };
    props.onAddUser(newUSer);
    setNameInput("");
    setAgeInput("");
  };

  return (
    <div>
      {missingData && (
        <ErrorModal onCancel={closeModalHandler}>
          Missing data, please enter valid information.
        </ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={submitHandler}>
          <label htmlFor="user-name">User Name:</label>
          <input
            name="user-name"
            type="text"
            onChange={nameHandler}
            value={nameInput}
          />
          <label htmlFor="user-age">User Age:</label>
          <input
            name="user-age"
            type="number"
            onChange={ageHandler}
            value={ageInput}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
