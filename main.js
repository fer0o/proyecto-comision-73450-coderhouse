// main.js

////////datos de presionModkData////////
const presionInfo = {
  sistolica: {
    titulo: "Presión arterial Sistolica",
    descripcion:
      "Se refiere a la presión de la sangre en la arteria cuando se contrae el corazón. Es la cifra superior (y más alta) en una medición de la presión arterial.",
  },
  diastolica: {
    titulo: "Presión arterial Diastolica",
    descripcion:
      "Se refiere a la presión de la sangre en la arteria cuando el corazón se relaja entre latidos. Es la cifra inferior (y más baja) en una medición de la presión arterial.",
  },
};

const rangosPresion = [
  {
    nombre: "Presión Baja (Hipotensión)",
    sistolica: "sistolica menor que 60",
    diastolica: "diastolica menor que 60",
    color: "bg-green-500",
  },
  {
    nombre: "Presión Normal",
    sistolica: "sistolica entre 90 y 120",
    diastolica: "diastolica entre 61 y 80",
    color: "bg-blue-600",
  },
  {
    nombre: "Presión en Riesgo (Prehipertensión)",
    sistolica: "sistolica entre 121 y 139",
    diastolica: "diastolica entre 81 y 89",
    color: "bg-orange-400",
  },
  {
    nombre: "Presión Alta (Hipertensión)",
    sistolica: "sistolica mayores a 140",
    diastolica: "diastolica mayores a 90",
    color: "bg-red-600",
  },
];
//////////////////////////////////////////////

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
  //Navegacion en historial de registros
  const btnHistorialPresionArterial = document.getElementById(
    "btnHistorialPresionArterial"
  );
  const btnHistorialRitmoCardiaco = document.getElementById(
    "btnHistorialRitmoCardiaco"
  );
  // Cargamos la información del contenedor y ocultamos la informacion segun lo que se seleccione
  const contenedorPresion = document.getElementById(
    "contenedorPresionArterial"
  );
  const contenedorFrecuencia = document.getElementById(
    "contenedorFrecuenciaCardiaca"
  );

  if (
    btnHistorialPresionArterial &&
    contenedorPresion &&
    contenedorFrecuencia
  ) {
    btnHistorialPresionArterial.addEventListener("click", () => {
      contenedorFrecuencia.classList.add("hidden");
      contenedorPresion.classList.remove("hidden");
      mostrarHistorialPresion();
    });
  }
  if (btnHistorialRitmoCardiaco && contenedorPresion && contenedorFrecuencia) {
    btnHistorialRitmoCardiaco.addEventListener("click", () => {
      contenedorPresion.classList.add("hidden");
      contenedorFrecuencia.classList.remove("hidden");
      mostrarHistorialFrecuencia();
    });
  }
////////////////////////////presion arterial////////////////////////////////////
// Función para mostrar el historial de presión arterial
  const mostrarHistorialPresion = () => {
    const contenedor = document.getElementById("contenedorPresionArterial");
    contenedor.innerHTML = "";

    const registros =
      JSON.parse(localStorage.getItem("registrosPresion")) || [];

    if (registros.length === 0) {
      contenedor.innerHTML = `
      <div class = "flex justify-center items-center h-full">
        <p class='text-gray-600 text-lg font-bold'>No hay registros de presion arterial.</p>
      </div>`;
      return;
    }
    registros.forEach((registro) => {
      const {id, systolic, diastolic, fecha } = registro;
      const estado = getStatus({ systolic, diastolic });

      const card = document.createElement("div");
      card.className =
        "bg-white shadow-md p-4 rounded-sm border-l-8 shadow-sm shadow-black " +
        getColorFrecuencia(estado);

      //nueva card para mostrar los datos
      card.innerHTML = `
  <div class="flex flex-col space-y-4">
    <div>
      <p class="text-sm text-gray-600 mb-1">Fecha: <strong>${fecha}</strong></p>
      <p class="text-md font-semibold">Sistólica: ${systolic} mmHg</p>
      <p class="text-md font-semibold">Diastólica: ${diastolic} mmHg</p>
      <p class="mt-1 text-sm text-gray-700"><strong>Estado:</strong> ${estado}</p>
    </div>
    <div class="flex flex-row justify-center gap-2 ">
      <button class="btn-editar bg-yellow-400 text-white px-4 py-2 rounded text-sm" data-id="${id}">Editar</button>
      <button class="btn-eliminar bg-red-500 text-white px-4 py-2 rounded text-sm" data-id="${id}">Eliminar</button>
    </div>
  </div>
`;

      contenedor.appendChild(card);
    });
  };

  // colores para detectar el estado de la presión arterial en la card
  function getColorFrecuencia(estado) {
    switch (estado) {
      case "Low":
        return "border-blue-400";
      case "Normal":
        return "border-green-500";
      case "Risk":
        return "border-orange-400";
      case "High":
        return "border-red-600";
      default:
        return "border-gray-300";
    }
  }
  // Función para editar un registro de presión arterial y eliminar el registro
