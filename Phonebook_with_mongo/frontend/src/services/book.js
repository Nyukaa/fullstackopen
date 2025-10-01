// import axios from "axios";
// const baseUrl = "http://localhost:3001/persons";

import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    throw error.response.data.error; // ✅ бросаем сообщение от бэкенда
  }
};
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  deletePerson,
};
