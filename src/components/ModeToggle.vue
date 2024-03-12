<template>
  <div class="place-self-center">
    <div class="btn-group">
      <button
        :class="{ 'btn-active': isActive(mode, 'Manual', disabled) }"
        class="btn btn-outline btn-sm"
        :disabled="props.disabled"
        @click="$emit('toggleEvent', 1)"
      >
        Manual
      </button>
      <button
        :class="{ 'btn-active': isActive(mode, 'Auto', disabled) }"
        class="btn btn-outline btn-sm"
        :disabled="props.disabled"
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

// TODO: Figure out if this comp. can have Mode as a prop.
function isActive(
  currentMode: string,
  cmp: string,
  disabled: boolean
): boolean {
  return currentMode === cmp && !disabled;
}

export default defineComponent({
  props: {
    mode: { type: String as PropType<Mode>, required: true },
    disabled: { type: Boolean, required: true },
  },
  emits: ["toggleEvent"],
  setup(props) {
    return { props, isActive };
  },
});
</script>
