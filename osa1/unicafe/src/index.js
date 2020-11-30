import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Heading = ({ text }) => <h1>{ text }</h1>
const Button = ({ text, eventHandler  }) => <button onClick={ eventHandler }>{ text }</button>

const Statistics = (props) => {
  if (props.numOfFeedback <= 0) {
    return (
      <div>
        <Heading text="statistics" />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <Heading text="statistics" />
          </th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="good" value={ props.good } />
        <StatisticLine text="neutral" value={ props.neutral } />
        <StatisticLine text="bad" value={ props.bad } />
        <StatisticLine text="all" value={ props.showAllFeedback } />
        <StatisticLine text="average" value={ props.showAverageFeedback } />
        <StatisticLine text="positive" value={ props.showPositiveFeedback } />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        { text }
      </td>
      <td>
        { value }
      </td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodFeedback = () => setGood(good+1)
  const addNeutralFeedback = () => setNeutral(neutral+1)
  const addNegativeFeedback = () => setBad(bad+1)
 
  const showAllFeedback = good + neutral + bad
  const showAverageFeedback = (good * 1 + bad * -1) / showAllFeedback
  const showPositiveFeedback = (good * 1) / showAllFeedback * 100 + ' %'
  
  return (
    <div>
      <Heading text="give feedback" /> 
      <Button text="good" eventHandler={ addGoodFeedback }/>
      <Button text="neutral" eventHandler={ addNeutralFeedback }/>
      <Button text="bad" eventHandler={ addNegativeFeedback }/>
      <Statistics
        numOfFeedback={ showAllFeedback }
        good={ good }
        neutral={ neutral }
        bad={ bad }
        showAllFeedback={ showAllFeedback }
        showAverageFeedback={ showAverageFeedback }
        showPositiveFeedback={ showPositiveFeedback }
      />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
