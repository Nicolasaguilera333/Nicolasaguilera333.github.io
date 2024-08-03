import React from "react";
import ExampleLogo from "../../assets/images/dragorasmalllogo.png";
import heroImage from "../../assets/images/heroimage.jpg";

export const Inicio = () => {
  return (
    <>
      <article
        style={{ backgroundImage: `url(${heroImage})` }}
        className="inicio"
      >
        <div className="jumbo jumbo-dark">
          <div className="inicioContainer">
            <div className="inicioTitulo">
              <h3>
                Encuentra los mejores repuestos automotrices al mejor precio
              </h3>
              <button type="button" className="btn btn-secondary">
                Cotiza Aquí
              </button>
            </div>
          </div>
        </div>
      </article>

      <article className="marcas">
        <div className="marcasContainer">
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
        </div>
        <div className="marcasTextoContainer">
          <button type="button" className="btn btn-light">
            Cotiza tu marca preferida
          </button>
        </div>
      </article>
      <article className="marcas">
        <div className="marcasContainer">
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
          <div className="marcaContainer">
            <img src={ExampleLogo} alt="" />
            <p>Marca</p>
          </div>
        </div>
        <div className="marcasTextoContainer">
          <button type="button" className="btn btn-light">
            Cotiza tu marca preferida
          </button>
        </div>
      </article>
    </>
  );
};
