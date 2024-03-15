<template>
  <div class="flex flex-row align-center space-x-2">
    <h3>Status:</h3>
    <button
      :disabled="props.disabled"
      :checked="props.state"
      class="toggle bg-red-300 border-red-300 checked:bg-success indeterminate:bg-warning checked:border-success"
    />
    <!-- For some reason ALL OnOffToggle now sets to disabled and indet when clicked. Can't figure it out right now. -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//import { useTimeout } from '@vueuse/core'
//const { ready, start } = useTimeout(1000, { controls: true })

export default defineComponent({
  props: {
    state: { type: Boolean, required: true },
    disabled: { type: Boolean, required: true },
  },
  setup(props) {
    return {
      props, //ready, start
    };
  },
});
</script>
