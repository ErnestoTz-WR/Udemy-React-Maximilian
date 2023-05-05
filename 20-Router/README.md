# 20 Router

## Library

We are using [React Router](https://reactrouter.com/en/main) which is the most used third party library.

## What is routes?

Routes are simply path -> component mappings. The idea behind is to ask: **For which path should which component be loaded?**

## Steps to activate router

1. Import the `createBrowserRouter` function,
2. Call the `createBrowserRouter`,
3. Store the the return value into a constant,
4. We pass an array to this function with route definition objects,
5. Define the `path` for every object,
6. Import the `RouterProvider`component,
7. Pass the created `router` object to the `RouterProvider` as a prop.

```JS
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // 1. 6.
import HomePage from './pages/Home'; 
import ProductsPage from './pages/Products';


const router = createBrowserRouter([ // 2. 3. 4.
  {path: '/', element: <HomePage/>}, // 5.
  {path: '/products', element: <ProductsPage/>},
]);

function App() {
  return <RouterProvider router={router}/> // 7.
}

export default App;
```

### Other way to define routes

We can define routes as Elements. Check video 217

## Navigating with Links

1. Import `Link`
2. Use `Link` element instead of the an `<a>` (anchor) element.
3. Define the path with `to='/newAddress'` as a prop.

```JS
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>My Home Page</h1>
      <p> Go to <Link to='/products'>the list of products</Link>.</p>
    </>
  );
}

export default HomePage;

```


## Nested Routes

When we want to **include a component** (such as a navigation bar) **which should be displayed on every page** we need to use **nested routes** which is defining a parent component and inside that one including children routes.

1. Create the `RootLayout` page,
2. Add the parent route object,
3. Include the children array,
4. Import `Outlet` on the `RootLayout` component,
5. Define where the children component should be render



```JS

// ------ Root Layout --------   
import { Outlet } from "react-router-dom"; // 4.
import MainNavigation from "../components/MainNavigator";
import styles from "./Root.module.css";

function RootLayout() {  // 1.
  return (
    <>
      <MainNavigation />
      <main className={styles.content}>
        <Outlet /> // 5.
      </main>
    </>
  );
}

export default RootLayout;

// ----- Navigation Menu ------
import { Link } from 'react-router-dom';
import styles from './MainNavigator.module.css'


function MainNavigation() {
  return(
    <header className={styles.header}>
      <ul className={styles.list}>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
      </ul>
    </header>
  );
}

export default MainNavigation;


// ------- Router file -------
const router = createBrowserRouter([
  {
    path: "/",   // 2.
    element: <RootLayout />,
    children: [  // 3.
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
    ],
  },
]);

```

## Error Pages

1. Create an error page,
2. Include it on the router object as a `errorElement` property.

```JS

// ------- Router file -------
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

## NavLink

Is another option similar to `Link` but with the difference that in this case **we can see if a link is "active"** (a user is under that path).

To see if the link is active `NavLink` allow us to use a function inside the `styles`/`className` this function returns `isActive` which is a boolean if the given path is active or not.

> We use `end` to indicate that the path should only be active if it finishes with the given path (in this case `/`).

```JS
import { NavLink } from "react-router-dom";
import styles from "./MainNavigator.module.css";

function MainNavigation() {
  return (
    <header className={styles.header}>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Products
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default MainNavigation;
```

## Navigating Programmatically

1. Import the `useNavigate` hook
2. Define the `navigate` function with the path as a parameter

```JS
import { Link, useNavigate } from "react-router-dom"; // 1.

function HomePage() {

  const navigate = useNavigate();

  function navigateHandler() {
    navigate('/products'); // 2.
  };

  return (
    <>
      <h1>My Home Page</h1>
      <p> Go to <Link to='/products'>the list of products</Link>.</p>
      <p><button onClick={navigateHandler}>Navigate</button></p> // 2.
    </>
  );
}

export default HomePage;
```

## Dynamic Routes

Dynamic paths are created when we give some dynamic information into the path (e.g. a product id). This can help us to render an specific page related to that dynamic part.

1. Add dynamic paths by including a colon `:` on the object definition path, this indicate the dynamic part,
2. After the colon we will include the identifier which should be use to relate to the dynamic part,
3. Import `useParams` on the page which sends back the dynamic data,
4. Call the `useParams` object.



```JS
// ------- Router ------
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:productId", element: <ProductDetailPage /> }, // 1. 2.
    ],
  },
]);

// ----------- Products Page ---------
import { useParams } from "react-router-dom"; // 3.

function ProductDetailPage() {
  const params = useParams(); // 4.

  return (
    <>
      <h1>Product Details</h1>
      <p>{params.productId}</p>
    </>
  );
}

export default ProductDetailPage;
```

## Relative vs Absolute paths

- **Absolute Paths**: start with a `/`, this makes React place the given path right after the initial url. It is easier to debug but it is kind of **"hard-coded"**.
- **Relative Paths**: will be added at the end of whichever path we are allocated to, this might be easier to code but can be tricky to implement.

> Another example of a relative path is `..` if we define a `<Link to="..">BACK</Link>` this will take us to the previous path but in a relative way (According to how it is define on the path tree, Which is the parent path of the current one?). **Watch video 279**.

### Index Routes

When using relative paths we can specify which is the **Index path** the **Initial path** by defining the path as `index`.

```JS
// ----- Absolute paths -----
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:productId", element: <ProductDetailPage /> },
    ],
  },
]);

// ------ Relative Paths -------
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage /> }, // Index it is the same as path: "/"
      { path: "products", element: <ProductsPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
    ],
  },
]);
```