<template>
  <div class="flex flex-col w-full">
    <h2>Log:</h2>
    <li v-for="entry in entries" :key="entry">
      {{ entry.level }}:
      <span style="white-space: pre-wrap">{{ entry.msg }}</span>
    </li>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useLogsStore, LogLevel } from "@/stores/log";

export default defineComponent({
  setup() {
    const logStore = useLogsStore();
    const dispLevels = new Set([
      LogLevel.Info,
      LogLevel.Warning,
      LogLevel.Error,
    ]);
    const entries = computed(() => logStore.entries(dispLevels, 5));
    return { entries };
  },
});
</script>
