import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
//
import Aux from "../../hoc/Aux";
import HeaderBanner from "../../components/HeaderBanner/HeaderBanner";
import ProductSection from "../../components/ProductSection/ProductSection";
//
import ProductCollections from "../../datas/productCollections";

const Homepage = (props) => {
  return (
    <Aux>
      <HeaderBanner />
      <ProductSection
        productCollections={ProductCollections}
        addToCartClicked={props.onProductAddToCart}
      />
    </Aux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProductAddToCart: (productID) =>
      dispatch(actions.addProductToCart(productID)),
  };
};

export default connect(null, mapDispatchToProps)(Homepage);
