document.addEventListener("DOMContentLoaded", () => {
    console.log("Página cargada");
  
    const btnMedicion = document.getElementById("btnMedicion");
    const btnRegistro = document.getElementById("btnRegistro");
    const btnAyuda = document.getElementById("btnAyuda");
  
    if (btnMedicion) {
      btnMedicion.addEventListener("click", () => {
        alert("Ir a Medición");
        console.log("Botón Medición clicado");
        // Aquí podrías ocultar la vista principal y mostrar otra
      });
    }
  
    if (btnRegistro) {
      btnRegistro.addEventListener("click", () => {
        alert("Ir a Registro");
        console.log("Botón Registro clicado");
      });
    }
  
    if (btnAyuda) {
      btnAyuda.addEventListener("click", () => {
        alert("Ir a Ayuda");
        console.log("Botón Ayuda clicado");
      });
    }
  });