# 1 React Intro and Theory

## Declarative Approach

React uses a declarative approach, this means that we only define the desired end-state of the component that we are building.

React is only JavaScript code/files.

> When importing files into a React file we should omit the `.js` part. If it is another type of file we should include it, but if it is a React component file then we omit it.

## JXS

It is HTML code inside JavaScript, it actually stands for JavaScript in XML (HTML is a variation of XML). This is how React works. That code will be transform to HTML and JavaScript by React.

We can see on the dependencies we are using React and ReactDOM.

```JavaScript
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
```

However we have never import `React`. In the past React project structure we had to import `React` on every single file in which we planed to use it. Additionally, syntax was different and this might help us to understand what is happening behind:

`React` returns a callback function which includes 3 parameters:
1. Tag - 'div', 'h1', etc.
2. Any data passed inside the element - class, props, etc.
3. Content included between the tags. Static text, dynamic content.

We could pass an infinite number of functions but only one initial. That is the reason we can only have a root element.

```JavaScript
// ********** Current version ***********
import Expenses from "./components/Expenses";

function App() {
  const expenses = [];
  return (
    <div>
      <h2>Let's get started!</h2>
      <Expenses expenses={expenses}/>
    </div>
  );
}

export default App;

// ********** Previous version ***********
import React from React;
import Expenses from "./components/Expenses";

function App() {
  const expenses = [];

  return React.createElement('div',{},
  React.createElement('h2', {}, "Let's get started")),
  React.createElement(Expenses, { items: expenses })
  );
}

export default App;

// Both versions display the same but one is clearly more readable

```
