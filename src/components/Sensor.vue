<template>
  <div class="container mx-auto mt-4">
    <div class="mt-2 has-text-centered">
      {{ id }}
    </div>
    <div
      v-if="!dispSensor.isErr"
      class="mt-2 has-text-centered"
    >
      {{ dispSensor.val }}
    </div>
    <div
      v-else
      class="mt-2 has-text-centered"
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
    return { dispSensor };
  },
});

type DispSensor = {
  isErr: boolean,
  val: string,
  err: string,
};

function dispSensorFromApiRes(res: SensorResult | undefined): DispSensor {
      if (res !== undefined) {
        return match(
          res,
          (ok): DispSensor => {return {isErr: false, val: `${ ok[0] }C`, err: ""};},
          (err): DispSensor => {return {isErr: true, val: "", err: `${err}`};}
        );
      } else {
        return {isErr: true, val: "", err: "Inactive"} as DispSensor;
      }
}

</script>