document
  .getElementById("contenedorPresionArterial")
  .addEventListener("click", function (e) {
    const id = e.target.dataset.id;

    if (e.target.classList.contains("btn-eliminar")) {
      eliminarRegistroPresion(id);
    }

    if (e.target.classList.contains("btn-editar")) {
      editarRegistroPresion(id, e.target.closest("div.shadow-md"));
    }

    if (e.target.classList.contains("btn-guardar-edicion")) {
      guardarEdicionPresion(id, e.target.closest("div.shadow-md"));
    }

    if (e.target.classList.contains("btn-cancelar-edicion")) {
      mostrarHistorialPresion();
    }
  });
function editarRegistroPresion(id, card) {
  const registros = JSON.parse(localStorage.getItem("registrosPresion")) || [];
  const registro = registros.find((r) => r.id === id);

  if (!registro) return;

  const { systolic, diastolic, fecha } = registro;

  // Reemplazar el contenido de la card por inputs editables
  card.innerHTML = `
    <div class="flex flex-col space-y-4">
      <div>
        <label class="block text-sm text-gray-700 mb-1">Fecha:</label>
        <input type="date" class="w-full border rounded px-2 py-1 text-sm" value="${fecha}" id="editFecha">

        <label class="block text-sm text-gray-700 mt-2 mb-1">Sistólica:</label>
        <input type="number" class="w-full border rounded px-2 py-1 text-sm" value="${systolic}" id="editSistolica">

        <label class="block text-sm text-gray-700 mt-2 mb-1">Diastólica:</label>
        <input type="number" class="w-full border rounded px-2 py-1 text-sm" value="${diastolic}" id="editDiastolica">
      </div>

      <div class="flex flex-row justify-center gap-2">
        <button class="btn-guardar-edicion bg-green-500 text-white px-4 py-2 rounded text-sm" data-id="${id}">Guardar</button>
        <button class="btn-cancelar-edicion bg-gray-400 text-white px-4 py-2 rounded text-sm">Cancelar</button>
      </div>
    </div>
  `;
}

