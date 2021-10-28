<template>
  <div class="container mx-auto mt-4">
    <p class="mt-2 has-text-centered" />
    <h3>Controller</h3>
    <on-off-toggle :state="contrActive" :disabled="disabled" @click="onClick" />
    <p>{{ props.contrProps.controllerId }}</p>
    <p>status: {{ status }}</p>
    <sensor :id="props.contrProps.sensorId" />
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
