// -------------- Formulario --------------

const form = document.getElementById("registro-form");
const btnSubmit = document.getElementById("btn-submit");
const feedbackMsg = document.getElementById("feedback-msg");

// ─── Funciones de validación ───────────────────────────────────────
function validarNombre(nombre) {
    return nombre.trim().length > 0;
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
    if (errorEl) errorEl.textContent = mensaje;
}

function limpiarErrores() {
    ["nombre", "email", "telefono"].forEach(campo => {
        const errorEl = document.getElementById(`error-${campo}`);
        if (errorEl) errorEl.textContent = "";
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
        nombre:   form.nombre.value.trim(),
        email:    form.email.value.trim(),
        telefono: form.telefono.value.trim(),
    };

    // ── Validaciones ──────────────────────────────────────────────
    let hayErrores = false;

    if (!validarNombre(formData.nombre)) {
        mostrarError("nombre", "El nombre no puede estar vacío.");
        hayErrores = true;
    }

    if (!validarEmail(formData.email)) {
        mostrarError("email", "Ingresá un email válido (ej: usuario@mail.com).");
        hayErrores = true;
    }

    if (!validarTelefono(formData.telefono)) {
        mostrarError("telefono", "El teléfono solo puede contener números.");
        hayErrores = true;
    }

    if (hayErrores) return; // 🔑 Corta acá si hay errores, no envía nada

    // ── Envío a tu script PHP ─────────────────────────────────────
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Enviando...";

        try {
            const response = await fetch("phpfiles/guardar.php", {
            method: "POST",
            body: new URLSearchParams(formData) // Se comporta como un form HTML normal
        });

        if (!response.ok) throw new Error("Error del servidor");

        feedbackMsg.classList.add("success");
        feedbackMsg.textContent = "¡Gracias por registrarte!";
        form.reset();

    } catch (error) {
        feedbackMsg.classList.add("error");
        feedbackMsg.textContent = "Ocurrió un error al enviar el formulario. Intentalo de nuevo.";

    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Quiero ofertas";
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