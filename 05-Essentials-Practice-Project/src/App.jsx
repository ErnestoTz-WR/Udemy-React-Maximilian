import { useState } from 'react'
import Header from "./components/Header";
import FormSection from "./components/FormSection";
import ResultsTable from "./components/ResultsTable";

const INITIAL_STATE = {
  initialInvestment: 15000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

function App() {

const [investmentData, setInvestmentData] = useState(INITIAL_STATE);

 function updateInvestmentHandler (change) {
  const { id, value } = change;
  setInvestmentData((prevData) => {
    const updatedData = {...prevData};
    updatedData[id] = value;
    return updatedData;
  });
 }

  return (
    <>
      <Header/>
      <FormSection invData={investmentData} updateData={updateInvestmentHandler}/>
      <ResultsTable data={investmentData} />
    </>
  )
}

export default App
