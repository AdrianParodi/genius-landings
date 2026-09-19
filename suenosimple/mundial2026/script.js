// ===== Acordeón de preguntas frecuentes =====
document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // Cierra los demás items (acordeón exclusivo)
        document.querySelectorAll(".faq-item").forEach((other) => {
            other.classList.remove("is-open");
            other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
            item.classList.add("is-open");
            question.setAttribute("aria-expanded", "true");
        }
    });
});

// ===== Validación simple del formulario de leads =====
const form = document.getElementById("registro-form");

if (form) {
    form.addEventListener("submit", (event) => {
        let hasError = false;

        const nombre = document.getElementById("input-nombre");
        const email = document.getElementById("input-email");
        const whatsapp = document.getElementById("input-whatsapp");

        const errorNombre = document.getElementById("error-nombre");
        const errorEmail = document.getElementById("error-email");
        const errorWhatsapp = document.getElementById("error-whatsapp");

        [errorNombre, errorEmail, errorWhatsapp].forEach((el) => (el.textContent = ""));

        if (!nombre.value.trim()) {
            errorNombre.textContent = "Ingresá tu nombre.";
            hasError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            errorEmail.textContent = "Ingresá un email válido.";
            hasError = true;
        }

        if (!whatsapp.value.trim()) {
            errorWhatsapp.textContent = "Ingresá tu número de WhatsApp.";
            hasError = true;
        }

        if (hasError) {
            event.preventDefault();
        }
    });
}

// ===== Cuenta regresiva de la oferta =====
// Editá esta fecha/hora según cuándo termina la promo (formato: año-mes-díaTHH:mm:ss)
const COUNTDOWN_TARGET = new Date("2026-10-01T23:59:59");

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

const btnVolver = document.getElementById("btn-volver");

if (btnVolver) {
    btnVolver.addEventListener("click", () => {
        window.history.back();
    });
}