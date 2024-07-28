import React, { useState } from 'react'
import Input from './Input.jsx';


const INITIAL_STATE = [
  { type: 'Initial-Investment', value: 0 },
  { type: 'Annual-Investment', value: 0 },
  { type: 'Expected-Return', value: 0 },
  { type: 'Duration', value: 0},
];

export default function FormSection() {
const [investmentData, setInvestmentData] = useState(INITIAL_STATE);

 function updateInvestmentHandler (field, updatedValue) {
   setInvestmentData( prevData => {
    let updatedData = [...prevData];
    
    for (const investment of updatedData) {
      if(investment.type === field) {
        investment.value = updatedValue;
      }
    }
    return(updatedData);
  })
 }


  return (
    <div id="user-input">
      <div className='input-group'>
        <Input inputID={investmentData[0].type} label="Initial Investment" type='number' updateValue={updateInvestmentHandler}/>
        <Input inputID={investmentData[1].type} label='Annual Investment'  type='number' updateValue={updateInvestmentHandler}/>
      </div>
      <div className='input-group'>
        <Input inputID={investmentData[2].type} label='Expected Return' type='number' updateValue={updateInvestmentHandler}/>
        <Input inputID={investmentData[3].type} label='Duration' type='number' updateValue={updateInvestmentHandler}/>
      </div>
    </div>
  )
}
