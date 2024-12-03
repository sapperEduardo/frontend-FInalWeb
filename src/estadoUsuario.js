// src/estadoUsuario.js

const USUARIO_KEY = "usuario"; // Clave para almacenar el usuario en localStorage

// Estado inicial
export const estadoUsuario = {
  usuario: JSON.parse(localStorage.getItem(USUARIO_KEY)) || null, // Carga desde localStorage o deja como null
};

// Función para setear el usuario y guardar en localStorage
export function setUsuario(nuevoUsuario) {
  estadoUsuario.usuario = nuevoUsuario;
  localStorage.setItem(USUARIO_KEY, JSON.stringify(nuevoUsuario)); // Guarda en localStorage
}

// Función para obtener el usuario
export function obtenerUsuario() {
  return estadoUsuario.usuario;
}

// Función para cerrar sesión (eliminar del estado y localStorage)
export function cerrarSesion() {
  estadoUsuario.usuario = null;
  localStorage.removeItem(USUARIO_KEY); // Elimina del almacenamiento local
}
