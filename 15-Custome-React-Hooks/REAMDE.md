# 15 Building custom React Hooks

## Why?

To reduce redundant logic (code)

## `useState()` on a custom hook

When we use `useState` inside a custom hook, the hook will return a single state to every single component using the hook. 

Similar to a normal function we can return anything or give any type of parameters. In this case we return the state of `counter` and we pass the type of count we want to execute **"forwards"** or **"backwards"**.

