import {calculateInvestmentResults, formatter} from '../util/investment.js';

export default function ResultsTable({data}) {
  const results = calculateInvestmentResults(data);

  return (
    <table id='result'>
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((item) => (
          <tr key={item.year}>
            <td>{item.year}</td>
            <td>{formatter.format(item.valueEndOfYear)}</td>
            <td>{formatter.format(item.interest)}</td>
            <td>{formatter.format(item.annualInvestment)}</td>
            <td>{formatter.format(item.investedCapital)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
