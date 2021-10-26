<template>
  <div class="flex flex-col justify-between h-screen">
    <h1 class="p-2 is-size-3 has-text-centered has-text-weight-bold">
      This iteration: Vue 3/Vuex 4/ts/vite/Composition API
    </h1>
    <div v-if="loading">
      <h3 class="mt-4 has-text-centered">
        Loading...
      </h3>
    </div>
    <div v-else>
      <controller :contr-props="mash" />
      <p class="mt-2 has-text-centered">
        NatsClientStatus: {{ natsClientStatus }}
      </p>
    </div>
    Active sensors:
    <li
      v-for="sensorClient in activeSensors"
      :key="sensorClient"
    >
      {{ sensorClient }}
    </li>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { StoreApi } from "@/store/api";
import Controller from "@/components/Controller.vue";
import { ControllerProps } from "@/models/controller";

const mash: ControllerProps = {
  controllerId: "mash",
  actorId: "mash_heater",
  sensorId: "mash_temp",
  type: "manual",
};

// const boil: ControllerProps = {
//   controllerId: "boil",
//   actorId: "boil_heater",
//   sensorId: "boil_temp",
//   type: "manual",
// };

export default defineComponent({
  components: { Controller },
  setup() {
    const storeApi = new StoreApi();
    const loading = computed(() => storeApi.isLoading());
    const natsClientStatus = computed(() => storeApi.getNatsClientStatus());
    onMounted(() => {
      storeApi.fauxLoading();
    });
    const activeSensors = computed(() => Array.from(storeApi.sensorClients()));
    return { loading, natsClientStatus, activeSensors, mash };
  },
});
</script>
