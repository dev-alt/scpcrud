import React from "react";

const Footer = () => {
  const date = new Date();

  return (
    <div
      style={{
        textAlign: "center",
        color: "white",
        fontSize: "1rem",
        fontFamily: "Share Tech Mono",
        paddingBottom: "20px",
      }}
    >
      CopyRight © {date.getFullYear()}
    </div>
  );
};

export default Footer;
