export default function Input({inputID, label, updateValue, ...props}) {

  function handleChange(e){
    updateValue(e.target);
  }

  return (
    <div>
      <label htmlFor={inputID}>{label}</label>
      <input id={inputID} onChange={handleChange} {...props}/>
  </div>
  )
}
