// -------------- Boton volver del catalogo --------------

document.addEventListener('DOMContentLoaded', () => {
  const botonVolver = document.getElementById("btn-volver");
  
  // Validamos que el botón realmente exista en esta página para evitar errores en consola
  if (botonVolver) {
    botonVolver.addEventListener('click', () => {
      window.history.go(-1);
      console.log("funcionaaaaa");
    });
  }
});

// -------------- Formulario --------------

const form = document.getElementById("registro-form");
const btnSubmit = document.getElementById("btn-submit");
const feedbackMsg = document.getElementById("feedback-msg");

// ─── Funciones de validación ───────────────────────────────────────
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre);
}

function validarEmail(email) {
        
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefono(telefono) {
    if (telefono === "") return true; // Campo vacío → OK, es opcional

    const regex = /^\d+$/; // Si ingresó algo → solo números
    return regex.test(telefono);
}

function mostrarError(campo, mensaje) {
    const errorEl = document.getElementById(`error-${campo}`);
    const input = document.getElementById(`input-${campo}`);
    if (errorEl) {
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = mensaje;
    }
}

function limpiarErrores() {
    ["nombre", "email", "telefono"].forEach(campo => {
        const errorEl = document.getElementById(`error-${campo}`);
        const input = document.getElementById(`input-${campo}`);
        if (errorEl) {
            input.removeAttribute('aria-invalid');
            errorEl.textContent = ""
        };
    });
}

// ─── Submit ────────────────────────────────────────────────────────
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Limpiar estado previo
    limpiarErrores();
    feedbackMsg.className = "status-msg";
    feedbackMsg.textContent = "";

    const formData = {
        nombre: form.nombre.value.trim(),
        email: form.email.value.replace(/\s/g, ""),
        telefono: form.telefono.value.trim(),
    };

    // ── Validaciones ──────────────────────────────────────────────
    let hayErrores = false;

    if (!validarNombre(formData.nombre)) {
        mostrarError("nombre", "Error: Ingresá un nombre valido.");
        hayErrores = true;
    }

    if (!validarEmail(formData.email)) {
        mostrarError("email", "Error: Ingresá un email válido.");
        hayErrores = true;
    }

    if (!validarTelefono(formData.telefono)) {
        mostrarError("telefono", "Error: Ingresá un numero valido.");
        hayErrores = true;
    }

    if (hayErrores) return; //Corta acá si hay errores, no envía nada

    // ── Envío a tu script PHP ─────────────────────────────────────
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Enviando...";

    try {
        const response = await fetch("phpfiles/guardar.php", {
            method: "POST",
            body: new URLSearchParams(formData)
        });

        // PHP siempre responde JSON, lo parseamos
        const data = await response.json();

        if (data.ok) {
            feedbackMsg.classList.add("success");
            feedbackMsg.textContent = data.mensaje; // "¡Gracias por registrarte!"
            form.reset();
        } else {
            // PHP devolvió ok:false → mostramos el error correspondiente
            feedbackMsg.classList.add("error");
            feedbackMsg.textContent = data.mensaje;
        }

        setInterval(function () {
            feedbackMsg.textContent = ""
        }, 4000);

    } catch (error) {
        // Solo entra acá si hay falla de red (sin internet, servidor caído, etc.)
        feedbackMsg.classList.add("error");
        feedbackMsg.textContent = "No se pudo conectar con el servidor. Revisá tu conexión.";
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Registrarme ahora";
    }
});


// -------------- Seccion preguntas --------------

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const currentItem = button.parentElement;

        const isActive = currentItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        if (!isActive) {
            currentItem.classList.add('active');
        }
    });
});

