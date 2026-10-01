
// ===== Botón volver =====

const btnVolver = document.getElementById("btn-volver");

if (btnVolver) {
    btnVolver.addEventListener("click", () => {
        window.history.back();
        console.log("Botón volver presionado");
    });
}

// ===== Formulario de leads =====
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

function validarWhatsapp(whatsapp) {
    const regex = /^[\d\s+()-]+$/; // números, espacios y separadores comunes (+, -, paréntesis)
    return regex.test(whatsapp);
}

function mostrarError(campo, mensaje) {
    const errorEl = document.getElementById(`error-${campo}`);
    const input = document.getElementById(`input-${campo}`);
    if (errorEl) {
        input.setAttribute("aria-invalid", "true");
        errorEl.textContent = mensaje;
    }
}

function limpiarErrores() {
    ["nombre", "email", "whatsapp"].forEach((campo) => {
        const errorEl = document.getElementById(`error-${campo}`);
        const input = document.getElementById(`input-${campo}`);
        if (errorEl) {
            input.removeAttribute("aria-invalid");
            errorEl.textContent = "";
        }
    });
}

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Limpiar estado previo
        limpiarErrores();
        feedbackMsg.className = "status-msg";
        feedbackMsg.textContent = "";

        const formData = {
            nombre: form.nombre.value.trim(),
            email: form.email.value.replace(/\s/g, ""),
            whatsapp: form.whatsapp.value.trim(),
            landingId: form.landingId.value,
        };

        // ── Validaciones ──────────────────────────────────────────
        let hayErrores = false;

        if (!formData.nombre || !validarNombre(formData.nombre)) {
            mostrarError("nombre", "Ingresá un nombre válido.");
            hayErrores = true;
        }

        if (!validarEmail(formData.email)) {
            mostrarError("email", "Ingresá un email válido.");
            hayErrores = true;
        }

        if (!formData.whatsapp || !validarWhatsapp(formData.whatsapp)) {
            mostrarError("whatsapp", "Ingresá un número de WhatsApp válido.");
            hayErrores = true;
        }

        if (hayErrores) return; // Corta acá si hay errores, no envía nada

        // ── Envío a tu script PHP ───────────────────────────────────
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Enviando...";

        try {
            const response = await fetch("phpfiles/guardar.php", {
                method: "POST",
                body: new URLSearchParams(formData),
            });

            // PHP siempre responde JSON, lo parseamos
            const data = await response.json();

            if (data.ok) {
                feedbackMsg.classList.add("success");
                feedbackMsg.textContent = data.mensaje; // ej: "¡Gracias por registrarte!"
                form.reset();
            } else {
                // PHP devolvió ok:false → mostramos el error correspondiente
                feedbackMsg.classList.add("error");
                feedbackMsg.textContent = data.mensaje;
            }

            setTimeout(function () {
                feedbackMsg.textContent = "";
            }, 6000);
        } catch (error) {
            // Solo entra acá si hay falla de red (sin internet, servidor caído, etc.)
            feedbackMsg.classList.add("error");
            feedbackMsg.textContent = "No se pudo conectar con el servidor. Revisá tu conexión.";
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = "Registrarme";
        }
    });
}

// ===== Cuenta regresiva de la oferta =====
// Editá esta fecha/hora según cuándo termina la promo (formato: año-mes-díaTHH:mm:ss)
const COUNTDOWN_TARGET = new Date("2026-10-03T23:59:59");

function actualizarCountdown() {
    const horasEl = document.getElementById("timer-horas");
    const minEl = document.getElementById("timer-min");
    const segEl = document.getElementById("timer-seg");

    if (!horasEl || !minEl || !segEl) return;

    const ahora = new Date();
    let diferencia = COUNTDOWN_TARGET - ahora;

    if (diferencia <= 0) {
        horasEl.textContent = "00";
        minEl.textContent = "00";
        segEl.textContent = "00";
        clearInterval(countdownInterval);
        return;
    }

    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    horasEl.textContent = String(horas).padStart(2, "0");
    minEl.textContent = String(minutos).padStart(2, "0");
    segEl.textContent = String(segundos).padStart(2, "0");
}

actualizarCountdown();
const countdownInterval = setInterval(actualizarCountdown, 1000);

// ===== Acordeón de preguntas frecuentes =====

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

// ===== Boton menu mobile =====

const btnMenu = document.querySelector('.lucide-menu');
let openMenu = false;

function toggleMenu (){
    if(openMenu){
        openMenu = false
    } else {
        openMenu = true
    }
}

btnMenu.addEventListener("click", toggleMenu);
document.addEventListener("click", (e) => {
    const navBar = document.querySelector('.nav-mobile');
    if(!openMenu){
        navBar.classList.remove("closeNavBar")
        navBar.classList.add("openNavBar")
    } else {
        navBar.classList.add("closeNavBar")
        navBar.classList.remove("openNavBar")
    }
});

document.querySelectorAll('.nav-mobile a').forEach(enlace => {
    enlace.addEventListener('click', () => {
        openMenu = false;
        
    });
});


