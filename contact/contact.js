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

function typeWriter(elementId, texts) {

    const element = document.getElementById(elementId);

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function animate() {

        const currentText = texts[textIndex];

        if (!deleting) {

            element.textContent =
                currentText.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentText.length) {

                deleting = true;

                setTimeout(animate, 2000);
                return;
            }

        } else {

            element.textContent =
                currentText.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        setTimeout(
            animate,
            deleting ? 50 : 100
        );
    }

    animate();
}


typeWriter("contactText", [
    "estemos en contacto :)",
    "連絡を取り合いましょう :)",
    "restons en contact :)",
    "لنبقَ على تواصل :)",
    "let's keep in touch :)"
]);

typeWriter("socialText", [
    "mis redes sociales",
    "私のソーシャルメディア",
    "mes réseaux sociaux",
    "حساباتي",
    "my social media"
]);