<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <Navbar />

    <!-- Texto de bienvenida -->
    <div class="text-center py-6">
      <h1 v-if="usuario" class="text-2xl font-bold">
        ¡Estas son tus clases disponibles {{ usuario.nombre }}!
      </h1>
      <p class="text-lg text-gray-600">Elige una clase para reservar:</p>
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
                v-for="(clases, dia) in calendario"
                :key="dia"
                class="border-t"
              >
                <div v-for="clase in clases" :key="clase.id" class="py-2 px-4">
                  <h2 class="font-bold">{{ clase.nombre }}</h2>
                  <p class="text-sm text-gray-600">{{ clase.descripcion }}</p>
                  <p class="text-sm text-indigo-500">{{ clase.horario }}</p>
                  <p v-if="clase.cupos > 0" class="text-sm text-green-500">
                    Cupos disponibles:
                    {{ clase.cupos }}
                  </p>
                  <p v-else class="text-sm text-red-500">
                    Cupos disponibles: {{ clase.cupos }}
                  </p>
                  <button
                    v-if="clase.cupos > 0"
                    @click="reservarClase(clase.id, clase.cupos)"
                    class="mt-2 bg-green-100 text-green-700 py-1 px-2 rounded-lg hover:bg-green-200"
                  >
                    Reservar clase
                  </button>
                  <button
                    v-else
                    @click="reservarClase(clase.id, clase.cupos)"
                    class="mt-2 bg-red-100 text-redd-700 py-1 px-2 rounded-lg hover:bg-red-200"
                  >
                    Reservar clase
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
import { fetchById, postWithTwoParams } from "@/apiHandler";

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
    // Uso Vuex para obtener los datos del usuario
    ...mapGetters(["obtenerUsuario"]),
    usuario() {
      return this.obtenerUsuario;
    },
  },
  //

  methods: {
    async cargarCalendario() {
      try {
        this.cargando = true;

        const idUsuario = this.usuario.id;
        const data = await fetchById("horarios/disponibles", idUsuario); // Llama al endpoint correcto

        this.calendario = data;
      } catch (error) {
        console.error("Error al cargar el calendario:", error);
        this.error = "No se pudo cargar el calendario.";
      } finally {
        this.cargando = false;
      }
    },
    async reservarClase(idHorario, cupos) {
      if (cupos == 0) {
        alert("La clase ya no tiene cupos!\nLo lamentamos.");
        return;
      }

      if (!this.usuario || !this.usuario.id) {
        alert("Usuario no identificado. Por favor, inicia sesión.");
        return;
      }

      try {
        const idUsuario = this.usuario.id;
        const response = await postWithTwoParams(
          "reservar",
          idUsuario,
          idHorario
        );
        alert("Reserva realizada con éxito.");
        this.cargarCalendario(); // Refresca el calendario para reflejar el cambio
      } catch (error) {
        console.error("Error al reservar la clase:", error);
        alert("No se pudo realizar la reserva.");
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
