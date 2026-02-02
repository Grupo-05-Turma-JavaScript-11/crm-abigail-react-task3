import axios from "axios";

export const api = axios.create({
  baseURL: "https://crm-backend-e4sa.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// GET lista
export const buscar = async <T>(url: string): Promise<T> => {
  const resposta = await api.get<T>(url);
  return resposta.data;
};

// GET por id
export const buscarPorId = async <T>(url: string): Promise<T> => {
  const resposta = await api.get<T>(url);
  return resposta.data;
};

// POST
export const cadastrar = async <T>(url: string, dados: T) => {
  const resposta = await api.post(url, dados);
  return resposta.data;
};

// PUT
export const atualizar = async <T>(url: string, dados: T) => {
  const resposta = await api.put(url, dados);
  return resposta.data;
};

// DELETE
export const deletar = async (url: string) => {
  await api.delete(url);
};
