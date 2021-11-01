<template>
  <div class="rounded-lg bg-neutral-600 flex flex-col pt-3 py-2 px-3 space-y-3 flex-grow text-white">
    <div class="flex flex-row justify-between">
      <span class="text-xl text-white font-bold">VESSEL NAME</span>
      <on-off-toggle
        :state="contrActive"
        :disabled="disabled"
        @click="onClick"
      />
    </div>
    <hr class="w-full h-px rounded-full bg-white">
    <div>
      <span class="font-semibold">Controller: </span>
      <span> {{ props.contrProps.controllerId }} </span>
      <ul class="pl-3">
        <li>
          <sensor :id="props.contrProps.sensorId" />
        </li>
        <li>
          <span class="font-semibold">Actor:</span>
          <span>actor</span>
          <span class="">actor status</span>
        </li>
      </ul>
    </div>
    <hr class="w-full h-px rounded-full bg-white">

    <p>status: {{ status }}</p>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, PropType } from "vue";
import { StoreApi } from "@/store/api";
import type { ControllerProps } from "@/models/controller";
import Sensor from "@/components/Sensor.vue";
import OnOffToggle from "@/components/OnOffToggle.vue";

export default defineComponent({
  components: { Sensor, OnOffToggle },
  props: {
    contrProps: { type: Object as PropType<ControllerProps>, required: true },
  },
  setup(props) {
    const storeApi = new StoreApi();
    const disabled = ref(false);
    const contrActive = computed(() =>
      Array.from(storeApi.getActiveClients().controllers).includes(
        props.contrProps.controllerId
      )
    );
    const status = computed(() =>
      storeApi.getContrValue(props.contrProps.controllerId)
    );
    function onClick() {
      if (!contrActive.value) {
        disabled.value = true;
        storeApi.startController(props.contrProps, 0.0);
        disabled.value = false;
      }
      if (contrActive.value) {
        disabled.value = true;
        storeApi.stopController(props.contrProps);
        disabled.value = false;
      }
    }
    return { props, status, contrActive, disabled, onClick };
  },
});
</script>
