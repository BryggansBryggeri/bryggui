<template>
  <Switch
    v-model="enabled"
    :class="enabled ? 'bg-red-900' : 'bg-red-700'"
    class="
      relative
      inline-flex
      flex-shrink-0
      h-[38px]
      w-[74px]
      border-2 border-transparent
      rounded-full
      cursor-pointer
      transition-colors
      ease-in-out
      duration-200
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-white
      focus-visible:ring-opacity-75
    "
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      :class="enabled ? 'translate-x-9' : 'translate-x-0'"
      class="
        pointer-events-none
        inline-block
        h-[34px]
        w-[34px]
        rounded-full
        bg-white
        shadow-lg
        transform
        ring-0
        transition
        ease-in-out
        duration-200
      "
    />
  </Switch>
  <span>{{ enabled }}</span>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
import { useToggle } from "@vueuse/core";

const [enabled, toggle] = useToggle();
</script>
