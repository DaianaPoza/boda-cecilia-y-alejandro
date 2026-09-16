import "./DressCode.css";

import trajeFormal from "../../assets/traje-formal.png";
import vestidoFormal from "../../assets/vestido-formal.png";
import broteTresHojas from "../../assets/brote-tres-hojas.png";
import dosHojitas from "../../assets/dos-hojitas.png";

function DressCode() {
  return (
    <section className="dress-code seccion-clara">
      <img
        className="dress-code__hoja dress-code__hoja--superior"
        src={broteTresHojas}
        alt=""
        aria-hidden="true"
      />

      <div className="dress-code__contenido">
        <h2 className="titulo-seccion dress-code__titulo">
          DRESS CODE
        </h2>

        <p className="dress-code__tipo">
          Formal
        </p>

        <div className="dress-code__vestimenta">
          <div className="dress-code__prenda">
            <img
              className="dress-code__imagen dress-code__imagen--traje"
              src={trajeFormal}
              alt="Traje formal"
            />
          </div>

          <div className="dress-code__prenda">
            <img
              className="dress-code__imagen dress-code__imagen--vestido"
              src={vestidoFormal}
              alt="Vestido formal"
            />
          </div>
        </div>

        <span
          className="dress-code__linea"
          aria-hidden="true"
        />
      </div>

      <img
        className="dress-code__hoja dress-code__hoja--inferior"
        src={dosHojitas}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

export default DressCode;