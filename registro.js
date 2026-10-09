const SUPABASE_URL = "https://ivuoojsefrhcktbcsama.supabase.co";
const SUPABASE_KEY = "sb_publishable_vrc2DojezDMDb-ucN93W_Q_weAs_21B";

const formulario = document.getElementById("formulario");
const boton = document.getElementById("enviar");
const mensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);
  const nombre_universidad = String(datos.get("nombre_universidad") ?? "").trim();
  const carrera_profesional = String(datos.get("carrera_profesional") ?? "").trim();

  if (!nombre_universidad || !carrera_profesional) {
    mostrarMensaje("Completa ambos campos.", "error");
    return;
  }

  boton.disabled = true;
  mostrarMensaje("Guardando...", "");

  try {
    const respuesta = await fetch(`${SUPABASE_URL}/rest/v1/universidad_carreras`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ nombre_universidad, carrera_profesional }),
    });

    if (respuesta.status === 409) {
      mostrarMensaje("Esa carrera ya está registrada para esta universidad.", "error");
    } else if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    } else {
      formulario.reset();
      mostrarMensaje("Carrera registrada correctamente.", "exito");
    }
  } catch (error) {
    console.error(error);
    mostrarMensaje("No se pudo guardar. Revisa la conexión o los permisos de la base de datos.", "error");
  } finally {
    boton.disabled = false;
  }
});
