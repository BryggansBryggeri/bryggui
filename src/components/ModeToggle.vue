<template>
  <div class="place-self-center">
    <div class="btn-group">
      <button
        :class="{ 'btn-active btn-primary': getMode(mode) == 'power' }"
        class="btn btn-outline btn-sm"
        :disabled="props.disabled || getMode(mode) == 'power'"
        @click="$emit('toggleEvent', 1)"
      >
        Manual
      </button>
      <button
        :class="{ 'btn-active': getMode(props.mode) == 'temp' }"
        class="btn btn-outline btn-sm"
        :disabled="props.disabled || getMode(mode) == 'temp'"
        @click="$emit('toggleEvent', 2)"
      >
        Auto
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Mode } from "@/models/controller";

function getMode(input: Mode): string {
  if (input === Mode.Man) {
    return "manual";
  } else if (input === Mode.Auto) {
    return "auto";
  } else {
    return "";
  }
}

export default defineComponent({
  props: {
    mode: { type: String as PropType<Mode>, required: true },
    disabled: { type: Boolean, required: true },
  },
  emits: ["toggleEvent"],
  setup(props) {
    return { props, getMode };
  },
});
</script>
