import "./Lugar.css";
import { WiDayCloudy } from "react-icons/wi";

import iglesia from "../../assets/iglesia.png";
import copas from "../../assets/copas-brindando.png";

const crearEnlaceMaps = (lugar) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    lugar
  )}`;

const enlaceCeremonia = crearEnlaceMaps(
  "Parroquia San Francisco Solano, Sourdeoux 2199, Bella Vista, Bahía Blanca"
);



const enlaceCelebracion = crearEnlaceMaps(
  "Lo de Salazar Eventos, Tucumán 1867, Bella Vista, Bahía Blanca"
);

const enlaceClima =
  "https://www.google.com/search?q=clima+Bella+Vista+San+Miguel+Buenos+Aires";



function Lugar() {
  return (
    <section className="lugar seccion-alterna">
      <div className="lugar__contenido">
        <h2 className="titulo-seccion lugar__titulo">
          UBICACION
        </h2>

        <article className="lugar__bloque">
          <div className="lugar__imagen-contenedor">
            <img
              className="lugar__imagen lugar__imagen--iglesia"
              src={iglesia}
              alt="Ilustración de la iglesia"
            />
          </div>

          <div className="lugar__informacion">
            <p className="lugar__orden texto-descriptivo">
              Primero
            </p>

            <h3 className="lugar__subtitulo">
              Ceremonia
            </h3>

            <p className="lugar__nombre texto-descriptivo">
              Parroquia San Francisco Solano
            </p>

            <address className="lugar__direccion texto-descriptivo">
              Sourdeoux 2199
              <br />
              Bella Vista
            </address>

            <p className="lugar__hora texto-descriptivo">
              20:00 hs.
            </p>

            <a
              className="boton-secundario"
              href={enlaceCeremonia}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cómo llegar a la Parroquia San Francisco Solano"
            >
              Cómo llegar
            </a>
          </div>
        </article>

        <div className="lugar__transicion">
          <span
            className="lugar__linea"
            aria-hidden="true"
          />

          <p className="lugar__transicion-texto texto-descriptivo">
            Al finalizar la ceremonia, los esperamos para
            continuar la celebración juntos.
          </p>

          <span
            className="lugar__linea"
            aria-hidden="true"
          />
        </div>

        <article className="lugar__bloque lugar__bloque--celebracion">

          <div className="lugar__imagen-contenedor">
            <img
              className="lugar__imagen lugar__imagen--copas"
              src={copas}
              alt="Ilustración de dos copas brindando"
            />
          </div>

          <div className="lugar__informacion">
            <p className="lugar__orden texto-descriptivo">
              Después
            </p>

            <h3 className="lugar__subtitulo">
              Celebración
            </h3>

            <p className="lugar__nombre texto-descriptivo">
              Lo de Salazar Eventos
            </p>

            <address className="lugar__direccion texto-descriptivo">
              Tucumán 1867
              <br />
              Bella Vista
            </address>

  

            <a
              className="boton-secundario lugar__boton-celebracion"
              href={enlaceCelebracion}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cómo llegar a Lo de Salazar Eventos"
            >
              Cómo llegar
            </a>
          </div>
        </article>


<div className="lugar__clima">
  <h3 className="lugar__clima-titulo">
    ¿Cómo estará el día?
  </h3>

  <p className="lugar__clima-texto texto-descriptivo">
    Tocá el ícono para consultar el clima
  </p>

  <a
    className="lugar__clima-enlace"
    href={enlaceClima}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Consultar el clima en Bahía Blanca"
    title="Consultar el clima"
  >
    <WiDayCloudy
      className="lugar__clima-icono"
      aria-hidden="true"
    />
  </a>
</div>










      </div>
    </section>
  );
}

export default Lugar;