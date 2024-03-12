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
    <div v-else class="flex text-mono justify-end text-accent text-lg">
      {{ dispSensor.err }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ComputedRef } from "vue";
import { StoreApi } from "@/store/api";
import { match } from "@/models/result";
import { MeasResult } from "@/models/sensor";
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
  val: number | ComputedRef<string | number>;
  err: string;
};

function dispSensorFromApiRes(res: MeasResult | undefined): DispSensor {
  if (res !== undefined) {
    return match(
      res,
      (ok): DispSensor => {
        const meas = usePrecision(ok[0], 1);
        return { isErr: false, val: meas, err: "" };
      },
      (err): DispSensor => {
        return { isErr: true, val: 0, err: `${err}` };
      }
    );
  } else {
    return { isErr: true, val: 0, err: "Inactive" } as DispSensor;
  }
}

function prettify(input: string): string {
  return input.replace("_", " ");
}
</script>
