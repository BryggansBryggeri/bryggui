<template>
  <div class="container mx-auto mt-4">
    <p class="mt-2 has-text-centered" />
    <h3>Controller</h3>
    <on-off-toggle :state="contrActive" :disabled="disabled" @click="onClick" />
    <p>{{ props.contrProps.controllerId }}</p>
    <p>status: {{ status }}</p>
    <sensor :id="props.contrProps.sensorId" />
    <actor :id="props.contrProps.actorId" />
    <div class="target-input">
      Set target:
      <input
        v-model="parseTarget"
        type="text"
        @keydown.enter="setTarget(parseTarget)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, PropType } from "vue";
import { StoreApi } from "@/store/api";
import type { ControllerProps } from "@/models/controller";
import Sensor from "@/components/Sensor.vue";
import Actor from "@/components/Actor.vue";
import OnOffToggle from "@/components/OnOffToggle.vue";

export default defineComponent({
  components: { Sensor, Actor, OnOffToggle },
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
    const parseTarget = ref("");
    function setTarget(textInput: string) {
      console.log(textInput);
      const newTarget = parseFloat(textInput);
      if (!Number.isNaN(newTarget)) {
        storeApi.setContrTarget(props.contrProps.controllerId, newTarget);
      } else {
        console.log("Error parsing new target", textInput);
      }
      parseTarget.value = "";
    }
    return {
      props,
      status,
      parseTarget,
      setTarget,
      contrActive,
      disabled,
      onClick,
    };
  },
});
</script>
