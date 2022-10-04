<template>
  <div class="place-self-center">
    <div class="btn-group">
      <button
        :class="{ 'btn-primary': getMode(mode) == 'manual' }"
        class="btn btn-outline btn-sm"
        :disabled="props.disabled || getMode(mode) == 'manual'"
        @click="$emit('toggleEvent')"
      >
        Manual
      </button>
      <button
        :class="{ 'btn-primary': getMode(props.mode) == 'auto'  }"
        class="btn btn-outline btn-sm"
        :disabled="props.disabled || getMode(mode) == 'auto'"
        @click="$emit('toggleEvent')"
      >
        Temperature
      </button>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from "vue";
import { Mode } from "@/models/controller";

function getMode(input: any): string {
  if(input == "Manual"){
    return "manual"
    console.log("getMode ran returned Manual" )
  }else if (input == "Auto"){
    return "auto"
    console.log("getMode ran returned Auto" )
  }
  else{
    return ""
    console.log("getMode ran returned nothing" )
  }
}

export default defineComponent({
  props: {
    mode: { type: String as PropType<Mode>, required: true },
    disabled: { type: Boolean, required: true },
  },
  setup(props) {
    return { props, getMode };
  },
});
</script>
