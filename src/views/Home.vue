<template>
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

<script setup lang="ts">
import { computed } from "vue";
import { useNatsClientStore } from "@/stores/nats_client";
import { ControllerProps } from "@/models/controller";
import Controller from "@/components/Controller.vue";
import ActiveClients from "@/components/ActiveClients.vue";
import Log from "@/components/Log.vue";
import { NatsClientStatus } from "@/nats_setup";

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

const store = useNatsClientStore();
// const loading = computed(() => store.status !== NatsClientStatus.Ready);
const loading = false; // This is for development purposes if there is no BryggIO client available
</script>
