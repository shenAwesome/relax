import React from 'react';
import { store, use, commit } from './store'


function Btn1() {
  return <button onClick={() => {
    store.score++
    commit()
  }}>increase score</button>
}


function Btn2() {
  return <button onClick={() => {
    setTimeout(() => {
      store.score++
    }, 1000);
  }}>async change</button>
}

function App() {
  const { name, score } = use(() => {
    return {
      name: store.name,
      score: store.score
    }
  })
  return (
    <div className="App">
      <div>Name: {name}</div>
      <div>Score: {score}</div>
      <Btn1 />
      <Btn2 />
    </div>
  )
}
export default App;
