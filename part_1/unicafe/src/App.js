import React, { useState } from 'react';

const Stats = ({ good, neutral, bad }) => {
  const count = good + neutral + bad;
  const average = (good - bad) / count;
  const percentPositive = (good / count) * 100;

  const result = (
    <div>
      <h1> statistics </h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={count}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={percentPositive}/>
        </tbody>
      </table>
    </div>
  );

  if (count > 0) {
    return result;
  } else {
    return (
      <div>
        <h1> statistics </h1>
        <p> No feedback given </p>
      </div>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Button = ({ good, neutral, bad, 
  setGood, setNeutral, setBad }) => {
    return (
      <div>
        <h1>give feedback</h1>
        <button onClick={ () => setGood(good + 1) }>good</button>
        <button onClick={ () => setNeutral(neutral + 1) }>neutral</button>
        <button onClick={ () => setBad(bad + 1) }>bad</button>
      </div>
    )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Button 
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />

      <button onClick={ () => { setGood(0); setNeutral(0); setBad(0) }}> Reset </button>

      <Stats 
        good={good}
        neutral={neutral} 
        bad={bad}
      />
    </div>
  );
}

export default App;
