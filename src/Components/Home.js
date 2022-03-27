import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllproduct } from "../data";

function Home() {
  // const imagearray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);

  const cart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    getAllproduct(count)
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
    if (cart === undefined) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, [count]);

  return (
    <div className="container ">
      <div className="row ">
        {products &&
          products.map((product, i) => (
            <div className="col-lg-3 col-md-6" key={product._id}>
              <div className="card m-2">
                <img
                  src={product.photos && product.photos[0].secure_url}
                  className="card-img-top img-thumbnail"
                  alt="Fissure in Sandstone"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-primary btn-sm "
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        <div className="container text-center sticky-bottom">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {count === 1 ? (
                ""
              ) : (
                <li className="page-item">
                  <button className="btn btn-primary btn-sm">
                    <Link
                      className="text-white"
                      to=""
                      onClick={() => setCount(count - 1)}
                    >
                      previous
                    </Link>
                  </button>
                </li>
              )}
              {products.length < 8 ? (
                ""
              ) : (
                <li className="page-item">
                  <button className="btn btn-primary btn-sm">
                    <Link
                      className="text-white"
                      to=""
                      onClick={() => setCount(count + 1)}
                    >
                      Next
                    </Link>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Home;
