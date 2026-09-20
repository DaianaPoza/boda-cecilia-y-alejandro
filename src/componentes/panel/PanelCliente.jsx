import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../../lib/supabase.js";

import "./PanelCliente.css";

const EVENTO_SLUG =
  "boda-cecilia-alejandro";

function PanelCliente() {
  const [session, setSession] =
    useState(null);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmaciones, setConfirmaciones] =
    useState([]);

  const [cargandoSesion, setCargandoSesion] =
    useState(true);

  const [cargandoDatos, setCargandoDatos] =
    useState(false);

  const [iniciandoSesion, setIniciandoSesion] =
    useState(false);

  const [mensaje, setMensaje] =
    useState("");

  useEffect(() => {
    const obtenerSesion = async () => {
      const {
        data: { session: sesionActual },
      } = await supabase.auth.getSession();

      setSession(sesionActual);
      setCargandoSesion(false);
    };

    obtenerSesion();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_evento, sesionActual) => {
        setSession(sesionActual);
        setCargandoSesion(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setConfirmaciones([]);
      return;
    }

    const cargarConfirmaciones = async () => {
      setCargandoDatos(true);
      setMensaje("");

      const { data, error } = await supabase
        .from("confirmaciones")
        .select(
          `
            id,
            nombre_apellido,
            cantidad_invitados,
            restriccion_alimentaria,
            asiste,
            created_at
          `
        )
        .eq("evento", EVENTO_SLUG)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Error al cargar confirmaciones:",
          error
        );

        setMensaje(
          "No pudimos cargar las confirmaciones."
        );

        setConfirmaciones([]);
        setCargandoDatos(false);
        return;
      }

      setConfirmaciones(data ?? []);
      setCargandoDatos(false);
    };

    cargarConfirmaciones();
  }, [session]);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMensaje(
        "Ingresá el correo y la contraseña."
      );
      return;
    }

    setIniciandoSesion(true);
    setMensaje("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (error) {
      console.error(
        "Error al iniciar sesión:",
        error
      );

      setMensaje(
        "El correo o la contraseña no son correctos."
      );

      setIniciandoSesion(false);
      return;
    }

    setPassword("");
    setIniciandoSesion(false);
  };

  const handleLogout = async () => {
    setMensaje("");

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      setMensaje(
        "No pudimos cerrar la sesión."
      );
    }
  };





  const escaparCelda = (valor) => {
    const texto = String(valor ?? "")
      .replace(/\r?\n/g, " | ")
      .replace(/\s+/g, " ")
      .trim();

    return `"${texto.replace(/"/g, '""')}"`;
  };

  const descargarLista = () => {
    if (confirmaciones.length === 0) {
      setMensaje(
        "Todavía no hay confirmaciones para descargar."
      );
      return;
    }


     const encabezados = [
      "Grupo o confirmacion",
      "Nombre del asistente",
      "Restriccion alimentaria",
      "Asiste",
      "Cantidad del grupo",
      "Fecha de confirmacion",
    ];

    const filas = confirmaciones.flatMap(
      (confirmacion) => {
        const fecha = confirmacion.created_at
          ? new Date(
              confirmacion.created_at
            ).toLocaleString("es-AR")
          : "";

        // Si no asiste, genera una sola fila
        if (!confirmacion.asiste) {
          return [
            [
              confirmacion.nombre_apellido || "",
              confirmacion.nombre_apellido || "",
              "No corresponde",
              "No",
              0,
              fecha,
            ],
          ];
        }

        const detalles =
          confirmacion.restriccion_alimentaria
            ?.split(/\r?\n/)
            .map((detalle) => detalle.trim())
            .filter(Boolean) ?? [];

        // Cada detalle guardado tiene un formato similar a:
        // 1. Mauro — Sin restricciones
      const asistentes = detalles.map(
  (detalle, indice) => {
            const detalleSinNumero =
              detalle.replace(
                /^\d+\.\s*/,
                ""
              );

            const partes =
              detalleSinNumero.split(
                /\s+[—–]\s+/
              );

            const nombre =
              partes[0]?.trim() || "";

            const restriccion =
              partes
                .slice(1)
                .join(" — ")
                .trim() ||
              "Sin restricciones";

            return [
              confirmacion.nombre_apellido || "",
              nombre,
              restriccion,
              "Si",
              indice === 0
  ? confirmacion.cantidad_invitados ?? 0
  : "",
              fecha,
            ];
          }
        );

        // Respaldo por si una confirmación anterior
        // no tiene el detalle individual guardado
        if (asistentes.length === 0) {
          const nombres = String(
            confirmacion.nombre_apellido || ""
          )
            .split(",")
            .map((nombre) => nombre.trim())
            .filter(Boolean);

        return nombres.map((nombre, indice) => [
  confirmacion.nombre_apellido || "",
  nombre,
  "Sin restricciones",
  "Sí",

  indice === 0
    ? confirmacion.cantidad_invitados ?? 0
    : "",

  fecha,
]);
        }

        return asistentes;
      }
    );





   













    const contenido = [
      "sep=;",

      encabezados
        .map(escaparCelda)
        .join(";"),

      ...filas.map((fila) =>
        fila
          .map(escaparCelda)
          .join(";")
      ),
    ].join("\r\n");

    const archivo = new Blob(
      [`\uFEFF${contenido}`],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(archivo);

    const enlace =
      document.createElement("a");

    enlace.href = url;

    enlace.download =
      "confirmaciones-alejandro-cecilia.csv";

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(url);
  };







  const totalRespuestas =
    confirmaciones.length;

  const totalAsistentes =
    confirmaciones.reduce(
      (total, confirmacion) => {
        if (!confirmacion.asiste) {
          return total;
        }

        return (
          total +
          Number(
            confirmacion.cantidad_invitados || 0
          )
        );
      },
      0
    );

  const respuestasPositivas =
    confirmaciones.filter(
      (confirmacion) =>
        confirmacion.asiste === true
    ).length;

  const respuestasNegativas =
    confirmaciones.filter(
      (confirmacion) =>
        confirmacion.asiste === false
    ).length;

  const invitationUrl =
    `${window.location.origin}${window.location.pathname}`;

  if (cargandoSesion) {
    return (
      <main className="panel panel--centrado">
        <p className="panel__cargando">
          Cargando panel...
        </p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="panel panel--centrado">
        <section className="panel__login">
          <p className="panel__etiqueta">
            Panel de confirmaciones
          </p>

          <h1 className="panel__titulo">
            Alejandro <br />& <br />Cecilia
          </h1>

          <p className="panel__login-introduccion">
            Ingresá con los datos proporcionados
            para consultar las respuestas.
          </p>

          <form
            className="panel__login-formulario"
            onSubmit={handleLogin}
          >
            <label className="panel__campo">
              <span>Correo electrónico</span>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                disabled={iniciandoSesion}
                required
              />
            </label>

            <label className="panel__campo">
              <span>Contraseña</span>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                disabled={iniciandoSesion}
                required
              />
            </label>

            <button
              className="panel__login-boton"
              type="submit"
              disabled={iniciandoSesion}
            >
              {iniciandoSesion
                ? "Ingresando..."
                : "Ingresar"}
            </button>

            {mensaje && (
              <p
                className="panel__mensaje panel__mensaje--error"
                role="alert"
              >
                {mensaje}
              </p>
            )}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="panel">
      <div className="panel__contenedor">
        <p className="panel__etiqueta">
          Panel de confirmaciones
        </p>

        <h1 className="panel__titulo">
          Alejandro & Cecilia
        </h1>

        <div className="panel__acciones">
          <button
            type="button"
            onClick={descargarLista}
          >
            Descargar lista
          </button>

          <a href={invitationUrl}>
            Ver invitación
          </a>

          <button
            type="button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>

        {mensaje && (
          <p
            className="panel__mensaje panel__mensaje--error"
            role="alert"
          >
            {mensaje}
          </p>
        )}

        <section className="panel__estadisticas">
          <article>
            <span>Respuestas recibidas</span>
            <strong>{totalRespuestas}</strong>
          </article>

          <article>
            <span>Grupos que asisten</span>
            <strong>{respuestasPositivas}</strong>
          </article>

          <article>
            <span>Total de asistentes</span>
            <strong>{totalAsistentes}</strong>
          </article>

          <article>
            <span>No asisten</span>
            <strong>{respuestasNegativas}</strong>
          </article>
        </section>

        <div className="panel__tabla-contenedor">
          {cargandoDatos ? (
            <p className="panel__cargando">
              Cargando confirmaciones...
            </p>
          ) : confirmaciones.length === 0 ? (
            <p className="panel__vacio">
              Todavía no hay confirmaciones.
            </p>
          ) : (
            <table className="panel__tabla">
              <thead>
                <tr>
                 <th>Nombre/s</th>
                  <th>Asiste</th>
                  <th>Cantidad</th>
                  <th>
                    Asistentes y restricciones
                  </th>
                  <th>Fecha</th>
                </tr>
              </thead>

              <tbody>
                {confirmaciones.map(
                  (confirmacion) => (
                    <tr key={confirmacion.id}>
                      <td>
                        {
                          confirmacion.nombre_apellido
                        }
                      </td>

                      <td>
                        {confirmacion.asiste
                          ? "Si"
                          : "No"}
                      </td>

                      <td>
                        {confirmacion.asiste
                          ? confirmacion.cantidad_invitados
                          : "—"}
                      </td>

                      <td className="panel__restricciones">
                        {confirmacion.restriccion_alimentaria ??
                          "—"}
                      </td>

                      <td>
                        {confirmacion.created_at
                          ? new Date(
                              confirmacion.created_at
                            ).toLocaleDateString(
                              "es-AR"
                            )
                          : "—"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}

export default PanelCliente;