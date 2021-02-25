import classes from "./CartItem.module.css";
import React from "react";

const CartItem = (props) => {
  return (
    <div className={classes.CartItem}>
      <div className={classes.productImgContainer}>
        <img
          className={classes.productImg}
          src={props.productImg}
          alt={props.productName}
        />
      </div>
      <div className={classes.itemInfo}>
        <p className={classes.collectionName}>{props.collectionName}</p>
        <div className={classes.productInfo}>
          <p className={`${classes.boldText} ${classes.productName}`}>
            {props.productName}
          </p>
          <div className={classes.productQty}>
            <p onClick={props.decreaseQty}> - </p>
            <p className={classes.boldText}>{props.productQty}</p>
            <p onClick={props.increaseQty}>+</p>
          </div>
          <p className={`${classes.boldText} ${classes.productPrice}`}>
            €{props.productPrice}
          </p>
        </div>
      </div>
      <div className={classes.removeItem} onClick={props.removeItem}>
        <p>x</p>
      </div>
    </div>
  );
};

export default CartItem;
