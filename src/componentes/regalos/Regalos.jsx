import { useState } from "react";
import "./Regalos.css";

import regalo from "../../assets/regalo.png";
import eucaliptoInferior from "../../assets/eucalipto-esquina-inferior-derecha.png";
import eucaliptoSuperior from "../../assets/eucalipto-esquina-superior-izquierda.png";

const DATOS_BANCARIOS = {
  alias: "boda.aleyceci",
  cbu: "0000003100082840099477",
};

function Regalos() {
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [datoCopiado, setDatoCopiado] = useState("");

  const copiarDato = async (valor, nombre) => {
    try {
      await navigator.clipboard.writeText(valor);
      setDatoCopiado(nombre);

      window.setTimeout(() => {
        setDatoCopiado("");
      }, 2000);
    } catch (error) {
      console.warn("No se pudo copiar el dato:", error);
    }
  };

  return (
    <section className="regalos seccion-alterna">
  <img
  className="regalos__eucalipto regalos__eucalipto--inferior"
  src={eucaliptoInferior}
  alt=""
  aria-hidden="true"
/>

<img
  className="regalos__eucalipto regalos__eucalipto--superior"
  src={eucaliptoSuperior}
  alt=""
  aria-hidden="true"
/>

      <div className="regalos__contenido">
        <img
          className="regalos__icono"
          src={regalo}
          alt="Ilustración de un regalo"
        />

        <p className="regalos__mensaje texto-descriptivo">
          El mejor regalo es compartir  <br />  este día con ustedes.
          <br />
          Si desean acompañarnos con un presente, pueden
          ayudarnos a hacer realidad <br />nuestra luna de miel.
        </p>

        <button
          className="boton-secundario regalos__boton"
          type="button"
          onClick={() => setMostrarDatos((estado) => !estado)}
          aria-expanded={mostrarDatos}
          aria-controls="datos-bancarios"
        >
          {mostrarDatos
            ? "Ocultar datos"
            : "Ver datos bancarios"}
        </button>

        {mostrarDatos && (
          <div
            className="regalos__datos"
            id="datos-bancarios"
          >
            <div className="regalos__dato">
              <span className="regalos__etiqueta">
                Alias
              </span>

              <strong className="regalos__valor">
                {DATOS_BANCARIOS.alias}
              </strong>

              <button
                className="regalos__copiar"
                type="button"
                onClick={() =>
                  copiarDato(
                    DATOS_BANCARIOS.alias,
                    "alias"
                  )
                }
              >
                {datoCopiado === "alias"
                  ? "Copiado"
                  : "Copiar"}
              </button>
            </div>

            <div className="regalos__dato">
              <span className="regalos__etiqueta">
                CBU
              </span>

              <strong className="regalos__valor regalos__valor--cbu">
                {DATOS_BANCARIOS.cbu}
              </strong>

              <button
                className="regalos__copiar"
                type="button"
                onClick={() =>
                  copiarDato(
                    DATOS_BANCARIOS.cbu,
                    "cbu"
                  )
                }
              >
                {datoCopiado === "cbu"
                  ? "Copiado"
                  : "Copiar"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Regalos;