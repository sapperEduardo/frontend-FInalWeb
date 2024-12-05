<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <Navbar />

    <!-- Texto de bienvenida -->
    <div class="text-center py-6">
      <h1 v-if="usuario" class="text-2xl font-bold">
        ¡Estas son tus clases disponibles {{ saludo }}!
      </h1>
      <p class="text-lg text-gray-600">Elige una clase para reservar:</p>
    </div>

    <!-- Animación Informativa -->
    <div
      v-if="mostrarAnimacionInformativa"
      class="animacion-informativa p-4 mb-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-lg"
    >
      <p class="text-xl font-semibold text-yellow-800">
        ¡Recuerda {{ nombre }}! Las clases se reservan por orden de llegada. Si
        ves que no hay cupos disponibles, intenta con otro horario.
      </p>
      <button
        @click="cerrarAnimacion"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Aceptar
      </button>
    </div>

    <!-- Resto del contenido de la página (Calendario, botones, etc.) -->

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
                class="border-t align-top"
              >
                <div
                  v-for="clase in clases"
                  :key="clase.id"
                  class="p-4 mb-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
                >
                  <h2 class="font-bold text-lg">{{ clase.nombre }}</h2>
                  <p class="text-sm text-gray-600">{{ clase.descripcion }}</p>
                  <p class="text-sm text-indigo-500">{{ clase.horario }}</p>
                  <p v-if="clase.cupos > 0" class="text-sm text-green-500">
                    Cupos disponibles: {{ clase.cupos }}
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
                    disabled
                    class="mt-2 bg-gray-300 text-gray-700 py-1 px-2 rounded-lg cursor-not-allowed"
                  >
                    Sin cupos
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
      nombresEspeciales: ["aldi", "aldana", "cami", "camila"],
      mostrarAnimacionInformativa: false, // Controla si se muestra la animación informativa
    };
  },
  computed: {
    // Uso Vuex para obtener los datos del usuario
    ...mapGetters(["obtenerUsuario"]),
    usuario() {
      return this.obtenerUsuario;
    },
    saludo() {
      if (this.usuario && this.esNombreEspecial(this.usuario.nombre)) {
        return `${this.usuario.nombre} linda❤️💘`;
      }
      return `${this.usuario.nombre}`;
    },
    nombre() {
      if (this.usuario && this.esNombreEspecial(this.usuario.nombre)) {
        return `${this.usuario.nombre} linda🥰`;
      }
      return `¡Hola, ${this.usuario.nombre}!`;
    },
  },
  //

  methods: {
    cerrarAnimacion() {
      this.mostrarAnimacionInformativa = false;
    },
    esNombreEspecial(nombre) {
      const nombreMinusculas = nombre.toLowerCase();
      return this.nombresEspeciales.some((n) => nombreMinusculas.includes(n));
    },
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
    if (this.usuario && this.esNombreEspecial(this.usuario.nombre)) {
      this.mostrarAnimacionInformativa = true;
    }
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
<style scoped>
.animacion-informativa {
  width: 90%; /* Ancho del 90% del contenedor */
  max-width: 400px; /* Ancho máximo para que no se haga demasiado grande */
  margin: 0 auto; /* Centrado en la pantalla */
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
