<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <Navbar />

    <!-- Texto de bienvenida -->
    <div class="text-center py-6">
      <h1 v-if="usuario" class="text-2xl font-bold">
        ¡Hola, {{ usuario.nombre }}!
      </h1>
      <p class="text-lg text-gray-600">Estas son tus clases reservadas:</p>
    </div>

    <!-- Calendario semanal -->
    <div class="flex-grow px-4 py-6">
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr class="bg-indigo-600 text-white">
              <th class="py-2 px-4">Lunes</th>
              <th class="py-2 px-4">Martes</th>
              <th class="py-2 px-4">Miércoles</th>
              <th class="py-2 px-4">Jueves</th>
              <th class="py-2 px-4">Viernes</th>
              <th class="py-2 px-4">Sábado</th>
              <th class="py-2 px-4">Domingo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-for="(reservas, dia) in calendario"
                :key="dia"
                class="border-t align-top"
              >
                <div
                  v-for="reserva in reservas"
                  :key="reserva.id"
                  class="p-4 mb-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
                >
                  <h2 class="font-bold text-lg">{{ reserva.nombre }}</h2>
                  <p class="text-sm text-gray-600">{{ reserva.descripcion }}</p>
                  <p class="text-sm text-indigo-500">{{ reserva.horario }}</p>
                  <button
                    @click="cancelarReserva(reserva.id)"
                    class="mt-2 bg-red-100 text-red-700 py-1 px-2 rounded-lg hover:bg-red-200"
                  >
                    Cancelar reserva
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
import { deleteWithTwoParams, fetchById } from "@/apiHandler";

export default {
  components: { Navbar, Footer },
  data() {
    return {
      calendario: {}, // Inicia vacío para llenarlo con datos del backend
      cargando: true,
      error: null,
    };
  },
  computed: {
    // Usa Vuex para obtener los datos del usuario
    ...mapGetters(["obtenerUsuario"]),
    usuario() {
      return this.obtenerUsuario;
    },
  },
  methods: {
    async cargarCalendario() {
      try {
        this.cargando = true;

        const idUsuario = this.usuario.id;
        const data = await fetchById("horarios/reservados", idUsuario); // Llama al endpoint correcto

        this.calendario = data;
      } catch (error) {
        console.error("Error al cargar el calendario:", error);
        this.error = "No se pudo cargar el calendario.";
      } finally {
        this.cargando = false;
      }
    },
    async cancelarReserva(idHorario) {
      if (!this.usuario || !this.usuario.id) {
        alert("Usuario no identificado. Por favor, inicia sesión.");
        return;
      }
      try {
        const idUsuario = this.usuario.id;
        const response = await deleteWithTwoParams(
          "cancelar",
          idUsuario,
          idHorario
        );
        alert("Clase cancelada con éxito.");
        this.cargarCalendario(); // Refresca el calendario para reflejar el cambio
      } catch (error) {
        console.error("Error al cancelar la clase:", error);
        alert("No se pudo cancelar.");
      }
    },
  },

  mounted() {
    this.cargarCalendario(); // Carga el calendario al montar el componente
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  text-align: left;
  padding: 8px;
}
</style>
