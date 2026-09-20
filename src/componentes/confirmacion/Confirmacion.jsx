import { useState } from "react";
import { supabase } from "../../lib/supabase.js";

import "./Confirmacion.css";

const EVENTO_SLUG = "boda-cecilia-alejandro";

const CANTIDADES = Array.from(
  { length: 8 },
  (_, indice) => indice + 1
);

const OPCIONES_RESTRICCION = [
  {
    valor: "sin_restricciones",
    etiqueta: "Sin restricciones",
  },
  {
    valor: "vegetariano",
    etiqueta: "Vegetariano/a",
  },
  {
    valor: "vegano",
    etiqueta: "Vegano/a",
  },
  {
    valor: "celiaco",
    etiqueta: "Celíaco/a",
  },
  {
    valor: "otra",
    etiqueta: "Otra",
  },
];

const crearAsistenteVacio = () => ({
  nombre: "",
  restriccion: "sin_restricciones",
  detalle: "",
});

const obtenerEtiquetaRestriccion = (valor) =>
  OPCIONES_RESTRICCION.find(
    (opcion) => opcion.valor === valor
  )?.etiqueta ?? valor;

function Confirmacion() {
  const [asiste, setAsiste] = useState("");

  const [nombreNoAsiste, setNombreNoAsiste] =
    useState("");

  const [cantidad, setCantidad] = useState(1);

  const [asistentes, setAsistentes] = useState([
    crearAsistenteVacio(),
  ]);

  const [mensaje, setMensaje] = useState("");

  const [tipoMensaje, setTipoMensaje] =
    useState("");

  const [enviando, setEnviando] =
    useState(false);

  const limpiarMensaje = () => {
    setMensaje("");
    setTipoMensaje("");
  };

  const cambiarAsistencia = (respuesta) => {
    setAsiste(respuesta);
    limpiarMensaje();

    if (respuesta === "si") {
      setNombreNoAsiste("");
    }

    if (respuesta === "no") {
      setCantidad(1);
      setAsistentes([crearAsistenteVacio()]);
    }
  };

  const cambiarCantidad = (nuevaCantidad) => {
    const cantidadNumerica = Number(
      nuevaCantidad
    );

    setCantidad(cantidadNumerica);
    limpiarMensaje();

    setAsistentes((actuales) =>
      Array.from(
        { length: cantidadNumerica },
        (_, indice) =>
          actuales[indice] ??
          crearAsistenteVacio()
      )
    );
  };

  const actualizarAsistente = (
    indice,
    campo,
    valor
  ) => {
    setAsistentes((actuales) =>
      actuales.map((asistente, posicion) => {
        if (posicion !== indice) {
          return asistente;
        }

        const actualizado = {
          ...asistente,
          [campo]: valor,
        };

        if (
          campo === "restriccion" &&
          valor !== "otra"
        ) {
          actualizado.detalle = "";
        }

        return actualizado;
      })
    );

    limpiarMensaje();
  };

  const validarFormulario = () => {
    if (!asiste) {
      return "Indicá si van a asistir.";
    }

    if (asiste === "no") {
      if (!nombreNoAsiste.trim()) {
        return "Completá tu nombre y apellido.";
      }

      return "";
    }

    if (cantidad < 1 || cantidad > 8) {
      return "Seleccioná una cantidad válida.";
    }

    for (
      let indice = 0;
      indice < asistentes.length;
      indice += 1
    ) {
      const asistente = asistentes[indice];

      if (!asistente.nombre.trim()) {
        return `Completá el nombre de la persona ${
          indice + 1
        }.`;
      }

      if (!asistente.restriccion) {
        return `Seleccioná la restricción de la persona ${
          indice + 1
        }.`;
      }

      if (
        asistente.restriccion === "otra" &&
        !asistente.detalle.trim()
      ) {
        return `Aclarar la restricción de la persona ${
          indice + 1
        }.`;
      }
    }

    return "";
  };

  const crearResumenRestricciones = () =>
    asistentes
      .map((asistente, indice) => {
        const restriccion =
          asistente.restriccion === "otra"
            ? `Otra: ${asistente.detalle.trim()}`
            : obtenerEtiquetaRestriccion(
                asistente.restriccion
              );

        return `${indice + 1}. ${asistente.nombre.trim()} — ${restriccion}`;
      })
      .join("\n");

  const obtenerNombresAsistentes = () =>
    asistentes
      .map((asistente) =>
        asistente.nombre.trim()
      )
      .join(", ");

  const limpiarFormulario = () => {
    setAsiste("");
    setNombreNoAsiste("");
    setCantidad(1);
    setAsistentes([crearAsistenteVacio()]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorValidacion =
      validarFormulario();

    if (errorValidacion) {
      setMensaje(errorValidacion);
      setTipoMensaje("error");
      return;
    }

    setEnviando(true);
    limpiarMensaje();

    const confirmaAsistencia =
      asiste === "si";

    const respuesta = {
      evento: EVENTO_SLUG,

      nombre_apellido: confirmaAsistencia
        ? obtenerNombresAsistentes()
        : nombreNoAsiste.trim(),

      asiste: confirmaAsistencia,

      cantidad_invitados:
        confirmaAsistencia
          ? cantidad
          : 0,

      restriccion_alimentaria:
        confirmaAsistencia
          ? crearResumenRestricciones()
          : null,
    };

    const { error } = await supabase
      .from("confirmaciones")
      .insert([respuesta]);

    if (error) {
      console.error(
        "Error al guardar la confirmación:",
        error
      );

      setMensaje(
        "No pudimos registrar tu respuesta. Intentá nuevamente."
      );

      setTipoMensaje("error");
      setEnviando(false);
      return;
    }

    setMensaje(
      "¡Gracias! Tu respuesta fue registrada correctamente."
    );

    setTipoMensaje("success");
    limpiarFormulario();
    setEnviando(false);
  };

  return (
    <section
      className="confirmacion seccion-clara"
      aria-labelledby="confirmacion-titulo"
    >
      <div className="confirmacion__contenido">
        <h2
          className="titulo-seccion confirmacion__titulo"
          id="confirmacion-titulo"
        >
          ¡Confirmá tu asistencia!
        </h2>

        <p className="confirmacion__introduccion">
          En el caso de más de un invitado, completá una única tarjeta por
          grupo.
        </p>

        <form
          className="confirmacion__formulario"
          onSubmit={handleSubmit}
          aria-busy={enviando}
        >
          <fieldset
            className="confirmacion__grupo"
            disabled={enviando}
          >
            <legend className="confirmacion__pregunta">
              ¿Vas a asistir?
            </legend>

            <div className="confirmacion__opciones">
              <label className="confirmacion__opcion">
                <input
                  type="radio"
                  name="asiste"
                  value="si"
                  checked={asiste === "si"}
                  onChange={() =>
                    cambiarAsistencia("si")
                  }
                  required
                />

                <span>
                  Sí, puedo asistir
                </span>
              </label>

              <label className="confirmacion__opcion">
                <input
                  type="radio"
                  name="asiste"
                  value="no"
                  checked={asiste === "no"}
                  onChange={() =>
                    cambiarAsistencia("no")
                  }
                />

                <span>
                  No puedo asistir
                </span>
              </label>
            </div>
          </fieldset>

          {asiste === "no" && (
            <label className="confirmacion__campo">
              <span>Nombre y apellido</span>

              <input
                type="text"
                value={nombreNoAsiste}
                onChange={(event) => {
                  setNombreNoAsiste(
                    event.target.value
                  );

                  limpiarMensaje();
                }}
                placeholder="Escribí tu nombre completo"
                autoComplete="name"
                disabled={enviando}
                required
              />
            </label>
          )}

          {asiste === "si" && (
            <>
              <label className="confirmacion__campo">
                <span>
                  Cantidad total de invitados
                </span>

                <select
                  value={cantidad}
                  onChange={(event) =>
                    cambiarCantidad(
                      event.target.value
                    )
                  }
                  disabled={enviando}
                  required
                >
                  {CANTIDADES.map((numero) => (
                    <option
                      value={numero}
                      key={numero}
                    >
                      {numero}{" "}
                      {numero === 1
                        ? "persona"
                        : "personas"}
                    </option>
                  ))}
                </select>
              </label>

              <div className="confirmacion__asistentes">
                <p className="confirmacion__asistentes-titulo">
                  Datos del/los invitado/s
                </p>

                {asistentes.map(
                  (asistente, indice) => (
                    <fieldset
                      className="confirmacion__asistente"
                      key={indice}
                      disabled={enviando}
                    >
                      <legend>
                        Persona {indice + 1}
                      </legend>

                      <label className="confirmacion__campo">
                        <span>
                          Nombre y apellido
                        </span>

                        <input
                          type="text"
                          value={asistente.nombre}
                          onChange={(event) =>
                            actualizarAsistente(
                              indice,
                              "nombre",
                              event.target.value
                            )
                          }
                          placeholder="Nombre completo"
                          autoComplete="off"
                          required
                        />
                      </label>

                      <label className="confirmacion__campo">
                        <span>
                          Restricción alimentaria
                        </span>

                        <select
                          value={
                            asistente.restriccion
                          }
                          onChange={(event) =>
                            actualizarAsistente(
                              indice,
                              "restriccion",
                              event.target.value
                            )
                          }
                          required
                        >
                          {OPCIONES_RESTRICCION.map(
                            (opcion) => (
                              <option
                                value={
                                  opcion.valor
                                }
                                key={
                                  opcion.valor
                                }
                              >
                                {
                                  opcion.etiqueta
                                }
                              </option>
                            )
                          )}
                        </select>
                      </label>

                      {asistente.restriccion ===
                        "otra" && (
                        <label className="confirmacion__campo">
                          <span>
                            Aclaración
                          </span>

                          <input
                            type="text"
                            value={
                              asistente.detalle
                            }
                            onChange={(event) =>
                              actualizarAsistente(
                                indice,
                                "detalle",
                                event.target.value
                              )
                            }
                            placeholder="Especificá la restricción"
                            required
                          />
                        </label>
                      )}
                    </fieldset>
                  )
                )}
              </div>
            </>
          )}

          <button
            className="boton-principal confirmacion__boton"
            type="submit"
            disabled={enviando || !asiste}
          >
            {enviando
              ? "Enviando..."
              : "Enviar confirmación"}
          </button>

          {mensaje && (
            <p
              className={`confirmacion__mensaje confirmacion__mensaje--${tipoMensaje}`}
              role={
                tipoMensaje === "error"
                  ? "alert"
                  : "status"
              }
            >
              {mensaje}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Confirmacion;