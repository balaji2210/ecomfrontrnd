import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { adminGetUsers, adminUpdateUser } from "../data";

function Users() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  useEffect(() => {
    if (user.role === "admin") {
      adminGetUsers(token).then((data) => {
        setUsers(data.users);
        setReload(false);
      });
    } else {
      history.pushState("/");
    }
  }, [reload]);

  const updateUser = (id) => {
    adminUpdateUser(id, token).then((data) => {
      setReload(true);
      if (data.success) {
        toast.success(data.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 1000,
        });
      } else {
        toast.warn(data.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 1500,
        });
      }
    });
  };

  return (
    <div className="container">
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((usr, i) => (
              <tr key={i}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{usr.name}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{usr.email}</p>
                </td>
                <td>
                  <span
                    className={
                      usr.role === "admin"
                        ? "badge badge-success rounded-pill d-inline border border-1"
                        : "badge badge-warning rounded-pill d-inline border border-1"
                    }
                  >
                    {usr.role}
                  </span>
                </td>

                <td>
                  <span
                    type="button"
                    className="btn btn-link btn-sm btn-rounded"
                    onClick={() => {
                      updateUser(usr._id);
                    }}
                  >
                    update user
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
