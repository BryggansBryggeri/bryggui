<template>
  <div class="container mx-auto mt-4">
    <p class="mt-2 has-text-centered">
      <h3>
      Controller
      </h3>
      <on-off-toggle :state="contrState" @click="onClick"/>
      <p> {{ counter }} </p>
      <p> {{ props.contrProps.controllerId }} </p>
      <p> active: {{ active }} </p>
      <p> status: {{ status }} </p>
      <sensor :id="props.contrProps.sensorId" />
    </p>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, PropType } from "vue";
import { StoreApi } from "@/store/api";
import { eventbus } from "@/eventbus";
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
    const active = computed(() => Array.from(storeApi.getActiveClients().controllers).includes(props.contrProps.controllerId));
    const status = computed(() => storeApi.getContrValue(props.contrProps.controllerId));
    const contrState = true;
    let counter = ref(0);
    function onClick() {
      counter.value += 1;
      console.log("Click", counter.value);
    }
    return { active, props, status, contrState, onClick , counter };
  },
});
</script>
