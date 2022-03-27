import React from "react";
import { Link } from "react-router-dom";

function AdminDropDown() {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle btn-sm float-end mb-5"
        type="button"
        id="dropdownMenuButton"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        Actions
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <Link className="dropdown-item" to="/admin/orders/delivered">
            Delivered
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/admin/orders/processing">
            Processing
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/admin/products">
            Products
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/admin/users">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDropDown;
