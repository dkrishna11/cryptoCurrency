import React from "react";
import "./style.css";
import { color } from "framer-motion";
const CoinInfo = ({ heading, desc }) => {
  const shortDesc =
    desc.slice(0, 200) + "<span style='color:var(--grey)'> Read More...</span>";
  const longDesc = desc;
  return (
    <div className="grey-wrapper">
      <h2 className="coin-info-heading">{heading}</h2>
      <p
        className="coin-info-desc"
        dangerouslySetInnerHTML={{ __html: shortDesc }}
      />
    </div>
  );
};

export default CoinInfo;
