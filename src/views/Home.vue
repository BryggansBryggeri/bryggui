<template>
  <div class="">
    <div v-if="loading">
      <h3 class="">Loading...</h3>
    </div>
    <div v-else class="flex flex-row justify-around space-x-6">
      <p class="">
        NatsClientStatus: {{ natsClientStatus }}
      </p>
      <div class="rounded-lg bg-neutral-600 flex flex-col pt-3 py-2 px-3 space-y-3 flex-grow text-white">
      <controller :contr-props="mashController" />
      </div>
      <controller :contr-props="boilController" />
      <active-clients />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { StoreApi } from "@/store/api";
import { ControllerProps } from "@/models/controller";
import Controller from "@/components/Controller.vue";
import ActiveClients from "@/components/ActiveClients.vue";

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
  components: { Controller, ActiveClients },
  setup() {
    const storeApi = new StoreApi();
    const loading = computed(() => storeApi.isLoading());
    const natsClientStatus = computed(() => storeApi.getNatsClientStatus());
    onMounted(() => {
      storeApi.fauxLoading();
    });
    return { loading, natsClientStatus, mashController, boilController };
  },
});
</script>
