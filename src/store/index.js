import { createStore } from "vuex";

export default createStore({
  state: {
    // Cargar usuario desde localStorage si existe
    usuario: JSON.parse(localStorage.getItem("usuario")) || null,
    clases: [
      {
        id: 1,
        nombre: "Yoga",
        descripcion: "Clase de relajación",
        horario: "08:00 - 09:00",
        cupo: 20,
        dia: "lunes",
      },
      {
        id: 2,
        nombre: "Crossfit",
        descripcion: "Entrenamiento intenso",
        horario: "18:00 - 19:00",
        cupo: 5,
        dia: "lunes",
      },
      {
        id: 3,
        nombre: "Pilates",
        descripcion: "Ejercicios de flexibilidad",
        horario: "10:00 - 11:00",
        cupo: 15,
        dia: "miercoles",
      },
      {
        id: 4,
        nombre: "Spinning",
        descripcion: "Clase de ciclismo indoor",
        horario: "19:00 - 20:00",
        cupo: 10,
        dia: "martes",
      },
      {
        id: 5,
        nombre: "Zumba",
        descripcion: "Bailoterapia",
        horario: "16:00 - 17:00",
        cupo: 25,
        dia: "lunes",
      },
      {
        id: 6,
        nombre: "Karaté",
        descripcion: "Clase de defensa personal",
        horario: "17:00 - 18:00",
        cupo: 12,
        dia: "viernes",
      },
      // Otras clases
    ],
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario;
      // Guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));
    },
    limpiarUsuario(state) {
      state.usuario = null;
      // Remover usuario de localStorage
      localStorage.removeItem("usuario");
    },
    actualizarClasesPorDia(state, clasesPorDia) {
      if (state.usuario) {
        state.usuario.clasesPorDia = clasesPorDia;
      }
    },
  },
  actions: {
    iniciarSesion({ commit }, usuario) {
      commit("setUsuario", usuario);
    },
    cerrarSesion({ commit }) {
      commit("limpiarUsuario");
    },
    actualizarClasesPorDia({ commit }, clasesPorDia) {
      commit("actualizarClasesPorDia", clasesPorDia);
    },
  },
  getters: {
    obtenerUsuario: (state) => state.usuario,
    obtenerClases: (state) => state.clases,
    clasesDelUsuario(state) {
      if (!state.usuario) return {};
      return state.usuario.clasesPorDia;
    },
    clasesDelDia: (state) => (dia) => {
      return state.clases.filter((clase) => clase.dia === dia);
    },
  },
});
