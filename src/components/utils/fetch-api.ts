export async function fetchDataFromAPI(endpoint: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar dados de ${endpoint}:`, error);
    throw error;
  }
}