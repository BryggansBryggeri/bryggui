<template>
  <div class="flex flex-col w-full rounded-lg px-4 py-5">
    <div class="flex flex-col rounded-lg bg-base-200 p-4 space-y-4">
      <div class="divider">Log</div>
      <div class="flex flex-col w-full">
        <li v-for="entry in entries" :key="entry">
          <div :style="getLevelStyle(entry.level)">{{ entry.level }}:</div>
          <span
            v-html="formatStringForHtml(entry.msg)"
            style="white-space: pre-wrap"
          ></span>
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useLogsStore, LogLevel } from "@/stores/log";
import { NatsClientStatus } from "@/nats_setup";

function formatStringForHtml(inputString: string): string {
  // Replace newline characters with <br> for HTML line breaks
  let formattedString = inputString.replace(/\\n/g, "<br>");
  // Replace tab characters with 4 non-breaking spaces
  formattedString = formattedString.replace(/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
  return formattedString;
}

function getLevelStyle(level: LogLevel): Record<string, string> {
  switch (level) {
    case LogLevel.Debug:
      return {}; // Green for READY
    case LogLevel.Info:
      return { color: "green" }; // Green for READY
    case LogLevel.Warning:
      return { color: "orange" }; // Orange for CONNECTING
    case LogLevel.Error:
      return { color: "red" }; // Red for ERROR
    default:
      console.error("Unreachable: Invalid log level type", level);
      return {};
  }
}

export default defineComponent({
  setup() {
    const logStore = useLogsStore();
    const dispLevels = new Set([
      LogLevel.Info,
      LogLevel.Warning,
      LogLevel.Error,
    ]);
    const entries = computed(() => logStore.entries(dispLevels, 5));

    return { entries, formatStringForHtml, getLevelStyle };
  },
});
</script>
