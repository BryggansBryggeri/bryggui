<template>
  <div class="container mx-auto mt-4">
    <p class="mt-2 has-text-centered" />
    <h3>Controller</h3>
    <on-off-toggle :state="contrState" @click="onClick" />
    <p>{{ props.contrProps.controllerId }}</p>
    <p>active: {{ active }}</p>
    <p>status: {{ status }}</p>
    <sensor :id="props.contrProps.sensorId" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useToggle } from "@vueuse/core";
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
    const active = computed(() =>
      Array.from(storeApi.getActiveClients().controllers).includes(
        props.contrProps.controllerId
      )
    );
    const status = computed(() =>
      storeApi.getContrValue(props.contrProps.controllerId)
    );
    const [contrState, toggle] = useToggle();
    function onClick() {
      console.log("Click", contrState);
      contrState.value = !contrState.value;
      //toggle();
    }
    return { active, props, status, contrState, onClick };
  },
});
</script>
