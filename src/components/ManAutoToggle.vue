<template>
  <div>
    <div class="h-6">

    
    <div class="btn-group">
      <button
        :class="{ 'btn-active': getMode() == 'manual' }"
        class="btn btn-sm"
        :disabled="props.disabled || getMode() == 'manual'"
      >
        Manual
      </button>
      <button
        :class="{ 'btn-active': getMode() == 'auto' }"
        class="btn btn-sm"
        :disabled="props.disabled"
      >
        Temperature
      </button>
    </div>
    </div>
    <button>
      <p v-if="props.disabled">disabled</p>
      <p v-else>
        {{ getMode() }}
      </p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Mode } from "@/models/controller";

function getMode(): string {
  if(Mode.Man){
    return "manual"
  }else if (Mode.Auto){
    return "auto"
  }
  else{
    return ""
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
