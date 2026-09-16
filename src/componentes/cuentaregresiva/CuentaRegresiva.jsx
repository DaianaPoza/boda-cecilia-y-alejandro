import { useEffect, useState } from "react";
import "./CuentaRegresiva.css";

const FECHA_CASAMIENTO = new Date(
  "2026-12-05T20:00:00-03:00"
).getTime();

function calcularTiempoRestante() {
  const diferencia = FECHA_CASAMIENTO - Date.now();

  if (diferencia <= 0) {
    return {
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
      finalizada: true,
    };
  }

  return {
    dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),

    horas: Math.floor(
      (diferencia / (1000 * 60 * 60)) % 24
    ),

    minutos: Math.floor(
      (diferencia / (1000 * 60)) % 60
    ),

    segundos: Math.floor(
      (diferencia / 1000) % 60
    ),

    finalizada: false,
  };
}

function formatearNumero(numero) {
  return String(numero).padStart(2, "0");
}

function CuentaRegresiva() {
  const [tiempo, setTiempo] = useState(
    calcularTiempoRestante
  );

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setTiempo(calcularTiempoRestante());
    }, 1000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, []);

  const unidades = [
    {
      valor: tiempo.dias,
      etiqueta: tiempo.dias === 1 ? "Día" : "Días",
    },
    {
      valor: tiempo.horas,
      etiqueta: tiempo.horas === 1 ? "Hora" : "Horas",
    },
    {
      valor: tiempo.minutos,
      etiqueta:
        tiempo.minutos === 1 ? "Minuto" : "Minutos",
    },
    {
      valor: tiempo.segundos,
      etiqueta:
        tiempo.segundos === 1 ? "Segundo" : "Segundos",
    },
  ];

  return (
    <section className="cuenta-regresiva seccion-clara">
      <div className="cuenta-regresiva__contenido">
      

        <h2 className="titulo-seccion cuenta-regresiva__titulo">
          CUENTA REGRESIVA
        </h2>

  <p className="cuenta-regresiva__introduccion">
          ¡Falta muy poco!
        </p>


        {tiempo.finalizada ? (
          <p className="cuenta-regresiva__mensaje">
            ¡Llegó el gran día!
          </p>
        ) : (
          <div
            className="cuenta-regresiva__contador"
            aria-label="Tiempo restante para el casamiento"
          >
            {unidades.map(({ valor, etiqueta }) => (
              <div
                className="cuenta-regresiva__unidad"
                key={etiqueta}
              >
                <span className="cuenta-regresiva__numero">
                  {formatearNumero(valor)}
                </span>

                <span className="cuenta-regresiva__etiqueta">
                  {etiqueta}
                </span>
              </div>
            ))}
          </div>
        )}

        <span
          className="cuenta-regresiva__linea"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default CuentaRegresiva;