import React from "react";

const Footer = () => {
  const date = new Date();

  const style = {
    textAlign: "center",
    color: "white",
    fontSize: "1rem",
    paddingBottom: "20px",
    marginTop: "20px",
  };

  return <div style={style}>CopyRight © {date.getFullYear()}</div>;
};

export default Footer;
