<template>
  <div class="flex flex-col justify-between h-screen">
    <Nav />

    <div class="container mx-auto mt-4">
<div class="flex flex-wrap -mx-5 overflow-hidden">

  <div class="w-1/2 px-5 my-5 overflow-hidden bg-gray-400">
    Tjenare tjenare<!-- Column Content -->
  </div>

  <div class="w-1/2 px-5 my-5 overflow-hidden bg-gray-100">
    Tjenare tjenare<!-- Column Content -->
  </div>

  <div class="w-1/2 px-5 my-5 overflow-hidden bg-gray-400">
    Tjenare tjenare<!-- Column Content -->
  </div>

  <div class="w-1/2 px-5 my-5 overflow-hidden bg-gray-100">
    Tjenare tjenare<!-- Column Content -->
  </div>

</div>

      <h1 class="p-2 is-size-3 has-text-centered has-text-weight-bold">
        This iteration: Vue 3/Vuex 4/ts/vite/Composition API
      </h1>
      <div v-if="loading">
        <h3 class="mt-4 has-text-centered">
          Loading...
        </h3>
      </div>
      <div v-else>
        <sensor id="mash_temp" />
        <sensor id="boil_temp" />
        <p class="mt-2 has-text-centered">
          NatsClientStatus: {{ natsClientStatus }}
        </p>
        <h3>Active sensors:</h3>
        <li
          v-for="sensorClient in activeSensors"
          :key="sensorClient"
        >
          {{ sensorClient }}
        </li>
      </div>
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
