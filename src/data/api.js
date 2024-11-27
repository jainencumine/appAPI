const API_URL = "http://localhost:5000/api";

export const obtenerCombos = async () => {
  try {
    const response = await fetch(`${API_URL}/combos`);
    if (!response.ok) {
      throw new Error("Error al obtener los combos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

