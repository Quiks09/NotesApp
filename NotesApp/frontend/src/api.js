import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export async function getActiveNotes() {
  const res = await axios.get(`${API_BASE_URL}/notes/active`);
  return res.data;
}

export async function getArchivedNotes() {
  const res = await axios.get(`${API_BASE_URL}/notes/archived`);
  return res.data;
}

export async function getNoteById(id) {
  const res = await axios.get(`${API_BASE_URL}/notes/${id}`);
  return res.data;
}

export async function getTags() {
  const res = await axios.get(`${API_BASE_URL}/tags`);
  return res.data;
}

export async function createNote(data) {
  const res = await axios.post(`${API_BASE_URL}/notes`, data);
  return res.data;
}

export async function updateNote(id, data) {
  const res = await axios.put(`${API_BASE_URL}/notes/${id}`, data);
  return res.data;
}

export async function toggleArchive(id) {
  const res = await axios.patch(`${API_BASE_URL}/notes/${id}/archive`);
  return res.data;
}

export async function deleteNote(id) {
  const res = await axios.delete(`${API_BASE_URL}/notes/${id}`);
  return res.data;
}

export async function getNotesByTag(tagName) {
  const res = await axios.get(`${API_BASE_URL}/notes?tag=${tagName}`);
  return res.data;
}

