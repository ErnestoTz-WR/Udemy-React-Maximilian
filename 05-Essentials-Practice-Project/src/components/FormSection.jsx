import Input from './Input.jsx';

export default function FormSection({invData, updateData}) {
  return (
    <div id="user-input">
      <div className='input-group'>
        <Input inputID='initialInvestment' label="Initial Investment" value={invData.initialInvestment} updateValue={updateData}/>
        <Input inputID='annualInvestment' label='Annual Investment' value={invData.annualInvestment} updateValue={updateData}/>
      </div>
      <div className='input-group'>
        <Input inputID='expectedReturn' label='Expected Return' value={invData.expectedReturn} updateValue={updateData}/>
        <Input inputID='duration' label='Duration' value={invData.duration} updateValue={updateData}/>
      </div>
    </div>
  )
}
