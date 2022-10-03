<template>
  <div class="flex flex-col w-full bg-base-200 rounded-lg space-y-6 px-4 py-5">
    <div class="flex flex-col rounded-lg bg-base-300 p-4 space-y-1">
      <div class="divider">Name</div>
      <div class="flex flex-row justify-between rounded-lg mb-2">
      </div>
      <div class="flex flex-row justify-between rounded-lg">
        <h3>{{ props.contrProps.controllerId }}</h3>
        <on-off-toggle
          :state="contrActive"
          :disabled="disabled"
          @click="toggleContr"
        />
      </div>
      <div class="divider">Controll type</div>
      <man-auto-toggle
        :mode="contrMode"
        :disabled="disabled"
        @click="toggleMode"
      />
    </div>

    <div class="bg-base-300 rounded-lg p-4"></div>
    <div class="bg-base-300 rounded-lg p-4">
      <p>{{ props.contrProps.controllerId }}</p>
      <p>Target: {{ target }}</p>
      <sensor :id="props.contrProps.sensorId" />
      <actor :id="props.contrProps.actorId" />
      <div class="target-input">
        Set target:
        <input
          v-model="parseTarget"
          type="text"
          @keydown.enter="setTarget(parseTarget)"
        />{{ unit }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  isProxy,
  toRaw,
} from "vue";
import { StoreApi } from "@/store/api";
import type { ControllerProps, ContrStatus } from "@/models/controller";
import { Mode, typeFromMode } from "@/models/controller";
import { match } from "@/models/result";
import Sensor from "@/components/Sensor.vue";
import Actor from "@/components/Actor.vue";
import OnOffToggle from "@/components/OnOffToggle.vue";
import ManAutoToggle from "@/components/ManAutoToggle.vue";

function dispContr(status: ContrStatus): string {
  const unit = contrUnit(status.mode);
  if (status.mode === Mode.Man) {
    return `${status.target * 100}${unit}`;
  } else {
    return `${status.target}${unit}`;
  }
}

function contrUnit(mode: Mode): string {
  let rawData = mode;
  if (isProxy(mode)) {
    rawData = toRaw(mode);
  }
  console.log("Mode", rawData);
  if (rawData === Mode.Man) {
    return "%";
  } else {
    return "C";
  }
}

function parseTargetString(textInput: string, mode: Mode): number {
  const newTarget = parseFloat(textInput);
  if (mode === Mode.Man) {
    return newTarget / 100.0;
  } else {
    return newTarget;
  }
}

export default defineComponent({
  components: { Sensor, Actor, OnOffToggle, ManAutoToggle },
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
    const target = computed(() => {
      const raw = storeApi.getContrValue(props.contrProps.controllerId);
      if (raw !== undefined) {
        return match(
          raw,
          (ok) => dispContr(ok),
          (err) => `${err}`
        );
      } else {
        return "Inactive";
      }
    });

    const contrMode: ComputedRef<Mode> = computed(() => {
      const stat = storeApi.getContrValue(props.contrProps.controllerId);
      if (stat === undefined) {
        return Mode.Man;
      } else {
        return match(
          stat,
          (ok) => ok.mode,
          () => Mode.Man
        );
      }
    });

    const unit = computed(() => {
      return contrUnit(contrMode);
    });

    function toggleContr() {
      if (!disabled.value) {
        disabled.value = true;
        if (!contrActive.value) {
          storeApi.startController(props.contrProps, 0.0);
        } else {
          storeApi.stopController(props.contrProps);
        }
        disabled.value = false;
      } else {
        console.log("Clicked while contr. disabled.");
      }
    }

    function toggleMode() {
      if (!disabled.value) {
        disabled.value = true;
        // TODO: Not sure if this destroys reactivity.
        let newContrProps: ControllerProps = Object.assign(
          {},
          props.contrProps
        );
        if (contrMode.value.valueOf() == Mode.Man.valueOf()) {
          newContrProps.type = typeFromMode(Mode.Auto);
          storeApi.switchController(newContrProps, 0.0);
        } else {
          newContrProps.type = typeFromMode(Mode.Man);
          storeApi.switchController(newContrProps, 0.0);
        }
        disabled.value = false;
      } else {
        console.log("Clicked while contr. disabled.");
      }
    }

    const parseTarget = ref("");
    function setTarget(textInput: string) {
      const newTarget = parseTargetString(textInput, contrMode);
      if (!Number.isNaN(newTarget)) {
        storeApi.setContrTarget(props.contrProps.controllerId, newTarget);
      } else {
        console.log("Error parsing new target", textInput);
      }
      parseTarget.value = "";
    }
    return {
      props,
      target,
      unit,
      parseTarget,
      setTarget,
      contrActive,
      contrMode,
      disabled,
      toggleContr,
      toggleMode,
    };
  },
});
</script>
