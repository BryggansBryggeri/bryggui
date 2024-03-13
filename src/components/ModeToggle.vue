<template>
  <div class="place-self-center">
    <div class="btn-group">
      <button
        :class="{ 'btn-active': isActive(mode, manMode, disabled) }"
        class="btn btn-outline btn-sm"
        :disabled="disabled"
        @click="toggleEventH(manMode)"
      >
        Manual
      </button>
      <button
        :class="{ 'btn-active': isActive(mode, autoMode, disabled) }"
        class="btn btn-outline btn-sm"
        :disabled="disabled"
        @click="toggleEventH(autoMode)"
      >
        Auto
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Mode } from "@/models/controller";

function isActive(currentMode: Mode, cmp: Mode, disabled: boolean): boolean {
  return currentMode === cmp && !disabled;
}

export default defineComponent({
  props: {
    mode: { type: String as PropType<Mode>, required: true },
    disabled: Boolean,
  },
  emits: ["toggleEvent"],
  setup(props, { emit }) {
    const toggleEventH = (mode: Mode) => {
      emit("toggleEvent", mode);
    };
    const manMode = Mode.Man;
    const autoMode = Mode.Auto;
    return { props, isActive, manMode, autoMode, toggleEventH };
  },
});
</script>