function guardarEdicionPresion(id, card) {
const inputSistolica = card.querySelector("#editSistolica").value;
const inputDiastolica = card.querySelector("#editDiastolica").value;
const inputFecha = card.querySelector("#editFecha").value;


  if (!inputSistolica || !inputDiastolica || !inputFecha) {
    return Swal.fire("Error", "Todos los campos son obligatorios.", "error");
  }

  const systolic = parseInt(inputSistolica);
  const diastolic = parseInt(inputDiastolica);
  const fechaRegistro = new Date(inputFecha);
  const fechaActual = new Date();
  const fechaMinima = new Date("2000-01-01");

  if (isNaN(systolic) || isNaN(diastolic)) {
    return Swal.fire("Error", "Los valores deben ser numéricos.", "error");
  }
  if (systolic < 40 || systolic > 250) {
    return Swal.fire("Error", "Sistólica fuera de rango (40-250).", "error");
  }
  if (diastolic < 30 || diastolic > 150) {
    return Swal.fire("Error", "Diastólica fuera de rango (30-150).", "error");
  }
  if (fechaRegistro > fechaActual) {
    return Swal.fire("Error", "La fecha no puede estar en el futuro.", "error");
  }
  if (fechaRegistro < fechaMinima) {
    return Swal.fire(
      "Error",
      "La fecha debe ser posterior al 1 de enero de 2000.",
      "error"
    );
  }

  // ✅ Reemplazar en localStorage
  const registros =
    JSON.parse(localStorage.getItem("registrosPresion")) || [];

  const nuevosRegistros = registros.map((registro) =>
    registro.id === id
      ? { ...registro, systolic, diastolic, fecha: inputFecha }
      : registro
  );

  localStorage.setItem("registrosPresion", JSON.stringify(nuevosRegistros));

  Swal.fire("Actualizado", "El registro fue editado exitosamente.", "success");
  mostrarHistorialPresion(); // Recargar vista
}


  

function eliminarRegistroPresion(id) {
  const registros = JSON.parse(localStorage.getItem("registrosPresion")) || [];

  const nuevosRegistros = registros.filter((registro) => registro.id !== id);

  Swal.fire({
    title: "¿Estás seguro?",
    text: "Este registro será eliminado permanentemente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e3342f",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("registrosPresion", JSON.stringify(nuevosRegistros));
      mostrarHistorialPresion();
      Swal.fire("Eliminado", "El registro ha sido eliminado.", "success");
    }
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
    const fechaMinima = new Date("2000-01-01");
    if (fechaRegistro < fechaMinima) {
      return Swal.fire(
        "Error",
        "La fecha debe ser posterior al 1 de enero de 2000.",
        "error"
      );
    }

    const status = getStatus({ systolic, diastolic });

    // Mostrar el resultado
    mostrarResultado(status);

    // Guardar en localStorage
    const nuevoRegistro = {
      id:crypto.randomUUID(),
      systolic,
      diastolic,
      fecha: inputFecha,
    };

    const registrosPresion =
      JSON.parse(localStorage.getItem("registrosPresion")) || [];
    registrosPresion.push(nuevoRegistro);
    localStorage.setItem("registrosPresion", JSON.stringify(registrosPresion));
  }

   // Capturamos los datos del formulario de presión arterial
  const formPresionArterial = document.getElementById("formPresionArterial");
  if (formPresionArterial) {
    formPresionArterial.addEventListener("submit", (event) => {
      event.preventDefault();
      calcularPresion();
    });
  }

  // ✅ Función para obtener el estado de la presión arterial
  function getStatus({ systolic, diastolic }) {
    const esBaja = systolic < 60 || diastolic < 60;
    const esNormal =
      (systolic >= 90 && systolic <= 120) ||
      (diastolic >= 60 && diastolic <= 80);
    const esRiesgo =
      (systolic >= 121 && systolic <= 139) ||
      (diastolic >= 80 && diastolic <= 89);
    const esAlta = systolic >= 140 || diastolic >= 90;

    if (esBaja) return "Low";
    if (esNormal) return "Normal";
    if (esRiesgo) return "Risk";
    if (esAlta) return "High";
    return "Invalid";
  }
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
    container.innerHTML += `
    <div class="flex flex-row items-start gap-4">
      <div class="w-12 h-12 ${rango.color}"></div>
      <div class="text-sm text-gray-700">
        <p class="font-bold">${rango.nombre}</p>
        <p>sistólica: ${rango.sistolica}</p>
        <p>diastólica: ${rango.diastolica}</p>
      </div>
    </div>
  `;
  });
};
  /////////////////////////////////////Frecuencia cardiaca////////////////////////////////////
  // Función para mostrar el historial de frecuencia cardiaca
  const mostrarHistorialFrecuencia = () => {
    const contenedor = document.getElementById("contenedorFrecuenciaCardiaca");
    contenedor.innerHTML = "";

    const registros =
      JSON.parse(localStorage.getItem("registrosFrecuencia")) || [];

    if (registros.length === 0) {
      contenedor.innerHTML = `
      <div class = "flex justify-center items-center h-full">
        <p class='text-gray-600 text-lg font-bold'>No hay registros de frecuencia cardiaca.</p>
      </div>
      `;
      return;
    }
    registros.forEach((registro) => {
      const { id, frecuencia, fecha } = registro;
      const estado = getEstadoFrecuencia(frecuencia);

      const card = document.createElement("div");
      card.className =
        "bg-white shadow-md p-4 rounded-md border-l-8 " +
        getColorPresion(estado);
      card.innerHTML = `
        <div class="flex flex-col space-y-4">
    <div>
      <p class="text-sm text-gray-600 mb-1">Fecha: <strong>${fecha}</strong></p>
      <p class="text-md font-semibold">Frecuencia: ${frecuencia} lpm</p>
      <p class="mt-2 text-sm text-gray-700"><strong>Estado:</strong> ${estado}</p>
    </div>
    <div class="flex flex-row justify-center gap-2 ">
      <button class="btn-editar bg-yellow-400 text-white px-4 py-2 rounded text-sm" data-fecha="${id}">Editar</button>
      <button class="btn-eliminar bg-red-500 text-white px-4 py-2 rounded text-sm" data-id="${id}">Eliminar</button>
    </div>
  </div>
    `;
      contenedor.appendChild(card);
    });
  };
  //utilidad para determinar el estado de la frecuencia cardiaca
  function getEstadoFrecuencia(frecuencia) {
    if (frecuencia < 60) {
      return "Frecuencia Baja";
    } else if (frecuencia >= 60 && frecuencia <= 100) {
      return "Frecuencia Normal";
    } else if (frecuencia > 100 && frecuencia <= 120) {
      return "Frecuencia Alta";
    } else {
      return "Frecuencia Muy Alta";
    }
  }
  // colores para el estado de la frecuencia cardiaca
  function getColorPresion(estado) {
    switch (estado) {
      case "Frecuencia Baja":
        return "border-blue-500";
      case "Frecuencia Normal":
        return "border-green-500";
      case "Frecuencia Alta":
        return "border-orange-400";
      case "Frecuencia Muy Alta":
        return "border-red-600";
      default:
        return "border-gray-300";
    }
  }
