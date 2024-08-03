import React from "react";
import exImage from "../../assets/images/eximage.jpg";
import socioImage from "../../assets/images/socioimage.jpg";

export const Sidebar = () => {
  return (
    <section className="aside">
      <div className="asideContainer">
        <h4>PATROCINIO</h4>
        <div className="dataContainer">
          <img src={exImage} alt="" />
        </div>
        <div className="dataContainer">
          <img src={exImage} alt="" />
        </div>
        <h4>BENEFICIO SOCIOS</h4>
        <div className="dataContainer">
          <img src={socioImage} alt="" />
        </div>
        <div className="dataContainer">
          <img src={socioImage} alt="" />
        </div>
        <div className="dataContainer">
          <img src={socioImage} alt="" />
        </div>
      </div>
    </section>
  );
};
