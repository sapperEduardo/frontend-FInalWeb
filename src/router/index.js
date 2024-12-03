import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import MisReservas from "../views/MisReservas.vue";
import ReservarClases from "@/views/ReservarClases.vue";
import MiPerfil from "@/views/MiPerfil.vue";
import EditarPerfil from "@/views/EditarPerfil.vue";

const routes = [
  {
    path: "/",
    redirect: "/login", // Redirige la ruta raíz a /login
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  { path: "/mis-reservas", name: "MisReservas", component: MisReservas },
  { path: "/mi-perfil", name: "MiPerfil", component: MiPerfil },
  { path: "/editar-perfil", name: "EditarPerfil", component: EditarPerfil },
  {
    path: "/reservar-clases",
    name: "ReservarClases",
    component: ReservarClases,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
