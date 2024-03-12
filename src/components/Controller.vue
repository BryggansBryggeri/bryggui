<template>
  <div class="flex flex-col w-full rounded-lg px-4 py-5">
    <div class="flex flex-col rounded-lg bg-base-200 p-4 space-y-4">
      <div class="divider">Name</div>
      <div class="flex flex-row justify-between rounded-lg">
        <h3 class="capitalize font-bold">
          {{ prettify(props.contrProps.controllerId) }}
        </h3>
        <on-off-toggle
          :state="contrActive"
          :disabled="disabled"
          @click="toggleContr"
        />
      </div>
      <div class="flex flex-row justify-center space-x-2">
        <sensor :id="props.contrProps.sensorId" />
        <actor :id="props.contrProps.actorId" />
        <div
          class="
            flex
            bg-base-300
            px-3
            py-2
            rounded-lg
            flex-col flex-none
            text-sm
            w-1/3
          "
        >
          <p>Target:</p>
          <p
            class="
              flex
              text-mono
              justify-end
              place-self-end
              text-accent text-lg
            "
          >
            {{ target }}
          </p>
        </div>
      </div>
      <div class="divider">Controller type</div>
      <ModeToggle
        :mode="contrMode"
        :disabled="!contrActive"
        @toggleEvent="toggleMode"
      />
      <div class="flex flex-row justify-between align-center">
        <h3>Set target:</h3>
        <input
          v-model="parseTarget"
          type="text"
          :placeholder="parseTarget"
          class="input input-bordered input-primary w-full max-w-xs"
          @keydown.enter="setTarget(parseTarget, contrMode)"
        />
        <!-- I can't seem to make the unit reactive-->
        <!-- <h3>{{unit}}</h3> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, ComputedRef, defineComponent, PropType } from "vue";
import { StoreApi } from "@/store/api";
import type { ControllerProps, ContrStatus } from "@/models/controller";
import { Mode, typeFromMode } from "@/models/controller";
import { match } from "@/models/result";
import Sensor from "@/components/Sensor.vue";
import Actor from "@/components/Actor.vue";
import OnOffToggle from "@/components/OnOffToggle.vue";
import ModeToggle from "@/components/ModeToggle.vue";

function dispContr(status: ContrStatus): string {
  const unit = contrUnit(status.mode);
  if (status.mode === Mode.Man) {
    return `${status.target * 100}${unit}`;
  } else {
    return `${status.target}${unit}`;
  }
}

function contrUnit(mode: Mode): string {
  if (mode === Mode.Man) {
    return "%";
  } else {
    return "°C";
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
  components: { Sensor, Actor, OnOffToggle, ModeToggle },
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

    const unit: ComputedRef<string> = computed(() => {
      return contrUnit(contrMode.value);
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

    function toggleMode(wishedFor: number) {
      if (!disabled.value) {
        disabled.value = true; // TODO: Not sure if this destroys reactivity.
        let newMode = wishedFor == 1 ? Mode.Man : Mode.Auto;

        // If toggling to the current mode, do nothing.
        if (newMode === contrMode.value.valueOf()) {
          disabled.value = false;
          return;
        }

        let newContrProps: ControllerProps = Object.assign(
          {},
          props.contrProps
        );
        if (contrMode.value.valueOf() === Mode.Man.valueOf()) {
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
    function setTarget(textInput: string, mode: Mode) {
      const newTarget = parseTargetString(textInput, mode);
      if (!Number.isNaN(newTarget)) {
        storeApi.setContrTarget(props.contrProps.controllerId, newTarget);
      } else {
        console.log("Error parsing new target", textInput);
      }
      parseTarget.value = "";
    }

    function prettify(input: string): string {
      return input.replace("_", " ");
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
      prettify,
    };
  },
});
</script>