document
  .getElementById("contenedorFrecuenciaCardiaca")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = e.target.dataset.id;
      eliminarRegistroFrecuencia(id);
    }
  });


  function eliminarRegistroFrecuencia(id) {
  const registros = JSON.parse(localStorage.getItem("registrosFrecuencia")) || [];

  const nuevosRegistros = registros.filter((registro) => registro.id !== id);

  Swal.fire({
    title: "¿Estás seguro?",
    text: "Este registro será eliminado permanentemente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e3342f",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("registrosFrecuencia", JSON.stringify(nuevosRegistros));
      mostrarHistorialFrecuencia();
      Swal.fire("Eliminado", "El registro ha sido eliminado.", "success");
    }
  });
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
    container.innerHTML += `
    <div class="flex flex-row items-start gap-4">
      <div class="w-12 h-12 ${rango.color}"></div>
      <div class="text-sm text-gray-700">
        <p class="font-bold">${rango.nombre}</p>
        <p>valor: ${rango.valor}</p>
      </div>
    </div>
  `;
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
    // Validación de fecha
    if (fechaRegistro > fechaActual) {
      return Swal.fire(
        "Error",
        "La fecha no puede estar en el futuro.",
        "error"
      );
    }
    const fechaMinima = new Date("2000-01-01");
    if (fechaRegistro < fechaMinima) {
      return Swal.fire(
        "Error",
        "La fecha debe ser posterior al 1 de enero de 2000.",
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

    // Guardar en localStorage frecuencia cardiaca
    const nuevoRegistro = {
      id: crypto.randomUUID(),
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

