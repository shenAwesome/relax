# Relax from ASLab

### Features

* simple state management without bullshit
* sharing store between components
* support mutiple stores 
* update UI in response to any store changes

### Usage
 
see https://codesandbox.io/s/7mrqxzkwl6

yarn add @aslab/relax

### Sample code

1. create a store file (say store.ts)

~~~~
import { link } from "@aslab/relax" 

const store = {
  /** this is the name */
  name: "Alex",
  score: 100,
  nationality: "Martian"
}

const { use, commit } = link(store)
export { store, use, commit }
~~~~

2. use it in your components

~~~~
import * as React from "react";
import { render } from "react-dom";
import { store, use, commit } from "./store";

import "./styles.css";

function Btn1() {
  return (
    <button
      onClick={() => {
        store.score++;
      }}
    >
      increase score
    </button>
  );
}

function Btn2() {
  return (
    <button
      onClick={() => {
        setTimeout(() => {
          store.score++;
        }, 1000);
      }}
    >
      async change
    </button>
  );
}

function App() {
  const { name, score } = use(() => {
    return {
      name: store.name,
      score: store.score
    };
  });
  return (
    <div className="App">
      <div>Name: {name}</div>
      <div>Score: {score}</div>
      <Btn1 />
      <Btn2 />
    </div>
  );

  return <h1>a</h1>;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
~~~~

3 Relax and see it working!

## Resources

## Projects using RELAX
 
## Credits
 
