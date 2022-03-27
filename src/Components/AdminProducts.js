import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteAProduct, getAllproduct, isAuthenticated } from "../data";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  const history = useHistory();
  // const auth = isAuthenticated();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (user && user.role === "admin") {
      getAllproduct(page).then((data) => {
        setProducts(data.products);
        setReload(false);
      });
    } else {
      history.push("/");
    }
  }, [page, reload]);

  const handelClick = (id) => {
    if (user && user.role === "admin") {
      deleteAProduct(id, token).then((data) => {
        if (data.message) {
          toast.error(data.message, {
            position: "bottom-center",
            theme: "dark",
            autoClose: 1000,
          });
        }
        setReload(true);
      });
    }
  };

  return (
    <>
      {reload ? (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="container my-5">
          <button
            className="btn btn-md btn-primary  float-end"
            onClick={() => {
              history.push("/admin");
            }}
          >
            <i className="fas fa-long-arrow-alt-left "></i>
          </button>
          <Link
            className="btn btn-md btn-primary float-end me-5"
            to="/admin/add/product"
          >
            Add Product <i className="fas fa-plus-circle"></i>
          </Link>
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Stocks</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((pro, i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={pro.photos[0].secure_url}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pro.name}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={
                        pro.stock !== 0
                          ? "badge badge-success rounded-pill d-inline border border-success"
                          : "badge badge-danger rounded-pill d-inline border border-warning"
                      }
                    >
                      {pro.stock}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/admin/product/edit/${pro._id}`}
                      className="btn btn-link btn-sm btn-rounded"
                    >
                      <i className="fas fa-edit fa-lg"></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-link btn-sm btn-rounded"
                      onClick={() => {
                        handelClick(pro._id);
                      }}
                    >
                      <i className="fas fa-trash fa-lg"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {page === 1 ? (
            ""
          ) : (
            <button
              className="btn btn-primary btn-sm my-4"
              onClick={() => setPage(page - 1)}
            >
              previous
            </button>
          )}
          {products.length <= 8 ? (
            <button
              className="btn btn-primary btn-sm my-4"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default AdminProducts;
