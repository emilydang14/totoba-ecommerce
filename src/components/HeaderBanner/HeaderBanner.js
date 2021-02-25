import React from "react";
import classes from "./HeaderBanner.module.css";
import BannerImg from "../../assets/Banner/banner_img.png";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";
const HeaderBanner = (props) => {
  return (
    <div className={classes.HeaderBanner}>
      <div className={classes.bannerInfo}>
        <h1>Tote for styles. ToToBa. for love</h1>
        <p>
          Handmade tote bag 100% made from recycled materials, matches with your
          styles and beautiful in mother of Earth eyes
        </p>
        <div className={classes.bannerButtons}>
          <Link to="/our-products">
            <Button btnName="Our Products" clicked={props.productBtnClicked} />
          </Link>
          <Link to="/our-story">
            <Button btnName="Our Story" clicked={props.storyBtnClicked} />
          </Link>
        </div>
      </div>
      <div className={classes.bannerImg}>
        <img src={BannerImg} alt="" />
      </div>
    </div>
  );
};

export default HeaderBanner;
