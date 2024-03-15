<template>
  BryggIO server status: {{ natsClientStatus }}
  <div class="flex flex-col justify-between h-screen">
    <div v-if="loading">
      <h3 class="">Loading...</h3>
    </div>
    <div v-else class="flex flex-row w-full space-x-4 justify-between">
      <controller :contr-props="mashController" />
      <controller :contr-props="boilController" />
      <active-clients />
      <log />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useNatsClientStore } from "@/stores/nats_client";
import { ControllerProps } from "@/models/controller";
import Controller from "@/components/Controller.vue";
import ActiveClients from "@/components/ActiveClients.vue";
import Log from "@/components/Log.vue";

const mashController: ControllerProps = {
  controllerId: "mash_controller",
  actorId: "mash_heater",
  sensorId: "mash_temp",
  type: "manual",
};

const boilController: ControllerProps = {
  controllerId: "boil_controller",
  actorId: "boil_heater",
  sensorId: "boil_temp",
  type: "manual",
};

export default defineComponent({
  components: { Controller, ActiveClients, Log },
  setup() {
    const store = useNatsClientStore();
    const loading = computed(() => store.loading);
    const natsClientStatus = computed(() => store.status);

    return { loading, mashController, boilController, natsClientStatus };
  },
});
</script>
