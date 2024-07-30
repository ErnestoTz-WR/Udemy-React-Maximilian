import imageSrc from '../assets/investment-calculator-logo.png'

export default function Header() {
  return (
    <header  id="header">
      <div className='center'>
        <img src={imageSrc} alt='Logo showing a money bag'/>
        <h1>Investment Calculator</h1>
      </div>
    </header>
    )
}


