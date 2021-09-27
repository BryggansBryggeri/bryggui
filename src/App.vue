<template>
  <div class="bg-red-200 container mx-auto mt-4">
    <h1 class="is-size-3 has-text-centered p-2 has-text-weight-bold">
      This iteration: Vue 3/Vuex 4/ts/vite/Composition API
    </h1>
    <div v-if="loading">
      <h3 class="has-text-centered mt-4">Loading...</h3>
    </div>
    <div v-else>
      <p class="has-text-centered mt-2">Mash temp: {{ mashTemp }}</p>
      <p class="has-text-centered mt-2">Boil temp: {{ boilTemp }}</p>
      <p class="has-text-centered mt-2">NatsClientStatus: {{ natsClientStatus }}</p>
    </div>
    Active sensors:
    <li v-for="sensorClient in activeSensors" :key="sensorClient">
      {{ sensorClient }}
    </li>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { StoreApi } from "@/store/api";
import { eventbus } from "@/eventbus";

export default defineComponent({
  components: {},
  setup() {
    eventbus.start();
    const store = useStore();
    const storeApi = new StoreApi();
    const loading = computed(() => store.state.loading);
    const natsClientStatus = computed(() => storeApi.getNatsClientStatus());
    onMounted(() => {
      storeApi.fauxLoading();
    });
    const mashTemp = computed(() => storeApi.getSensorValue("mash_temp"));
    const boilTemp = computed(() => storeApi.getSensorValue("boil_temp"));
    const activeSensors = computed(() => Array.from(storeApi.sensorClients()));
    return { loading, mashTemp, boilTemp, natsClientStatus, activeSensors };
  },
});
</script>
