<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar o Logo -->
    <div class="w-full bg-indigo-600 py-4 text-center text-white">
      <h1 class="text-3xl font-bold">GymFit</h1>
    </div>

    <!-- Formulario de Inicio de Sesión -->
    <div class="flex-grow flex items-center justify-center">
      <div class="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label
              for="usernameOrEmail"
              class="block text-sm font-medium text-gray-700"
              >Correo o Nombre de Usuario</label
            >
            <input
              type="text"
              id="usernameOrEmail"
              v-model="usernameOrEmail"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Contraseña</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Iniciar Sesión
          </button>
        </form>

        <!-- Mensaje de error -->
        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>

        <!-- Enlace para ir al registro -->
        <p class="mt-4 text-center">
          ¿No tienes una cuenta?
          <router-link
            to="/register"
            class="text-indigo-500 hover:text-indigo-700"
            >Regístrate</router-link
          >
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { getWithTwoParams } from "@/apiHandler";
import Footer from "@/components/Footer.vue";

export default {
  components: { Footer },
  data() {
    return {
      usernameOrEmail: "",
      password: "",
      error: null, // Para manejar errores
    };
  },
  methods: {
    async handleLogin() {
      // Limpiar espacios externos en los campos
      const trimmedUsernameOrEmail = this.usernameOrEmail?.trim();
      const trimmedPassword = this.password;

      if (!trimmedUsernameOrEmail || !trimmedPassword) {
        this.error = "Por favor, completa todos los campos.";
        return;
      }

      try {
        // Llama al método getWithTwoParams para validar al usuario
        const response = await getWithTwoParams(
          "user/login",
          trimmedUsernameOrEmail,
          trimmedPassword
        );

        if (response.estado === "error") {
          // Usuario no encontrado o credenciales incorrectas
          this.error = "Nombre de usuario o contraseña incorrectos.";
        } else {
          // Usuario encontrado: guardar en Vuex y redirigir
          this.$store.commit("setUsuario", response);
          this.$router.push("/mis-reservas");
        }
      } catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        this.error =
          "Ocurrió un problema al intentar iniciar sesión. Inténtalo de nuevo más tarde.";
      }
    },
  },
};
</script>

