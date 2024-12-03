<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenido principal -->
    <div class="flex-grow flex items-center justify-center p-4">
      <div class="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Editar Perfil</h2>
        <form @submit.prevent="handleEdit">
          <div class="mb-4">
            <label for="nombre" class="block text-sm font-medium text-gray-700"
              >Nombre</label
            >
            <input
              type="text"
              id="nombre"
              v-model="formData.nombre"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="telefono"
              class="block text-sm font-medium text-gray-700"
              >Teléfono</label
            >
            <input
              type="tel"
              id="telefono"
              v-model="formData.telefono"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div class="mb-4">
            <label for="correo" class="block text-sm font-medium text-gray-700"
              >Correo</label
            >
            <input
              type="email"
              id="correo"
              v-model="formData.correo"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";
import { updateItem } from "@/apiHandler"; // Método PUT para actualizar

export default {
  components: { Navbar, Footer },
  data() {
    return {
      formData: {
        nombre: "",
        telefono: "",
        correo: "",
      },
    };
  },
  computed: {
    // Usa Vuex para obtener los datos del usuario
    ...mapGetters(["obtenerUsuario"]),
  },
  created() {
    // Precargar datos del usuario
    this.formData = { ...this.obtenerUsuario };
  },
  methods: {
    async handleEdit() {
      try {
        // Llamada a la API para actualizar los datos
        const response = await updateItem(
          "user",
          this.formData.id,
          this.formData
        );

        if (response.ESTADO === "CORRECTO") {
          alert("Perfil actualizado exitosamente.");
          this.$store.commit("setUsuario", this.formData); // Actualizar Vuex
          this.$router.push("/mi-perfil"); // Redirigir
        } else {
          alert("Hubo un error al actualizar los datos.");
        }
      } catch (error) {
        console.error("Error al actualizar perfil:", error);
        alert("No se pudo actualizar el perfil. Inténtalo más tarde.");
      }
    },
  },
};
</script>
