# 10 Advanced: Handling Side Effects, Using Reducers & Using the Context API

### Side effects

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

