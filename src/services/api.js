// src/services/api.js
const API_URL = 'http://localhost:3001';

// Función para autenticar usuario
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
  if (!response.ok) {
    throw new Error('Error en la red');
  }
  const users = await response.json();
  return users[0]; // Devuelve el primer usuario que coincida o undefined
};

// --- Funciones para suscripciones ---

export const getSubscriptions = async (userId) => {
  const response = await fetch(`${API_URL}/subscriptions?userId=${userId}`);
  if (!response.ok) throw new Error('No se pudieron obtener las suscripciones.');
  return await response.json();
};

export const addSubscription = async (subscription) => {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  });
  if (!response.ok) throw new Error('No se pudo agregar la suscripción.');
  return await response.json();
};

export const updateSubscription = async (id, data) => {
  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('No se pudo actualizar la suscripción.');
  return await response.json();
};

export const deleteSubscription = async (id) => {
  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('No se pudo eliminar la suscripción.');
  return await response.json();
};

export const checkUserExists = async (email) => {
  const response = await fetch(`${API_URL}/users?email=${email}`);
  if (!response.ok) throw new Error('Error de red al verificar el usuario.');
  const users = await response.json();
  return users.length > 0; // Devuelve true si el usuario existe, false si no
};

// Nueva función para registrar un nuevo usuario
export const registerUser = async (userData) => {
const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
});
  if (!response.ok) throw new Error('No se pudo registrar el usuario.');
  return await response.json();
};