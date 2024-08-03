import React from "react";

export const Cotizador = () => {
  return (
    <article class="cotizadorContainer">
      <div class="jumbo">
        <div class="cotizadorFormContainer">
          <div class="cotizadorTitle">
            <h3>Seleccionar Vehículo.</h3>
          </div>
          <div class="cotizadorInputContainer">
            <b style="margin-right: 15px">Repuesto:</b>
            <select class="form-control">
              <option>Default select</option>
              <option>Default select</option>
              <option>Default select</option>
            </select>
          </div>
          <div style="margin-top: 15px" class="cotizadorInputContainer">
            <b style="margin-right: 15px">Marca de Vehículo:</b>
            <select class="form-control">
              <option>Default select</option>
              <option>Default select</option>
              <option>Default select</option>
            </select>
          </div>
          <div style="margin-top: 15px" class="cotizadorInputContainer">
            <b style="margin-right: 15px">Modelo de Vehículo:</b>
            <select class="form-control">
              <option>Default select</option>
              <option>Default select</option>
              <option>Default select</option>
            </select>
          </div>
          <div
            style="text-align: left; margin-top: 15px"
            class="cotizadorInputContainer"
          >
            <b style="margin-right: 15px">Año del Modelo:</b>
            <select class="form-control">
              <option>Default select</option>
              <option>Default select</option>
              <option>Default select</option>
            </select>
          </div>
          <div class="cotizadorButtonContainer">
            <input
              class="btn btn-primary"
              type="submit"
              value="Buscar Piezas"
            />
          </div>
        </div>
      </div>
    </article>
  );
};
