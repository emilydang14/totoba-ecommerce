import React from "react";
import classes from "./Footer.module.css";
import * as footerDatas from "../../datas/footer-datas";
import GeneralLinks from "./GeneralLinks/GeneralLinks";
import GeneralInfo from "./GeneralInfos/GeneralInfos";

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <main className={classes.footer_main}>
        <GeneralLinks generalLinksData={footerDatas.generalLinks} />
        <GeneralInfo generalInfoDatas={footerDatas.generalInfos} />
      </main>
      <div className={classes.copyright}>
        <p>©2021 Emily Dang</p>
      </div>
    </div>
  );
};

export default Footer;
