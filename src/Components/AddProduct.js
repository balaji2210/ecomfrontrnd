import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct, isAuthenticated } from "../data";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [file, setFile] = useState(null);
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const auth = isAuthenticated();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  let images = [];

  if (file !== null) {
    for (let i = 0; i < file.length; i++) {
      images.push(file[i]);
    }
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    if (user && user.role === "admin") {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("brand", brand);
      for (let i = 0; i < file.length; i++) {
        formData.append("photos", file[i]);
      }
      formData.append("stock", Number(stock));
      addProduct(formData, token).then((data) => {
        // console.log(data);
        setName("");
        setBrand("");
        setCategory("");
        setDescription("");
        setFile("");
        setPrice("");
        setStock("");
        setLoading(false);
        toast.success("Product Added", {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
        });
      });
    } else {
      history.push("/");
    }
  };

  return (
    <>
      {auth ? (
        <div>
          {loading ? (
            <div
              className="container text-center "
              style={{ marginTop: "250px" }}
            >
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>{" "}
            </div>
          ) : (
            <>
              <form className="container" onSubmit={handelSubmit}>
                <Link
                  to="/admin/products"
                  className=" btn btn-primary btn-md m-2 float-end"
                >
                  <i className="fas fa-arrow-left"></i>
                </Link>
                <div className="container col-lg-5 border border-4 my-3 p-4">
                  <label className="form-label">Product Name</label>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control border border-5"
                    />
                  </div>
                  <label className="form-label">Price</label>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="form-control border border-5"
                    />
                  </div>

                  <label className="form-label">Description</label>
                  <div className="form-outline mb-4">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control border border-5"
                      rows="2"
                    ></textarea>
                  </div>

                  <label className="form-label">Category</label>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control border border-5"
                    />
                  </div>

                  <label className="form-label">Brand</label>
                  <div className="form-outline mb-4">
                    <input
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      type="text"
                      className="form-control border border-5"
                    />
                  </div>
                  <label className="form-label">Photos</label>
                  <div className="form-outline mb-4">
                    <input
                      multiple
                      type="file"
                      onChange={(e) => setFile(e.target.files)}
                      className="form-control border border-5"
                    />
                  </div>
                  <div>
                    {images &&
                      images.length !== 0 &&
                      images.map((ig, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(ig)}
                          alt={`${i}img`}
                          className="m-1 img-thumbnail"
                          width="100px"
                        />
                      ))}
                  </div>
                  <label className="form-label">Stock</label>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="form-control border border-5"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-md  my-3"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        history.push("/signin")
      )}
    </>
  );
}

export default AddProduct;
