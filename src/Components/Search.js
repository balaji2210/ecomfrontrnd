import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { search } from "../data";

function Search() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    search(id)
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, [id]);

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
                    className="btn btn-primary"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        {products.length === 0 ? (
          <>
            <div className="text-center mt-5">
              <h1 className="mt-5">No Products found</h1>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Search;
