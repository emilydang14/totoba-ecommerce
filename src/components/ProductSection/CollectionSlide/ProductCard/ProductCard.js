import classes from "./ProductCard.module.css";
import React from "react";
import AddToCartIcon from "../../../../assets/logos/addtocart.svg";

const ProductCard = (props) => {
  return (
    <div className={classes.ProductCard}>
      <img
        className={classes.productImg}
        src={props.productImg}
        alt={props.productName}
      />
      <div className={classes.productInfo}>
        <div className={classes.productInfoCol}>
          <p className={classes.bold}>{props.productName}</p>
          <p>{props.productShortDescription}</p>
        </div>
        <div className={classes.productInfoCol}>
          <p className={classes.bold}>€{props.productPrice}</p>
          <img
            className={classes.addToCartImg}
            onClick={props.addToCartClicked} //!!!
            src={AddToCartIcon}
            alt="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};
//productName productImg productShortDescription
export default ProductCard;
