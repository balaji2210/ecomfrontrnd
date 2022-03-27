import React from "react";

import { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { isAuthenticated } from "../data";

function NavBar() {
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const auth = isAuthenticated();
  const history = useHistory();
  const handelSubmit = (e) => {
    e.preventDefault();
    setSearch("");
    history.push(`/search/${search}`);
  };

  const signOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    // <!-- Navbar -->
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light px-5">
        <Link className="navbar-brand me-2" to="/">
          InCart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"></li>
          </ul>

          <span>
            <span className="input-group-text border-0" id="search-addon">
              <i
                className="fas fa-search fa-2x"
                style={{ cursor: "pointer" }}
                data-mdb-toggle="modal"
                data-mdb-target="#exampleModal"
              ></i>
            </span>
          </span>
          <Link className="text-reset m-4" to="/cart">
            <i className="fas fa-shopping-cart fa-lg"></i>
            <span className="badge rounded-pill badge-notification bg-danger"></span>
          </Link>

          <div className="d-flex align-items-center">
            {auth && user ? (
              <>
                {auth && user.role === "admin" ? (
                  <Link to="/admin">Admin</Link>
                ) : (
                  ""
                )}
                <Link className="nav-link active" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="nav-link active" to="/orders">
                  Orders
                </Link>
                <Link
                  to="/signin"
                  onClick={signOut}
                  className="nav-link px-3 me-2"
                >
                  SignOut
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link to="/signup" className="nav-link px-3 me-2">
                  Signup
                </Link>
                <Link to="/signin" className="nav-link px-3 me-2">
                  SignIn
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="container">
              <div className="form-outline">
                <input
                  type="text"
                  id="form12"
                  className="form-control"
                  placeholder="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
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
                onClick={handelSubmit}
                data-mdb-dismiss="modal"
                type="button"
                className="btn btn-primary"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
