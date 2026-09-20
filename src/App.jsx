import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./App.css";

import {
  FaPause,
  FaPlay,
} from "react-icons/fa";

import Portada from "./componentes/Portada/Portada";
import Hero from "./componentes/Hero/Hero";
import Fecha from "./componentes/fecha/Fecha";
import CuentaRegresiva from "./componentes/cuentaregresiva/CuentaRegresiva";
import Lugar from "./componentes/lugar/Lugar";
import DressCode from "./componentes/dresscode/DressCode";
import Regalos from "./componentes/regalos/Regalos";
import Playlist from "./componentes/playlist/Playlist";
import AlbumCompartido from "./componentes/albumcompartido/AlbumCompartido";
import Confirmacion from "./componentes/confirmacion/Confirmacion";
import PanelCliente from "./componentes/panel/PanelCliente";

function App() {
  const [invitacionAbierta, setInvitacionAbierta] =
    useState(false);

  const [
    musicaReproduciendo,
    setMusicaReproduciendo,
  ] = useState(false);

  const audioRef = useRef(null);

  /*
    Detectamos si la dirección contiene:

    ?panel=cliente
  */

  const parametros = new URLSearchParams(
    window.location.search
  );

  const mostrarPanel =
    parametros.get("panel") === "cliente";

  useEffect(() => {
    /*
      Si estamos viendo el panel, no ejecutamos
      las animaciones de la invitación.
    */

    if (
      mostrarPanel ||
      !invitacionAbierta
    ) {
      return undefined;
    }

    const secciones =
      document.querySelectorAll(
        ".reveal-section"
      );

    if (
      !("IntersectionObserver" in window)
    ) {
      secciones.forEach((seccion) => {
        seccion.classList.add(
          "reveal-section--visible"
        );
      });

      return undefined;
    }

    const observador =
      new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
              entrada.target.classList.add(
                "reveal-section--visible"
              );

              observador.unobserve(
                entrada.target
              );
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin:
            "0px 0px -40px 0px",
        }
      );

    secciones.forEach((seccion) => {
      observador.observe(seccion);
    });

    return () => {
      observador.disconnect();
    };
  }, [
    invitacionAbierta,
    mostrarPanel,
  ]);

  const abrirInvitacion = async () => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.35;

      try {
        await audio.play();

        setMusicaReproduciendo(true);
      } catch (error) {
        console.warn(
          "No se pudo iniciar la música:",
          error
        );

        setMusicaReproduciendo(false);
      }
    }

    setInvitacionAbierta(true);

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const alternarMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();

        setMusicaReproduciendo(true);
      } catch (error) {
        console.warn(
          "No se pudo reproducir la música:",
          error
        );
      }

      return;
    }

    audio.pause();
    setMusicaReproduciendo(false);
  };

  /*
    Si la dirección contiene ?panel=cliente,
    mostramos únicamente el panel.

    No se muestra la portada, la música ni
    la invitación.
  */

  if (mostrarPanel) {
    return <PanelCliente />;
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source
          src={`${import.meta.env.BASE_URL}audio/cancion.mp3`}
          type="audio/mpeg"
        />
      </audio>

      {!invitacionAbierta ? (
        <Portada
          onIngresar={abrirInvitacion}
        />
      ) : (
        <main className="tarjeta">
          <Hero />

          <div className="reveal-section">
            <Fecha />
          </div>

          <div className="reveal-section">
            <CuentaRegresiva />
          </div>

          <div className="reveal-section">
            <Lugar />
          </div>

          <div className="reveal-section">
            <DressCode />
          </div>

          <div className="reveal-section">
            <Regalos />
          </div>

          <div className="reveal-section">
            <Playlist />
          </div>

          <div className="reveal-section">
            <AlbumCompartido />
          </div>

          <div className="reveal-section">
            <Confirmacion />
          </div>
        </main>
      )}

      {invitacionAbierta && (
        <button
          className={`boton-musica ${
            musicaReproduciendo
              ? "boton-musica--activo"
              : ""
          }`}
          type="button"
          onClick={alternarMusica}
          aria-label={
            musicaReproduciendo
              ? "Pausar música"
              : "Reproducir música"
          }
          title={
            musicaReproduciendo
              ? "Pausar música"
              : "Reproducir música"
          }
        >
          {musicaReproduciendo ? (
            <FaPause aria-hidden="true" />
          ) : (
            <FaPlay aria-hidden="true" />
          )}
        </button>
      )}
    </>
  );
}

export default App;