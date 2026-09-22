import "./Hero.css";

import ramitaDivisora from "../../assets/ramita-eucalipto-divisor.png";
import ramaSuperiorHero from "../../assets/eucalipto-esquina-superior-izquierda.png";
import ramaInferiorHero from "../../assets/ramito-eucalipto-transparente.png";

function Hero() {
  return (
    <section className="hero seccion-clara">
      <img
        className="hero__rama-superior"
        src={ramaSuperiorHero}
        alt=""
        aria-hidden="true"
      />




{/* Ramo inferior izquierdo */}
<div
  className="hero__rama-inferior hero__rama-inferior--izquierda"
  aria-hidden="true"
>
  <img
    className="hero__rama-inferior-imagen"
    src={ramaInferiorHero}
    alt=""
  />
</div>

{/* Ramo inferior derecho */}
<div
  className="hero__rama-inferior hero__rama-inferior--derecha"
  aria-hidden="true"
>
  <img
    className="hero__rama-inferior-imagen hero__rama-inferior-imagen--invertida"
    src={ramaInferiorHero}
    alt=""
  />
</div>





      <div className="hero__contenido">
        <header className="hero__encabezado">
          <span className="hero__antesala">Nos</span>

          <h1 className="hero__titulo">Casamos</h1>
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
    </section>
  );
}

export default Hero;