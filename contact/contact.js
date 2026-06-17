const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

console.log("contact.js cargado");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("submit detectado");

  status.textContent = "enviando...";
  status.className = "";

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      status.textContent = "✓ mensaje enviado correctamente";
      status.className = "success";
      form.reset();
    } else {
      status.textContent = "✗ ocurrió un error al enviar";
      status.className = "error";
    }
  } catch (error) {
    status.textContent = "✗ no se pudo conectar con el servidor";
    status.className = "error";
  }
});