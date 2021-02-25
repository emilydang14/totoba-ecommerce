import React from "react";
import classes from "./GeneralInfos.module.css";
import Logo from "../../UI/Logo/Logo";

const GeneralInfos = (props) => {
  const generalInfo = props.generalInfoDatas.map((data) => {
    return (
      <div className={classes.generalInfo} key={data.heading}>
        <p className={classes.heading}>{data.heading}</p>
        <div className={classes.infoContents}>
          {data.infoContents.map((content) => (
            <Logo
              key={content.alt}
              href={content.href}
              imgSrc={content.imgSrc}
              alt={content.alt}
            />
          ))}
        </div>
      </div>
    );
  });

  return <div className={classes.GeneralInfos}>{generalInfo}</div>;
};

export default GeneralInfos;
