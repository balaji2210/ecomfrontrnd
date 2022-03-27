import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { deleteReviews, getReviews } from "../data";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";

function Review({ id, reload, setReload }) {
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [del, setDel] = useState(false);

  useEffect(() => {
    getReviews(id)
      .then((data) => {
        setReviews(data.reviews);
        setDel(false);
      })
      .catch((err) => console.log(err));
  }, [del, reload, id]);

  const deleteRev = () => {
    deleteReviews(id, token)
      .then((data) => {
        // console.log(data);
        setDel(true);
        setReload(true);
        toast.warn("deleted review", {
          position: "bottom-center",
          autoClose: 1000,
          theme: "colored",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="row my-5">
        <div className="col-lg-6">
          <div className="container">
            {reviews &&
              reviews.map((rev) => (
                <div className="card my-2" key={rev._id}>
                  <div className="container">
                    <div className="card-body">
                      <h5 className="card-title">{rev.name}</h5>
                      <p className="card-text">
                        <Rating
                          initialValue={rev.rating}
                          readonly={true} /* Available Props */
                        />
                      </p>
                      <span className="card-text">{rev.comment}</span>
                      {user && user._id === rev.user ? (
                        <i
                          className="far fa-trash-alt float-end"
                          style={{ cursor: "pointer" }}
                          onClick={deleteRev}
                        ></i>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
