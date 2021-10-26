<template>
  <div class="container mx-auto mt-4">
    <p class="mt-2 has-text-centered">
      Controller: {{ props.contrProps.controllerId }}
      <sensor :id="props.contrProps.sensorId" />
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { StoreApi } from "@/store/api";
import { eventbus } from "@/eventbus";
import type { ControllerProps } from "@/models/controller";
import Sensor from "@/components/Sensor.vue";

export default defineComponent({
  components: { Sensor },
  props: {
    contrProps: { type: Object as PropType<ControllerProps>, required: true },
  },
  setup(props) {
    const storeApi = new StoreApi();
    return { props };
  },
});
</script>
