<template>
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
    <div class="capitalize">
      {{ prettify(id) }}
    </div>
    <div
      v-if="!dispSensor.isErr"
      class="flex text-mono justify-end text-accent text-lg"
    >
      {{ dispSensor.val }}°C
    </div>
    <div
      v-else
      class="flex text-mono justify-end text-accent text-lg"
    >
      {{ dispSensor.err }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { StoreApi } from "@/store/api";
import { match } from "@/models/result";
import { SensorResult } from "@/models/sensor";
import { usePrecision } from "@vueuse/math";

export default defineComponent({
  components: {},
  props: {
    id: { type: String, required: true },
  },
  setup(props) {
    const storeApi = new StoreApi();
    const dispSensor = computed(() => {
      const res = storeApi.getSensorValue(props.id);
      return dispSensorFromApiRes(res);
    });
    return { dispSensor, prettify };
  },
});

type DispSensor = {
  isErr: boolean;
  val: string;
  err: string;
};

function dispSensorFromApiRes(res: SensorResult | undefined): DispSensor {
  if (res !== undefined) {
    return match(
      res,
      (ok): DispSensor => {
        return { isErr: false, val: usePrecision(ok[0], 1), err: "" };
      }, // Question: Is it stupid to make this calculation in the frontend?
      (err): DispSensor => {
        return { isErr: true, val: "", err: `${err}` };
      }
    );
  } else {
    return { isErr: true, val: "", err: "Inactive" } as DispSensor;
  }
}

function prettify(input: string): string {
  return input.replace("_", " ");
}
</script>
