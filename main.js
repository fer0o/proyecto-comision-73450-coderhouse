// main.js

// imports
import { presionInfo } from "./utils/presionInfo/presionMockData.js";

document.addEventListener("DOMContentLoaded", () => {
  const vistas = {
    menu: document.getElementById("vistaMenu"),
    medicion: document.getElementById("vistaMedicion"),
    registro: document.getElementById("vistaRegistro"),
    ayuda: document.getElementById("vistaAyuda"),
    presion: document.getElementById("vistaPresionArterial"),
    frecuencia: document.getElementById("vistaFrecuenciaCardiaca"),
  };

  const mostrarVista = (vistaSeleccionada) => {
    for (let vista in vistas) {
      vistas[vista].classList.add("hidden");
    }
    vistas[vistaSeleccionada].classList.remove("hidden");
  };

  // Navegación entre vistas
  document.getElementById("btnMedicion").addEventListener("click", () => mostrarVista("medicion"));
  document.getElementById("btnRegistro").addEventListener("click", () => mostrarVista("registro"));
  document.getElementById("btnAyuda").addEventListener("click", () => mostrarVista("ayuda"));
  document.getElementById("btnVolverMenuDesdeMedicion").addEventListener("click", () => mostrarVista("menu"));
  document.getElementById("btnVolverMenuDesdeRegistro").addEventListener("click", () => mostrarVista("menu"));
  document.getElementById("btnVolverMenuDesdeAyuda").addEventListener("click", () => mostrarVista("menu"));
  document.getElementById("btnVolverDesdePresion").addEventListener("click", () => mostrarVista("medicion"));

  // Navegación de botones en medición
  const btnPresionArterial = document.getElementById("btnPresionArterial");
  const btnRitmoCardiaco = document.getElementById("btnRitmoCardiaco");
// Cargamos la información de presión al mostrar la vista
  if (btnPresionArterial) {
    btnPresionArterial.addEventListener("click", () => {
      mostrarVista("presion");
      cargarInformacionPresion(); 
    });
  }

  if (btnRitmoCardiaco) {
    btnRitmoCardiaco.addEventListener("click", () => {
      mostrarVista("frecuencia");
      console.log("Ritmo Cardíaco seleccionado");
    });
  }

  // Capturamos los datos del formulario de presión arterial
  const formPresionArterial = document.getElementById("formPresionArterial");
  if (formPresionArterial) {
    formPresionArterial.addEventListener("submit", (event) => {
      event.preventDefault();
      calcularPresion();
    });
  }

  // ✅ Función para calcular la presión arterial
  function calcularPresion() {
    const inputSistolica = document.getElementById("inputSistolica").value;
    const inputDiastolica = document.getElementById("inputDiastolica").value;
    const inputFecha = document.getElementById("inputFecha").value;

    if (!inputDiastolica || !inputSistolica || !inputFecha) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    const systolic = parseInt(inputSistolica);
    const diastolic = parseInt(inputDiastolica);
    const fechaRegistro = new Date(inputFecha);
    const fechaActual = new Date();
    //validaciones 
    if ( systolic <= 0 || diastolic <= 0){
      console.log("Los valores de presión deben ser mayores a 0");
      return Swal.fire("Error", "Los valores de presión deben ser mayores a 0.", "error")
    }
    if(systolic < 40 || systolic > 250){
      console.log("Los valores de presión sistólica son inválidos");
      return Swal.fire("Error", "La presión sistólica debe estar entre 40 y 250.", "error");
    }
    if(diastolic < 30 || diastolic > 150){
      console.log("Los valores de presión diastólica son inválidos");
      return Swal.fire("Error", "La presión diastólica debe estar entre 30 y 150.", "error");
    }
    if (fechaRegistro > fechaActual) {
      console.log("La fecha no puede ser futura");
      return Swal.fire("Error", "La fecha no puede estar en el futuro.", "error");
    }
    // Validamos
    const status = getStatus({ systolic, diastolic });
    // Mostramos el resultado
    mostrarResultado(status);
  }

  // ✅ Función para obtener el estado de la presión arterial
  function getStatus({ systolic, diastolic }) {
    if (systolic < 60 || diastolic < 60) {
      return "Low";
    } else if ((systolic >= 90 && systolic <= 120) || (diastolic >= 60 && diastolic <= 80)) {
      return "Normal";
    } else if ((systolic >= 121 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
      return "Risk";
    } else if (systolic >= 140 || diastolic >= 90) {
      return "High";
    } else {
      return "Invalid";
    }
  }

  // ✅ Función para mostrar el resultado
  function mostrarResultado(status) {
    switch (status) {
      case "Low":
        Swal.fire("Nivel de Presión Baja", "Recomendable ver a un médico.", "warning");
        break;
      case "Normal":
        Swal.fire("Nivel de Presión Normal", "Sigue cuidándote.", "success");
        break;
      case "Risk":
        Swal.fire("Presión en Riesgo", "Sugerencia visitar a un médico.", "warning");
        break;
      case "High":
        Swal.fire("Niveles altos", "Visitar a tu médico lo antes posible.", "error");
        break;
      default:
        Swal.fire("Error", "Datos inválidos, revisa tu medición.", "error");
        break;
    }
  }
});

// ✅ Función flecha para mostrar la información de la presión arterial
const cargarInformacionPresion = () => {
  const container = document.getElementById("presionInfoContainer");
  
  // Verificamos si existe el contenedor
  if (container) {
    container.innerHTML = `
      <div >
        <p><b>${presionInfo.sistolica.titulo}:</b> ${presionInfo.sistolica.descripcion}</p>
        <p><b>${presionInfo.diastolica.titulo}:</b> ${presionInfo.diastolica.descripcion}</p>
      </div>
    `;
  }
};