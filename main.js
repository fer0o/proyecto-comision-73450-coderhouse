// main.js

// imports
import {
  presionInfo,
  rangosPresion,
} from "./utils/presionInfo/presionMockData.js";

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
  document
    .getElementById("btnVolverDesdeFrecuencia")
    .addEventListener("click", () => mostrarVista("medicion"));
  document
    .getElementById("btnVolverDesdePresion")
    .addEventListener("click", () => mostrarVista("medicion"));

  // Navegación de botones en medición
  const btnPresionArterial = document.getElementById("btnPresionArterial");
  const btnRitmoCardiaco = document.getElementById("btnRitmoCardiaco");
  // Cargamos la información de presión al mostrar la vista
  if (btnPresionArterial) {
    btnPresionArterial.addEventListener("click", () => {
      mostrarVista("presion");
      cargarInformacionPresion();
      renderRangosPresion();
    });
  }

  if (btnRitmoCardiaco) {
    btnRitmoCardiaco.addEventListener("click", () => {
      mostrarVista("frecuencia");
      console.log("Ritmo Cardíaco seleccionado");
      renderRangosFrecuencia();
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

    if (systolic <= 0 || diastolic <= 0) {
      return Swal.fire(
        "Error",
        "Los valores de presión deben ser mayores a 0.",
        "error"
      );
    }
    if (systolic <= 0 || systolic > 250) {
      return Swal.fire(
        "Error",
        "La presión sistólica debe estar entre 40 y 250.",
        "error"
      );
    }
    if (diastolic <= 0 || diastolic > 250) {
      return Swal.fire(
        "Error",
        "La presión diastólica debe estar entre 30 y 150.",
        "error"
      );
    }
    if (fechaRegistro > fechaActual) {
      return Swal.fire(
        "Error",
        "La fecha no puede estar en el futuro.",
        "error"
      );
    }

    const status = getStatus({ systolic, diastolic });

    // Mostrar el resultado
    mostrarResultado(status);

    // Guardar en localStorage
    const nuevoRegistro = {
      systolic,
      diastolic,
      fecha: inputFecha,
    };

    const registrosPresion =
      JSON.parse(localStorage.getItem("registrosPresion")) || [];
    registrosPresion.push(nuevoRegistro);
    localStorage.setItem("registrosPresion", JSON.stringify(registrosPresion));
  }

  // ✅ Función para obtener el estado de la presión arterial
  function getStatus({ systolic, diastolic }) {
    if (systolic < 60 || diastolic < 60) {
      return "Low";
    } else if (
      (systolic >= 90 && systolic <= 120) ||
      (diastolic >= 60 && diastolic <= 80)
    ) {
      return "Normal";
    } else if (
      (systolic >= 121 && systolic <= 139) ||
      (diastolic >= 80 && diastolic <= 89)
    ) {
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
        Swal.fire(
          "Nivel de Presión Baja",
          "Recomendable ver a un médico.",
          "warning"
        );
        break;
      case "Normal":
        Swal.fire("Nivel de Presión Normal", "Sigue cuidándote.", "success");
        break;
      case "Risk":
        Swal.fire(
          "Presión en Riesgo",
          "Sugerencia visitar a un médico.",
          "warning"
        );
        break;
      case "High":
        Swal.fire(
          "Niveles altos",
          "Visitar a tu médico lo antes posible.",
          "error"
        );
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
      <div>
        <p><b>${presionInfo.sistolica.titulo}:</b> ${presionInfo.sistolica.descripcion}</p>
        <p><b>${presionInfo.diastolica.titulo}:</b> ${presionInfo.diastolica.descripcion}</p>
      </div>
    `;
  }
};
//mostrar los datos de los rangos de presión arterial del presionMockData.js
const renderRangosPresion = () => {
  const container = document.getElementById("rangoPresionContainer");
  if (!container) return;

  container.innerHTML = "";

  rangosPresion.forEach((rango) => {
    const div = document.createElement("div");
    div.className = "flex flex-row items-start gap-4";

    const colorBox = document.createElement("div");
    colorBox.className = `w-12 h-12 ${rango.color}`;

    const textContainer = document.createElement("div");
    textContainer.className = "text-sm text-gray-700";

    const nombre = document.createElement("p");
    nombre.className = "font-bold";
    nombre.textContent = rango.nombre;

    const sistolica = document.createElement("p");
    sistolica.textContent = `sistolica ${rango.sistolica}`;

    const diastolica = document.createElement("p");
    diastolica.textContent = `diastolica ${rango.diastolica}`;

    textContainer.appendChild(nombre);
    textContainer.appendChild(sistolica);
    textContainer.appendChild(diastolica);

    div.appendChild(colorBox);
    div.appendChild(textContainer);
    container.appendChild(div);
  });
};
//////////Frecuencia cardiaca/////////////

// Datos locales de rangos de frecuencia cardiaca
const rangosFrecuencia = [
  {
    nombre: "Frecuencia Baja",
    valor: "< 60",
    color: "bg-blue-500",
  },
  {
    nombre: "Frecuencia Normal",
    valor: "60 - 100",
    color: "bg-green-500",
  },
  {
    nombre: "Frecuencia Alta",
    valor: "101 - 120",
    color: "bg-orange-400",
  },
  {
    nombre: "Frecuencia Muy Alta",
    valor: "> 120",
    color: "bg-red-600",
  },
];

const renderRangosFrecuencia = () => {
  const container = document.getElementById("rangoFrecuenciaContainer");
  if (!container) return;

  container.innerHTML = "";

  rangosFrecuencia.forEach((rango) => {
    const div = document.createElement("div");
    div.className = "flex flex-row items-start gap-4";

    const colorBox = document.createElement("div");
    colorBox.className = `w-12 h-12 ${rango.color}`;

    const textContainer = document.createElement("div");
    textContainer.className = "text-sm text-gray-700";

    const nombre = document.createElement("p");
    nombre.className = "font-bold";
    nombre.textContent = rango.nombre;

    const valor = document.createElement("p");
    valor.textContent = `valor: ${rango.valor}`;

    const descripcion = document.createElement("p");
    textContainer.appendChild(nombre);
    textContainer.appendChild(valor);

    div.appendChild(colorBox);
    div.appendChild(textContainer);
    container.appendChild(div);
  });
};
// Función para registrar frecuencia cardiaca
const formFrecuenciaCardiaca = document.getElementById(
  "formFrecuenciaCardiaca"
);

if (formFrecuenciaCardiaca) {
  formFrecuenciaCardiaca.addEventListener("submit", (e) => {
    e.preventDefault();

    const frecuencia = parseInt(
      document.getElementById("inputFrecuencia").value
    );
    const fecha = document.getElementById("inputFechaFrecuencia").value;
    const fechaActual = new Date();

    // Validaciones
    if (!frecuencia || !fecha) {
      return Swal.fire(
        "Error",
        "Por favor, completa todos los campos.",
        "error"
      );
    }
    if (isNaN(frecuencia) || frecuencia <= 0) {
      return Swal.fire(
        "Error",
        "La frecuencia debe ser un número válido.",
        "error"
      );
    }
    if (frecuencia < 40 || frecuencia > 200) {
      return Swal.fire(
        "Error",
        "Debe estar entre 40 y 200 latidos por minuto.",
        "error"
      );
    }
    const fechaRegistro = new Date(fecha);
    if (fechaRegistro > fechaActual) {
      return Swal.fire(
        "Error",
        "La fecha no puede estar en el futuro.",
        "error"
      );
    }

    // Análisis del estado
    if (frecuencia < 60) {
      Swal.fire(
        "Frecuencia Cardíaca Baja",
        "Recomendable ver a un médico.",
        "warning"
      );
    } else if (frecuencia <= 100) {
      Swal.fire("Frecuencia Cardíaca Normal", "Sigue cuidándote.", "success");
    } else if (frecuencia <= 120) {
      Swal.fire(
        "Frecuencia Cardíaca Alta",
        "Sugerencia visitar a un médico.",
        "warning"
      );
    } else {
      Swal.fire(
        "Frecuencia Cardíaca Muy Alta",
        "Visitar a tu médico lo antes posible.",
        "error"
      );
    }

    // Guardar en localStorage
const nuevoRegistro = {
  frecuencia,
  fecha,
};

const registrosFrecuencia =
  JSON.parse(localStorage.getItem("registrosFrecuencia")) || [];

registrosFrecuencia.push(nuevoRegistro);
localStorage.setItem(
  "registrosFrecuencia",
  JSON.stringify(registrosFrecuencia)
);
  });
}
