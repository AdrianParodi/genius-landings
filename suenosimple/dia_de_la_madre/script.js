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

            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                // const formData = new FormData("registro-form");

                // const datos = Object.fromEntries(formData.entries());
                // datos.fecha_registro = new Date().toLocaleString();
                // const jsonString = JSON.stringify(datos, null, 2);
                // const blob = new Blob([jsonString], { type: "application/json" });
                // const url = URL.createObjectURL(blob);
                // const enlace = document.createElement("a");
                // enlace.href = url;
                // enlace.download = `datos_formulario_${Date.now()}.json`; // Nombre único usando el timestamp
                // enlace.click();
                // URL.revokeObjectURL(url);
                // formulario.reset(); 

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

setInterval(function() {
             location.reload();
         }, 3000);