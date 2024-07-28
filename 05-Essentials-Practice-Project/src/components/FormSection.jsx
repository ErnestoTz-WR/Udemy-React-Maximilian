import Input from './Input.jsx';

export default function FormSection({invData, updateData}) {
  return (
    <div id="user-input">
      <div className='input-group'>
        <Input inputID='initialInvestment' label="Initial Investment" type='number' value={invData.initialInvestment} updateValue={updateData}/>
        <Input inputID='annualInvestment' label='Annual Investment'  type='number' value={invData.annualInvestment} updateValue={updateData}/>
      </div>
      <div className='input-group'>
        <Input inputID='expectedReturn' label='Expected Return' type='number' value={invData.expectedReturn} updateValue={updateData}/>
        <Input inputID='duration' label='Duration' type='number' value={invData.duration} updateValue={updateData}/>
      </div>
    </div>
  )
}
