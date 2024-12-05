<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar o Logo -->
    <div class="w-full bg-indigo-600 py-4 text-center text-white">
      <h1 class="text-3xl font-bold">GymFit</h1>
    </div>

    <!-- Formulario de Registro -->
    <div class="flex-grow flex items-center justify-center">
      <div class="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Registrarse</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Nombre</label
            >
            <input
              type="text"
              id="name"
              v-model="name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Correo</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700"
              >Teléfono (Opcional)</label
            >
            <input
              type="tel"
              id="phone"
              v-model="phone"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ej. +54 9 1234 567890"
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
            Registrarse
          </button>
        </form>
        <!-- Enlace para ir a login -->
        <p class="mt-4 text-center">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="text-indigo-500 hover:text-indigo-700"
            >Inicia sesión</router-link
          >
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { createItem } from "@/apiHandler"; // Importamos el método de apiHandler
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "", // Campo opcional
      password: "",
      error: "", // Para mensajes de error
    };
  },
  components: { Footer },
  methods: {
    async handleRegister() {
      // Validar campos requeridos
      if (!this.name || !this.email || !this.password) {
        this.error = "Por favor, completa todos los campos obligatorios.";
        return;
      }

      try {
        // Construir el objeto del usuario
        const newUser = {
          id: null,
          nombre: this.name?.trim(),
          correo: this.email,
          telefono: this.phone || "No especificado",
          contraseña: this.password,
        };

        // Usar el método `createItem` para enviar los datos
        const result = await createItem("user", newUser);

        if (result.ESTADO === "CORRECTO") {
          // Mostrar alerta de éxito
          alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
          // Redirigir al login
          this.$router.push("/login");
        } else {
          // Manejo de errores devueltos por la API
          this.error =
            "Ocurrió un error durante el registro. Intenta nuevamente.";
        }
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        this.error = "Ocurrió un problema al comunicarse con el servidor.";
      }
    },
  },
};
</script>

