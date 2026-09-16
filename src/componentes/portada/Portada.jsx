import "./Portada.css";

import ramaSuperior from "../../assets/eucalipto-esquina-superior-izquierda.png";
import ramaInferior from "../../assets/eucalipto-esquina-inferior-derecha.png";
import sobre from "../../assets/sobre-invitacion-sello.png";

function Portada({ onIngresar }) {
  return (
    <section className="portada">
      <img
        className="portada__rama portada__rama--superior"
        src={ramaSuperior}
        alt=""
        aria-hidden="true"
      />

      <div className="portada__contenido">
        

        <h1 className="portada__nombres">
          <span>Alejandro</span>

          <span className="portada__ampersand">
            y
          </span>

          <span>Cecilia</span>
        </h1>


        <img
          className="portada__sobre"
          src={sobre}
          alt=""
          aria-hidden="true"
        />


<p className="portada__frase">
          ESTO COMIENZA HOY
        </p>


        <button
          className="boton-principal"
          type="button"
          onClick={onIngresar}
        >
          Ingresar
        </button>
      </div>

      <img
        className="portada__rama portada__rama--inferior"
        src={ramaInferior}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}

export default Portada;