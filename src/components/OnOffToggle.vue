<template>
  <div id="toggle1" :class="{ 'disabled': props.disabled }">
    <label
      for="OnOffToggle"
      class="flex flex-row space-x-3 items-center cursor-pointer font-semibold text-white"
    >
      <input
        id="OnOffToggle"
        type="checkbox"
        class="sr-only"
      >
      <div
        class="w-14 h-8 flex items-center bg-neutral-700 rounded-full p-1 duration-300 cursor-pointer"
        :class="{ 'bg-green-700': props.state }"
      >
        <div
          class="w-6 h-6 rounded-full shadow-md transform duration-300"
          :class="{ 'bg-neutral-800 tranneutral-x-6': props.state, 'bg-red-500' : !props.state }"
        />
      </div>
    </label>
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
