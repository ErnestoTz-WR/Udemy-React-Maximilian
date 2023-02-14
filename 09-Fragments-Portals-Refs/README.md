# 9 - Working with Fragments, Portals and "Refs"

## `div` soup

Given the fact that React limits us to have a single root element for every Custom Component, in many occasions we end up using `div` as the root element foe every component created. This results in multiple divs nested between each other, creating something called a "`div` soup"; this can cause problems in big applications or even while styling smaller ones.

## React Fragments

One simple solution for this problem is to create a **"wrapper"** component which does not add any semantical content but it fulfills the requirement of having a single root element.

```JavaScript
// ------ Wrapper.js
function Wrapper(props) {
  return (props.children);
}

export default Wrapper;

// ----- Users.js
import Wrapper from './Wrapper'
import User from './User'

function Users() {
  return (
    <Wrapper>
      <User>...</User>
      <User>...</User>
    </Wrapper>
  )
}

```

For this propose React created `Fragments` which are "wrappers" such as the previous one. We import them with one of the following way:

1. Call them with <React.Fragment> (always works)
2. Set up the project and we can use the `<>` syntax
3. Import `{Fragment}` next to the `React` import and we can only use `<Fragment>`

```JavaScript
import React, {Fragment} from 'react';
import User from './User'

function Users() {
  return (
    <Fragment>
      <User>...</User>
      <User>...</User>
    </Fragment>
  )
}

export default Users
```

## Portals

Portals allow us to write semantically better code by transporting those elements which are deep inside the Components tree but should be upper on the DOM rendering (such as modals, alerts, pop-up messages, etc.). This can lead to styling or accessibility problems.

To use portals we need to: 

1. Define the exact location where the transported element should be rendered. Usually on the `'.../public/index.html'` file we generate a `<div>` with an specific CSS id.
2. Import `ReactDOM`
3. Call `createPortal()`. I need to pass the element I want to transport as the first parameter, the second parameter is where it should be render (we need to select it by using `document.getElementById()`) with the id created previously.

## "refs"

Allow us to get access to other React components and work with them.
What will be inside the `useRef` constant is a real DOM object. It is not advised to manipulate this object but we can use it to read information.

1. Import the `useRef` hook.
2. Define `useRef` inside functional components.
3. Add the `ref` prop to the specific HTML element.
4. Use the `refDefined.current.value` property to read the value.

On the application created previously we updated the state of the inputs with every change on the keystroke, it is redundant since it would be better to only change the sate of them once the form is submitted.

### Controlled vs uncontrolled Components

Components which do not use `useState` but only `useRef` to read data and compute something after are called "uncontrolled" components since React does not control the status.
