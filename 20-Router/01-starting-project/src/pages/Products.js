import { Link } from "react-router-dom";

function HomePage() {
  const products = [
    { id: "p1", title: "Product 1" },
    { id: "p2", title: "Product 2" },
    { id: "p3", title: "Product 3" },
  ];

  return (
    <>
      <h1>My Products</h1>
      <ul>
        {products.map((pr) => 
          <li key={pr.id}>
            <Link to={`/products/${pr.id}`}>{pr.title}</Link>
          </li>
        )}
      </ul>
    </>
  );
}

export default HomePage;
