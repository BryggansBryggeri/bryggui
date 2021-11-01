<template>
  <div class="min-h-screen w-full bg-neutral-800 flex flex-col">
    <nav class="flex flex-row items-center justify-start w-full h-10 bg-neutral-900 text-white mb-5 shadow-md">
      <span class="p-3 font-mono">BryggIO/UI</span>
    </nav>
    <div class="container text-white mx-auto">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { eventbus } from "@/eventbus";

export default defineComponent({
  components: {},
  setup() {
    eventbus.start();
    return {};
  },
});
</script>
