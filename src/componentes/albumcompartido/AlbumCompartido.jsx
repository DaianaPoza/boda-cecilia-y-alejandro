import "./AlbumCompartido.css";

import albumFoto from "../../assets/albumfoto.png";

const ALBUM_URL =
  "https://www.elgrandia.events/album/boda-ceci-y-ale";

function AlbumCompartido() {
  return (
    <section
      className="album-compartido"
      style={{
        "--album-fondo": `url(${albumFoto})`,
      }}
    >
      <div className="album-compartido__contenido">
        <h2 className="titulo-seccion album-compartido__titulo">
          ALBUM DE FOTOS 
        </h2>

        {/* Este espacio permite que la cámara quede visible */}
        <div
          className="album-compartido__espacio-camara"
          aria-hidden="true"
        />

        <div className="album-compartido__panel">
          <p className="album-compartido__mensaje">
            Ayudanos a guardar cada momento.
            <br />
            Subí las fotos que captures durante la celebración
            y compartilas con nosotros.
          </p>

          <a
            className="boton-principal album-compartido__boton"
            href={ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subir fotos al álbum compartido de Alejandro y Cecilia"
          >
            Subir fotos
          </a>
        </div>
      </div>
    </section>
  );
}

export default AlbumCompartido;