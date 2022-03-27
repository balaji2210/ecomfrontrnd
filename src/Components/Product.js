import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addItemToCart, addReview, getAProduct } from "../data";
import { Rating } from "react-simple-star-rating";
import Review from "./Review";
import { toast } from "react-toastify";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reload, setReload] = useState(false);
  const [quantity, setQunatity] = useState(1);
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const handleRating = (rate) => {
    setRating(rate / 20);
  };

  useEffect(() => {
    getAProduct(id).then((data) => {
      setProduct(data.product);
      setReload(false);
    });
  }, [id, reload]);

  const addComment = (e) => {
    e.preventDefault();
    if (rating !== 0 && comment !== "") {
      addReview({ rating, comment }, id, token)
        .then((data) => {
          // console.log(data);
          setComment("");
          setReload(true);
          toast.success(data.message, {
            position: "bottom-center",
            theme: "colored",
            autoClose: 1000,
          });
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("rating or comment is empty", {
        position: "bottom-center",
        theme: "colored",
        autoClose: 1000,
      });
    }
  };

  const addTocart = (item) => {
    addItemToCart(item, quantity);
    toast.success("Item Added to Cart", {
      position: "bottom-center",
      theme: "colored",
      autoClose: 1000,
    });
    history.push("/");
  };

  const addQuant = () => {
    if (product.stock > quantity) {
      setQunatity(quantity + 1);
    } else {
      if (quantity >= product.stock) {
        if (product.stock > 0) {
          setQunatity(product.stock);
        }
      }
    }
  };

  const subQuant = () => {
    if (product.stock === 1) {
      setQunatity(product.stock);
    } else {
      if (quantity <= 1) {
        setQunatity(1);
      } else {
        if (product.stock === 0) {
          setQunatity(0);
        } else {
          setQunatity(quantity - 1);
        }
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="container  mt-lg-2  ">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-mdb-ride="carousel"
              >
                <div className="carousel-inner">
                  {product &&
                    product.photos.map((prod, i) => (
                      <div
                        className={`carousel-item ${i === 0 ? "active" : ""}`}
                        key={i}
                      >
                        <img
                          src={prod.secure_url}
                          className="d-block w-100 img-thumbnail"
                          alt="Wild Landscape"
                        />
                      </div>
                    ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-mdb-target="#carouselExampleControls"
                  data-mdb-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-mdb-target="#carouselExampleControls"
                  data-mdb-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <div className="container ">
              <div>
                <h1>{product.name}</h1>
                <h2>{product.description}</h2>
                <h2>RS-{product.price}</h2>
                <h1>Ratings-{Math.round(product.ratings * 10) / 10}</h1>
                <Rating
                  initialValue={Math.round(product.ratings * 10) / 10}
                  readonly={true} /* Available Props */
                />

                <h1
                  className={
                    product.stock !== 0 && product.stock > 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  Status-
                  {product.stock !== 0 && product.stock > 0
                    ? "Instock"
                    : "OutofStock"}
                </h1>
              </div>
              <div className="my-4 row ms-5 ">
                <button
                  className="col-4 btn btn-primary w-25 btn-sm rounded-pill"
                  onClick={subQuant}
                >
                  -
                </button>
                <span className="col-4">
                  <input
                    type="number"
                    className="form-control w-75 ms-3"
                    placeholder="item"
                    value={quantity}
                    onChange={() => {}}
                  />
                </span>
                <button
                  className="col-4 w-25 btn btn-primary btn-sm rounded-pill"
                  onClick={addQuant}
                >
                  +
                </button>
              </div>
              <div className="row mt-3">
                <div className="col-lg-6">
                  {user !== undefined && user ? (
                    <button
                      className="btn btn-primary  mt-3"
                      data-mdb-toggle="modal"
                      data-mdb-target="#exampleModal1"
                      onClick={(e) => setRating(0)}
                    >
                      addreview
                    </button>
                  ) : (
                    <div className="mt-4">
                      <h4>Login to add review</h4>
                    </div>
                  )}
                </div>
                <div className="col-lg-6">
                  {product.stock === 0 || product.stock < 0 ? (
                    <button
                      className="btn btn-success  mt-3"
                      onClick={() => {
                        addTocart(product);
                      }}
                      disabled
                    >
                      addtocart
                    </button>
                  ) : (
                    <button
                      className="btn btn-success  mt-3"
                      onClick={() => {
                        addTocart(product);
                      }}
                    >
                      addtocart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModal1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Review
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h3>Ratings</h3>
                  <Rating
                    onClick={handleRating}
                    ratingValue={rating} /* Available Props */
                  />
                  <div className="form-outline border border-primary mt-2">
                    <textarea
                      className="form-control"
                      id="textAreaExample"
                      rows="4"
                      placeholder="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-mdb-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-mdb-dismiss="modal"
                    onClick={addComment}
                  >
                    addreview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Review id={id} reload={reload} setReload={setReload} />
      </div>
    </>
  );
}

export default Product;
