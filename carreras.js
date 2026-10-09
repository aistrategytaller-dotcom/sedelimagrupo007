const SUPABASE_URL = "https://ivuoojsefrhcktbcsama.supabase.co";
const SUPABASE_KEY = "sb_publishable_vrc2DojezDMDb-ucN93W_Q_weAs_21B";

const lista = document.getElementById("lista");
const universidad = document.getElementById("universidad");

function mostrarEstado(texto) {
  lista.replaceChildren();
  const li = document.createElement("li");
  li.className = "estado";
  li.textContent = texto;
  lista.appendChild(li);
}

async function cargarCarreras() {
  const url = `${SUPABASE_URL}/rest/v1/universidad_carreras?select=nombre_universidad,carrera_profesional&order=carrera_profesional.asc`;

  try {
    const respuesta = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    }

    const filas = await respuesta.json();

    if (filas.length === 0) {
      mostrarEstado("No hay carreras registradas por ahora.");
      return;
    }

    universidad.textContent = filas[0].nombre_universidad;
    lista.replaceChildren(
      ...filas.map((fila) => {
        const li = document.createElement("li");
        li.textContent = fila.carrera_profesional;
        return li;
      })
    );
  } catch (error) {
    console.error(error);
    mostrarEstado("No se pudieron cargar las carreras. Intenta nuevamente más tarde.");
  }
}

cargarCarreras();
