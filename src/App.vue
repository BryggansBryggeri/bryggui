<template>
  <div class="flex flex-col justify-between h-screen">
    <router-view />
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
