export const presionInfo = {
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

export const rangosPresion = [
  {
    nombre: "Presión Baja (Hipotensión)",
    sistolica: "sistolica menor que 60",
    diastolica: "diastolica menor que 60",
    color: "bg-green-500"
  },
  {
    nombre: "Presión Normal",
    sistolica: "sistolica entre 90 y 120",
    diastolica: "diastolica entre 61 y 80",
    color: "bg-blue-600"
  },
  {
    nombre: "Presión en Riesgo (Prehipertensión)",
    sistolica: "sistolica entre 121 y 139",
    diastolica: "diastolica entre 81 y 89",
    color: "bg-orange-400"
  },
  {
    nombre: "Presión Alta (Hipertensión)",
    sistolica: "sistolica mayores a 140",
    diastolica: "diastolica mayores a 90",
    color: "bg-red-600"
  }
];