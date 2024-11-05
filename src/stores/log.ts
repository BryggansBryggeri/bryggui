import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useLogsStore = defineStore("logger", () => {
  const logEntries: LogEntry[] = reactive([]);

  const entries = computed(() => {
    return (levels: Set<LogLevel>, lastN: number): LogEntry[] => {
      return logEntries
        .filter((entry) => levels.has(entry.level))
        .slice(-lastN);
    };
  });

  function addLogEntry(entry: LogEntry): void {
    logEntries.push(entry);
  }

  return { entries, addLogEntry };
});

export interface LogEntry {
  level: LogLevel;
  clientId: string;
  msg: string;
}

export enum LogLevel {
  Debug = "Debug",
  Info = "Info",
  Warning = "Warning",
  Error = "Error",
}

export function parseLogLevel(level: string): LogLevel | undefined {
  switch (level) {
    case "debug":
      return LogLevel.Debug;
    case "info":
      return LogLevel.Info;
    case "warning":
      return LogLevel.Warning;
    case "error":
      return LogLevel.Error;
    default:
      return undefined; // Indicates that the input string is not valid
  }
}
