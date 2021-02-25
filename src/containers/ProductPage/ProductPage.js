import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
//
import ProductCollections from "../../datas/productCollections";
//
import ProductSection from "../../components/ProductSection/ProductSection";
import Aux from "../../hoc/Aux";

const ProductPage = (props) => {
  return (
    <Aux>
      <ProductSection
        addToCartClicked={props.onProductAddToCart}
        productCollections={ProductCollections}
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

export default connect(null, mapDispatchToProps)(ProductPage);
