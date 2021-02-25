import "./App.css";
//
import { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
//
import Layout from "./components/Layout/Layout";
import Homepage from "./containers/Homepage/Homepage";
import Footer from "./components/Footer/Footer";
import Cart from "./containers/Cart/Cart";
import Checkout from "./containers/Checkout/Checkout";
import Account from "./containers/Account/Account";
import ProductPage from "./containers/ProductPage/ProductPage";
import OurStory from "./components/OurStory/OurStory";
import Pagenotfound from "./components/Pagenotfound/Pagenotfound";
import Authentication from "./containers/Authentication/Authentication";
import PaymentSuccess from "./components/AfterPaymentStatus/SuccessPayment";
import PaymentCancel from "./components/AfterPaymentStatus/CancelPayment";

class App extends Component {
  render() {
    let route = (
      <Switch>
        <Route path="/page-not-found" component={Pagenotfound} />
        <Route path="/our-products" component={ProductPage} />
        <Route path="/our-story" component={OurStory} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/account/authentication" component={Authentication} />
        <Route path="/account" component={Account} />
        <Route path="/order-success" component={PaymentSuccess} />
        <Route path="/order-canceled" component={PaymentCancel} />
        <Route path="/" exact component={Homepage} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div className="App">
        <Layout>{route}</Layout>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
