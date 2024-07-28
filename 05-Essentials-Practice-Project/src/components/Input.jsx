import React, { useState } from 'react'

export default function Input({inputID, label, updateValue, ...props}) {

  const [value, setValue] = useState(0);

  console.log("Input render")

  function InputUpdate(event) {
    setValue(event.target.value);
    updateValue(inputID, value)
  }
  return (
    <div>
      <label htmlFor={inputID}>{label}</label>
      <input id={inputID} onChange={InputUpdate} value={value} {...props}/>
  </div>
  )
}
