import classes from "./CollectionSlide.module.css";
import React from "react";
import ProductCard from "./ProductCard/ProductCard";

const CollectionSlide = (props) => {
  const productCards = props.products.map((product) => (
    <ProductCard
      key={product.productID}
      productName={product.productName}
      productImg={product.productImg}
      productShortDescription={product.productShortDescription}
      productPrice={product.productPrice}
      addToCartClicked={() => props.addToCartClicked(product.productID)} //!!!!!
    />
  ));

  return (
    <div className={classes.CollectionSlide}>
      <h1>{props.collectionHeading}</h1>
      <div className={classes.productCards}>{productCards}</div>
    </div>
  );
};

export default CollectionSlide;
