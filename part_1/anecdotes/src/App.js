import React, { useState } from 'react';

const Vote = ({ selected, points, setNewPoints, setNewTop }) => {
  const result = [ ...points ];
  result[selected]++;
  const top = result.indexOf(Math.max(...result));

  const update = () => {
    setNewTop(top);
    setNewPoints(result);
  };

  return (
    <button onClick={update}>vote</button>
  );
}

const Next = ({ onClick }) => (
  <button onClick={onClick}>next anecdote</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [top, setTop] = useState(0);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const setNewPoints = (points) => {
    setPoints(points);
  }

  const setNewTop = (top) => {
    setTop(top);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <div>
        <Vote 
          selected={selected} 
          points={points} 
          setNewPoints={setNewPoints}
          setNewTop={setNewTop}
        />
        <Next onClick={() => setSelected( getRandomInt(0, anecdotes.length) )}/>
      </div>
      <h1>Anecdote with the most votes</h1>
      <div>
        {anecdotes[top]}
      </div>
      <div>
        has {points[top]} votes
      </div>

    </div>
  )
}

export default App;
