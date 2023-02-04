import React, {useState} from "react";


import './ExpenseForm.css'

function ExpenseForm() {
  const [enteredTitle,setEnteredTitle] = useState('');
  const [enteredAmount,setEnteredAmount] = useState('');
  const [enteredDate,setEnteredDate] = useState('');

  // ***** Alternative using only 1 State instead of 3
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '',
  //   enteredDate: ''
  // });

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    console.log(enteredTitle);

    // ***** Alternative using only 1 State instead of 3
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value
    // });
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    console.log(enteredAmount);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    console.log(enteredDate);
  }
  return(
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type='text' onChange={titleChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type='number'min="0.01" step="0.01" onChange={amountChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type='date' min="2023-01-01" max="2025-12-31" onChange={dateChangeHandler}/>
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;