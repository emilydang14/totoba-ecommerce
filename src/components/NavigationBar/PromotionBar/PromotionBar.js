import React, { useEffect, useState } from "react";
import classes from "./PromotionBar.module.css";
import Promotions from "../../../datas/promotions";

let counter = 1;

const PromotionBar = () => {
  const [promotionText, setPromotionText] = useState(Promotions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      counter++;
      setPromotionText(Promotions[counter - 1]);
      if (counter === Promotions.length) counter = 0;
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return <div className={classes.PromotionBar}>{promotionText}</div>;
};

export default PromotionBar;
