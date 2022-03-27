import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Home from "./Components/Home";
import Product from "./Components/Product";
import Search from "./Components/Search";
import Cart from "./Components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Components/Orders";
import Dashboard from "./Components/Dashboard";
import AdminOrders from "./Components/AdminOrders";
import Delivered from "./Components/Delivered";
import AdminProcessing from "./Components/AdminProcessing";
import AdminProducts from "./Components/AdminProducts";
import AddProduct from "./Components/AddProduct";
import Admineditproduct from "./Components/Admineditproduct";
import Users from "./Components/Users";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/search/:id" component={Search} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/admin" component={AdminOrders} />
          <Route exact path="/admin/orders/delivered" component={Delivered} />
          <Route
            exact
            path="/admin/orders/processing"
            component={AdminProcessing}
          />
          <Route exact path="/admin/products" component={AdminProducts} />
          <Route exact path="/admin/add/product" component={AddProduct} />
          <Route
            exact
            path="/admin/product/edit/:id"
            component={Admineditproduct}
          />
          <Route exact path="/admin/users" component={Users} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
