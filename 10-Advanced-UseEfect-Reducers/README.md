# 10 Advanced: Handling Side Effects, Using Reducers & Using the Context API

## Side effects

This is how we can work with asynchronous tasks (http request, etc).

These tasks might be related to the Component but many of them should not executed every time we re-evaluate the component. Each time the "component" function is evaluated we should not re-execute them (it is like sending an http request every time we re-render the looking a component).

### `useEffect` hook

A function which is called with 2 parameters :

1. Function - (What we want to execute)
2. Array with dependencies - (We will run the function every time one of the dependencies changes)

`useEffect(function () => {...}, [dependencies])`

```JavaScript
  useEffect(() => {
    const loggedInStored = localStorage.getItem('isLoggedIn');
    if (loggedInStored === '1') {
      setIsLoggedIn(true);
    }
  }, []);
```

In this example we use no dependencies, which means this function will only run once.

`useEffect` can also be used for the scenario in which we need to update something displayed on the application based on the keystroke input from the user.

```JavaScript
// Login.js

useEffect(() => {
  setFormIsValid(
    enteredEmail.includes('@') && enteredPassword.trim.length > 6
  );
}, [enteredEmail, enteredPassword]);
```

### What NOT to add as a dependency

- You **DON'T need to add state updating functions** (as we did in the last lecture with setFormIsValid): React guarantees that those functions never change, hence you don't need to add them as dependencies (you could though)

- You also **DON'T need to add "built-in" APIs or functions** like `fetch()`, `localStorage` etc (functions and features built-into the browser and hence available globally): These browser APIs / global functions are not related to the React component render cycle and they also never change

- You also **DON'T need to add variables or functions** you might've **defined OUTSIDE of your components** (e.g. if you create a new helper function in a separate file): Such functions or variables also are not created inside of a component function and hence changing them won't affect your components (components won't be re-evaluated if such variables or functions change and vice-versa).

So long story short: You must add all "things" you use in your effect function **if those "things" could change because your component (or some parent component) re-rendered.** That's why variables or state defined in component functions, props or functions defined in component functions have to be added as dependencies!

### `useEffect` clean-up

Very helpful function to not send many request which might be triggered by the user changes. **(Check video 113)**

## `useReducer()` hook

It is used as a **replacement** to `useState()` when we need a "more powerful state management". It is also **more complex to set up**.

**The majority of the cases we should use `useState()`**, however, there are some specific scenarios in which `useReducer()` is the best fit. for example when the `state` of a property depends on another `state` from another property.

In the reducer functions we receive automatically from React the `state` (last state snapshot of the state managed by the reducer) and `action` (we usually pass here the action to be executed "ADD", "REMOVE", etc.) as parameters.

> This function will return a new state snapshot.

Steps: 
1. import `useReducer` from `react`
2. Create the `Reducer` function (in this case `const groupReducer = (state, action) => {}`)
3. Define an initial state (in this case`defaultGroupState`) and return it on the `Reducer` function
4. Inside the Custom Component function call the `useReducer` function with the `Reducer` function as the first parameter and the `initial State` as the second parameter (In this case `useReducer(groupReducer,defaultGroupState)`)
5. Dispatch the `action` object inside the appropriate function in this case `addPerson` will dispatch  `setGroupState({ type: 'ADD', item: person })`
6. Add the logic for each `action` inside the `Reducer` function, **return the new state**
7. (Optional) - In case of using Context as well to pass the state:
- import the context on the other component which will use
- Stablish a connection between the `contextFile` and `useContext`

```JS
// Group.js
import {useReducer} from 'react'; //1.

const defaultGroupState = { //3.
  people: [], 
  amount: 0
};

const groupReducer = (state, action) => { //2.

  if (action.type === 'ADD') { //6.
    const updatedGroup = state.people.push(action.item);
    const updatedAmount = state.people.length();
    return {
      people: updatedGroup,
      amount: updatedAmount
    }
  }

  return defaultGroupState; // 3. We return the default state on the first execution
}

const Group = props => {

  const [groupState, setGroupState] = useReducer(groupReducer,defaultGroupState); //4.

  const addPerson = person => { //5.
    setGroupState({
      type: 'ADD',
      item: person
    });
  }

  const removePerson = id => {
    setGroupState({
      type: 'REMOVE',
      item: id
    });
  }

  return (
    <div>
      <ul>
        {groupState.map(person => {
          <p>Name: {name}</p>
          <p>Age: {age}</p>
        })}
      </ul>
    </div>
  )
}


// AddPersonForm.js
import {useContext} from 'react'

import groupContext from '../store/Group'


const AddPersonForm = props => {

  const groupCtx = useContext(groupContext); //8.

  return (
    <form submit="">
      <label>Name: </label>
      <input id="name">
      <button>Submit</button>
    </form>
  );
}

```

## Object destructuring

It is similar to how we destructure arrays on the `useState` hook.

```JavaScript
const {keyName1, keyName2 } = objectContainingKeys;
```

### Course notes:

In the previous lecture, we used object destructuring to add object properties as dependencies to `useEffect()`.

```JavaScript
const { someProperty } = someObject;
useEffect(() => {
  // code that only uses someProperty ...
}, [someProperty]);
```

This is a **very common pattern and approach**.

I just want to point out, that they key thing is NOT that we use destructuring but that we pass specific properties instead of the entire object as a dependency.

We could also write this code and it would work in the same way.

```JS
useEffect(() => {
  // code that only uses someProperty ...
}, [someObject.someProperty]);
```

This works just fine as well!

But you should avoid this code:

```JS
useEffect(() => {
  // code that only uses someProperty ...
}, [someObject]);
```

Why?

Because now the **effect function would re-run whenever ANY property** of `someObject` changes - not just the one property (`someProperty` in the above example) our effect might depend on.

## Context

It helps us when we have information provided by a component which is deep inside the Application Tree and it that information is required in another component.Instead of using `props` all the way around we use **context** to inject that information.

It is **used to pass information between Components instead of using `props`**. However, **we should NOT use context on every case**. `props` is the recommended way, some specific cases will required to use context.

Steps:

- Create a new folder (`store`), we will define the context here,
- Create a file which will include the definition (similar to an interface) of what that context should include (what properties, functions, etc.) `context-object.js`
- Wrap what part of the application should be **"linked"** to this data. `<ObjectContext.Provider>`
- We can use the `useContext` hook to make the syntax more clear and readable.
- Import `useContext` on the element using the context; call the context which will be able to point to the specific data.
- Stablish a connection between the `contextFile` and `useContext`

```JS
//  './store/auth-context.js'

import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false
});

export default AuthContext;
```

## Rules of Hooks

1. **Only call React Hooks in React Functions** - we should not call hooks from functions which are NOT inside the component function.
2. **Only call React Hooks at the Top Level** - We should not call hooks inside statements or nested functions.
3. (Unofficial) **ALWAYS add everything you refer to inside of `useEffect()` as a dependency**

## Module Slides

[Click here](./slides.pdf)
