import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { MeasResult } from "@/models/sensor";

export const useSensorsStore = defineStore("sensors", () => {
  // Use list instead? Then ID must be part of MeasResult
  const sensors: Map<string, MeasResult> = reactive(new Map());

  const measResult = computed(() => {
    return (sensorId: string): MeasResult | undefined => sensors.get(sensorId);
  });

  const clients = computed(() => {
    return sensors.keys();
  });

  function updateSensor(sensorId: string, meas: MeasResult): void {
    sensors.set(sensorId, meas);
  }

  return { measResult, updateSensor, clients };
});
