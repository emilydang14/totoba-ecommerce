import classes from "./GeneralLinks.module.css";
import React from "react";

const GeneralLinks = (props) => {
  const generalLinks = props.generalLinksData.map((generalLink) => {
    return (
      <div key={generalLink.heading} className={classes.generalLinkGroup}>
        <p className={classes.heading}>{generalLink.heading}</p>
        {generalLink.links.map((link) => (
          <a
            className={classes.link}
            key={link.name}
            href={link.href}
            alt={link.name}
          >
            {link.name}
          </a>
        ))}
      </div>
    );
  });
  return <div className={classes.GeneralLinks}>{generalLinks}</div>;
};

export default GeneralLinks;
