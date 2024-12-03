<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenido principal -->
    <div class="flex-grow flex flex-col items-center p-4">
      <!-- Información del usuario -->
      <div class="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Mi Perfil</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Nombre:</label>
          <p class="text-gray-800">{{ usuario?.nombre }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Teléfono:</label
          >
          <p class="text-gray-800">{{ usuario?.telefono }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Correo:</label>
          <p class="text-gray-800">{{ usuario?.correo }}</p>
        </div>

        <!-- Botones de acción -->
        <div class="mt-6 flex flex-col space-y-4">
          <button
            @click="editarDatos"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Modificar Datos
          </button>
          <button
            @click="restablecerContrasena"
            class="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Restablecer Contraseña
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: { Navbar, Footer },
  computed: {
    // Usa Vuex para obtener los datos del usuario
    ...mapGetters(["obtenerUsuario"]),
    usuario() {
      return this.obtenerUsuario;
    },
  },
  methods: {
    editarDatos() {
      // Redirige a una vista para editar datos
      this.$router.push("/editar-perfil");
    },
    restablecerContrasena() {
      // Lógica para restablecer la contraseña
      alert("Se enviará un enlace para restablecer tu contraseña a tu correo.");
    },
  },
};
</script>

<style scoped>
/* Agrega estilos adicionales si los necesitas */
</style>
