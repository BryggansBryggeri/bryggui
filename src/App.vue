<template>
<<<<<<< HEAD
  <div class="bg-red-200 container mx-auto mt-4">
    <h1 class="is-size-3 has-text-centered p-2 has-text-weight-bold">
      This iteration: Vue 3/Vuex 4/ts/vite/Composition
    </h1>
    <div v-if="loading">
      <h3 class="has-text-centered mt-4">Loading...</h3>
    </div>
    <div v-else>
      <sensor id="mash_temp" />
      <sensor id="boil_temp" />
      <p class="has-text-centered mt-2">
        NatsClientStatus: {{ natsClientStatus }}
      </p>
      <h3>Active sensors:</h3>
      <li v-for="sensorClient in activeSensors" :key="sensorClient">
        {{ sensorClient }}
      </li>
=======
  <div class="flex flex-col justify-between h-screen">
    <Nav />

    <div class="container mx-auto mt-4">
      <h1 class="p-2 is-size-3 has-text-centered has-text-weight-bold">
        This iteration: Vue 3/Vuex 4/ts/vite/Composition API
      </h1>
      <div v-if="loading">
        <h3 class="mt-4 has-text-centered">Loading...</h3>
      </div>
      <div v-else>
        <sensor id="mash_temp" />
        <sensor id="boil_temp" />
        <p class="mt-2 has-text-centered">
          NatsClientStatus: {{ natsClientStatus }}
        </p>
        <h3>Active sensors:</h3>
        <li v-for="sensorClient in activeSensors" :key="sensorClient">
          {{ sensorClient }}
        </li>
      </div>
>>>>>>> ad64dd626b76d993b8001cc3e7083527cd51e7c2
    </div>
    <Switch />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Switch from "@/components/utils/Switch.vue";
import Footer from "@/components/layouts/Footer.vue";
import Nav from "@/components/layouts/Nav.vue";


</script>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { StoreApi } from "@/store/api";
import { eventbus } from "@/eventbus";
import Sensor from "@/components/Sensor.vue";

export default defineComponent({
  components: { Sensor },
  setup() {
    eventbus.start();
    const store = useStore();
    const storeApi = new StoreApi();
    const loading = computed(() => store.state.loading);
    const natsClientStatus = computed(() => storeApi.getNatsClientStatus());
    onMounted(() => {
      storeApi.fauxLoading();
    });
    const activeSensors = computed(() => Array.from(storeApi.sensorClients()));
    return { loading, natsClientStatus, activeSensors };
  },
});
</script>
