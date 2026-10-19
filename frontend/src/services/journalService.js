import axios from "axios";

const API_URL =
  "https://six54259019-7153403-final-journals.onrender.com/api/journals";

export const fetchJournals = async (title = "", category = "") => {
  const params = {};
  if (title) params.title = title;
  if (category) params.category = category;

  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const fetchJournalById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createJournalAPI = async (journalData) => {
  const response = await axios.post(API_URL, journalData);
  return response.data;
};

export const updateJournalAPI = async (id, journalData) => {
  const response = await axios.put(`${API_URL}/${id}`, journalData);
  return response.data;
};

export const deleteJournalAPI = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
