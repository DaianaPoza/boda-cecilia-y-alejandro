import "./Fecha.css";
import anillos from "../../assets/anillos.png";
import ramitaFecha from "../../assets/ramita-eucalipto-divisor.png";

function Fecha() {
  return (
    <section className="fecha seccion-alterna">
      <img
        className="fecha__anillos fecha__anillos--izquierda"
        src={anillos}
        alt=""
        aria-hidden="true"
      />

      <div className="fecha__contenido">

        <h2 className="titulo-seccion fecha__titulo">
          FECHA
        </h2>

        <img
          className="fecha__anillos-central"
          src={anillos}
          alt="Alianzas de boda decoradas con hojas y flores"
        />

        <time
          className="fecha__numero texto-descriptivo"
          dateTime="2026-12-05"
          aria-label="5 de diciembre de 2026"
        >
          <span>05</span>
          <span className="fecha__separador">·</span>
          <span>12</span>
          <span className="fecha__separador">·</span>
          <span>2026</span>
        </time>


<img
  className="fecha__divisor"
  src={ramitaFecha}
  alt=""
  aria-hidden="true"
/>



      </div>

      <img
        className="fecha__anillos fecha__anillos--derecha"
        src={anillos}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

export default Fecha;