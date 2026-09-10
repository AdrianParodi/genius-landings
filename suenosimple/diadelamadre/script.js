// -------------- Formulario --------------

const form = document.getElementById("registro-form");
        const btnSubmit = document.getElementById("btn-submit");
        const feedbackMsg = document.getElementById("feedback-msg");

        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            feedbackMsg.className = "status-msg";
            feedbackMsg.textContent = "";
            btnSubmit.disabled = true;
            btnSubmit.textContent = "Enviando...";

            const formData = {
                nombre: form.nombre.value.trim(),
                email: form.email.value.trim(),
                telefono: form.telefono.value.trim(),
            };

            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                console.log("llegandoooo")

                feedbackMsg.classList.add("success");
                feedbackMsg.textContent = "¡Gracias por registrarte! Te enviamos las ofertas al correo.";
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
