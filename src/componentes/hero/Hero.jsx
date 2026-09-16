import "./Hero.css";

import dosHojitas from "../../assets/dos-hojitas.png";
import grupoCincoHojas from "../../assets/grupo-cinco-hojas.png";
import hojaIndividual from "../../assets/hoja-individual.png";
import ramitaDivisora from "../../assets/ramita-eucalipto-divisor.png";
import ramaSuperiorHero from "../../assets/eucalipto-esquina-superior-izquierda.png";

function Hero() {
  return (
    <section className="hero seccion-clara">

  <img
    className="hero__rama-superior"
    src={ramaSuperiorHero}
    alt=""
    aria-hidden="true"
  />




      <img
        className="hero__hoja hero__hoja--superior-izquierda"
        src={dosHojitas}
        alt=""
        aria-hidden="true"
      />

      <img
        className="hero__hoja hero__hoja--superior-derecha"
        src={hojaIndividual}
        alt=""
        aria-hidden="true"
      />

      <div className="hero__contenido">
        <header className="hero__encabezado">
          <span className="hero__antesala">
            Nos
          </span>

          <h1 className="hero__titulo">
            Casamos
          </h1>
        </header>

        <div className="hero__divisor" aria-hidden="true">
          <span className="hero__linea" />

          <img
            className="hero__ramita"
            src={ramitaDivisora}
            alt=""
          />

          <span className="hero__linea" />
        </div>

        <p className="hero__mensaje">
          Y queremos compartir con vos
          <br />
          este momento tan especial.
        </p>

        <p className="hero__frase-final">
         Porque cada historia linda
          <br />
          merece ser celebrada
        </p>

        <span
          className="hero__linea-final"
          aria-hidden="true"
        />
      </div>

      <img
        className="hero__hoja hero__hoja--inferior-derecha"
        src={grupoCincoHojas}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

export default Hero;