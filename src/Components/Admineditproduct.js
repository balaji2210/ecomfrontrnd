import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAProduct, updateProduct } from "../data";

function Admineditproduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [file, setFile] = useState(null);
  const [stock, setStock] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (user && user.role === "admin") {
      getAProduct(id).then((data) => {
        // console.log(data);
        setName(data.product.name);
        setPrice(data.product.price);
        setDescription(data.product.description);
        setCategory(data.product.category);
        setBrand(data.product.brand);
        setStock(data.product.stock);
        setPhotos(data.product.photos);
      });
    } else {
      history.push("/");
    }
  }, [id]);

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
      if (file !== null) {
        for (let i = 0; i < file.length; i++) {
          formData.append("photos", file[i]);
        }
      }
      formData.append("stock", Number(stock));
      updateProduct(id, formData, token).then((data) => {
        setLoading(false);
        toast.success("updated Product", {
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
      {loading ? (
        <div className="container text-center " style={{ marginTop: "250px" }}>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>{" "}
        </div>
      ) : (
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
              {file !== null ? (
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
              ) : (
                <div>
                  {photos &&
                    photos.map((photo, i) => (
                      <img
                        key={i}
                        width="100px"
                        className="m-1 img-thumbnail"
                        src={photo.secure_url}
                      />
                    ))}
                </div>
              )}
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
              <button type="submit" className="btn btn-primary btn-md  my-3">
                Update Product
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Admineditproduct;
