<template>
  <div class="place-self-center">
    <div class="btn-group">
      <button
        :class="{ 'btn-active': isActive(mode, manMode, disabled) }"
        class="btn btn-outline btn-sm"
        :disabled="disabled"
        @click="$emit('toggleEvent', 1)"
      >
        Manual
      </button>
      <button
        :class="{ 'btn-active': isActive(mode, autoMode, disabled) }"
        class="btn btn-outline btn-sm"
        :disabled="disabled"
        @click="$emit('toggleEvent', 2)"
      >
        Auto
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Mode } from "@/models/controller";

function isActive(currentMode: Mode, cmp: Mode, disabled: boolean): boolean {
  return currentMode === cmp && !disabled;
}

export default defineComponent({
  props: {
    mode: Mode,
    disabled: Boolean,
  },
  emits: ["toggleEvent"],
  setup(props) {
    const manMode = Mode.Man;
    const autoMode = Mode.Auto;
    return { props, isActive, manMode, autoMode };
  },
});
</script>
