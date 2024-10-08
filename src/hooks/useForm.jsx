import React, { useState } from "react";

export const UseForm = (objetoInicial = {}) => {
  const [formulario, setFormulario] = useState(objetoInicial);

  const serializarFormulario = (formulario) => {
    const miFormData = new FormData(formulario);

    const objetoCompleto = {};

    for (let [name, value] of miFormData) {
      objetoCompleto[name] = value;
    }

    return objetoCompleto;
  };

  const enviado = (e) => {
    e.preventDefault();
    let curso = serializarFormulario(e.target);
    setFormulario(curso);
  };

  const cambiado = ({ target }) => {
    const { name, value } = target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  return {
    formulario,
    enviado,
    cambiado,
    serializarFormulario,
  };
};
