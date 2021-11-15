<template>
  <div>
    <button>
      <p v-if="props.disabled">disabled</p>
      <p v-else>
        {{ props.state ? "ON" : "OFF" }}
      </p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    state: { type: Boolean, required: true },
    disabled: { type: Boolean, required: true },
  },
  setup(props) {
    return { props };
  },
});
</script>
