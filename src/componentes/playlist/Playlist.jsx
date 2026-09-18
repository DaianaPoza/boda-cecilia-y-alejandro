import { FaSpotify } from "react-icons/fa";
import "./Playlist.css";

const SPOTIFY_COLLAB_URL =
  "PEGAR_ACA_EL_ENLACE_COLABORATIVO";

function Playlist() {
  return (
    <section className="playlist seccion-clara">
      <div className="playlist__contenido">
        <FaSpotify
          className="playlist__icono"
          aria-hidden="true"
        />

        <h2 className="titulo-seccion playlist__titulo">
          Nuestra playlist
        </h2>

        <p className="playlist__mensaje">
          ¿Qué canción no puede faltar?
          <br />
          Sumá tus favoritas y ayudanos  <br/>
          
           a crear la playlist de nuestra fiesta
        </p>



<p className="playlist__vigencia">
 Sumá tus canciones durante los próximos 6 días
</p>





        <a
          className="boton-secundario playlist__boton"
          href={SPOTIFY_COLLAB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agregar canciones a la playlist de Spotify"
        >
          <FaSpotify aria-hidden="true" />
          <span>Agregar canciones</span>
        </a>

        <span
          className="playlist__linea"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default Playlist;