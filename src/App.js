import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Adminsignin } from "./adminlogin/Admin-signin.js";
import { Adminsignup } from "./adminlogin/Admin-signup.js";
import Homepage from "./home-comp/Homepage";
import Privateroute from "./HOC/Private.route";
import { isadminsignin } from "./actions/authaction.js";
import Category from "./home-comp/category/index.js";
import orders from "./home-comp/orders/index.js";
import products from "./home-comp/product/index.js";
import home from "./home-comp/home/index.js";
import Newpage from "./home-comp/newpage/index.js";
import { getallcategory, getallProduct } from "./actions/index.js";
import { getallnewpage } from "./actions/newpage/index.js";
import { Addproduct } from "./home-comp/addproduct/index.js";
import { getallhighlight } from "./actions/index.js";
const App = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(isadminsignin())
    dispatch(getallcategory())
    dispatch(getallProduct())
    dispatch(getallnewpage())
    // dispatch(getallhighlight())

  }, [])
  return (
    <>

      <Switch>
        <Privateroute exact path="/newpage" component={Newpage} />
        <Privateroute exact path="/home" component={Homepage} />
        <Privateroute path="/category" component={Category} />
        <Privateroute path="/adminhome" component={home} />
        <Privateroute path="/orders" component={orders} />
        <Privateroute path="/products" component={products} />
        <Privateroute path="/addproduct" component={Addproduct} />

        <Route exact path="/" component={Adminsignin} />
        <Route exact path="/adminsignup" component={Adminsignup} />
      </Switch>

    </>

  );
}

export default App;
