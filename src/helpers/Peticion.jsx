export const Peticion = async (
  url,
  metodo,
  datosGuardar = "",
  archivos = false
) => {
  let cargando = true;

  let opciones = {
    method: "GET",
  };

  if (metodo == "POST" || metodo == "PUT") {
    let body = JSON.stringify(datosGuardar);

    if (archivos) {
      opciones = {
        method: metodo,
        body: datosGuardar,
      };
    } else {
      opciones = {
        method: metodo,
        body,
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  }

  if (metodo == "GET" || metodo == "DELETE") {
    opciones = {
      method: metodo,
    };
  }
  //atacamos la URL
  const peticion = await fetch(url, opciones);
  //Convertimos de JSON a un objeto
  const datos = await peticion.json();

  cargando = false;

  return {
    datos,
    cargando,
  };
};
