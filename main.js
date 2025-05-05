document.addEventListener("DOMContentLoaded", () => {
  const vistas = {
    menu: document.getElementById("vistaMenu"),
    medicion: document.getElementById("vistaMedicion"),
    registro: document.getElementById("vistaRegistro"),
    ayuda: document.getElementById("vistaAyuda"),
    presion: document.getElementById("vistaPresionArterial"),
  };

  const mostrarVista = (vistaSeleccionada) => {
    for (let vista in vistas) {
      vistas[vista].classList.add("hidden");
    }
    vistas[vistaSeleccionada].classList.remove("hidden");
  };

  document
    .getElementById("btnMedicion")
    .addEventListener("click", () => mostrarVista("medicion"));
  document
    .getElementById("btnRegistro")
    .addEventListener("click", () => mostrarVista("registro"));
  document
    .getElementById("btnAyuda")
    .addEventListener("click", () => mostrarVista("ayuda"));

  document
    .getElementById("btnVolverMenuDesdeMedicion")
    .addEventListener("click", () => mostrarVista("menu"));
  document
    .getElementById("btnVolverMenuDesdeRegistro")
    .addEventListener("click", () => mostrarVista("menu"));
  document
    .getElementById("btnVolverMenuDesdeAyuda")
    .addEventListener("click", () => mostrarVista("menu"));

  const btnPresionArterial = document.getElementById("btnPresionArterial");
  const btnRitmoCardiaco = document.getElementById("btnRitmoCardiaco");

  if (btnPresionArterial) {
    btnPresionArterial.addEventListener("click", () => {
      mostrarVista("presion");
    });
  }

  if (btnRitmoCardiaco) {
    btnRitmoCardiaco.addEventListener("click", () => {
      console.log("Ritmo Cardíaco seleccionado");
    });
  }

  document
    .getElementById("btnVolverDesdePresion")
    .addEventListener("click", () => mostrarVista("medicion"));
});
