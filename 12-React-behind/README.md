# 12 React behind the scenes and optimization tools

## Component reevaluation

A component function will be reevaluated whenever any of the following of its elements changes:

- props
- state
- context

However, this does not mean that the real DOM will be re-rendered.  
Only the parts that need to be updated will be re-rendered which is important for a <u>performance perspective</u>.

> **Re-evaluating components != Re-rendering real DOM** 

<u>**IMPORTANT NOTE:**</u> The component which is in charge of managing the state is the one which will be reevaluated, if a child component element changes but the parent element is the one managing the state, the parent component and also the child component function will be re-executed.

## **"Virtual DOM"** and **"Virtual DOM diffing"**

React will make comparisons on the current and previous snapshots of the **Virtual DOM**, then only pass the changes to the real DOM.

> Virtual DOM diffing - finding the difference between 2 snapshots of a Virtual DOM.

## `React.memo()`

It is a method used to specify to React that the Component inside it should be also render once their props change. It has a cost since now React will have to keep track of the previous state of every prop, compare them with the newer state and signal if there is any change.

This is **very handy when having a big application** in which one of **the parent components allow us to compare all props and stop the re-rendering on its child components**.

## `useCallback()` hook

This hook will **ensure that a function inside the hook will always be exactly that function**.   
When we reload a Component function everything inside it is reevaluated or created; even functions inside that component will be new (technically).   
This behavior can change by using the `useCallback()` hook which ensures us that we will have the same function even if the Component is re-rendered.   

This is a hook similar to `useEffect()` in which we also declare an array of dependencies.

**IMPORTANT:** The array with dependencies is crucial since we are telling React that we do not need to reevaluate a function every time a component changes, however this includes variables and values used inside the function; it can happen that the function allows other components to execute code but since the state of our function stored the the first values it contain then it will not be re-executed which makes our code to fail. For this reason we declare all dependencies on the array so that the function will be re-evaluated once any dependency changed.


## State Scheduling and Batching

Once any state is updated React will schedule is change, however it might not be immediately. Most of the cases it is right after it is triggered but if the pipeline is loaded then it will be executed lated. We have to e mindful about this since it can mean we are working based on an outdated state of our application.

## `useMemo()`

It is similar to `useCallback()` but instead of storing functions we use it for memoizing data for not execute code unnecessarily.

## Important links

- [Reference vs primitive values](https://academind.com/tutorials/reference-vs-primitive-values/)
- [JS Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)