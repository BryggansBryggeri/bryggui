<template>
  <div>
    <button>
      <p v-if="props.disabled">disabled</p>
      <p v-else>
        {{ props.mode }}
      </p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Mode } from "@/models/controller";
export default defineComponent({
  props: {
    mode: { type: String as PropType<Mode>, required: true },
    disabled: { type: Boolean, required: true },
  },
  setup(props) {
    console.log(props);
    return { props };
  },
});
</script>
