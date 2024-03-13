import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { ContrResult } from "@/models/controller";

export const useContrStore = defineStore("controller", () => {
  // Use list instead? Then ID must be part of ContrResult
  const controllers: Map<string, ContrResult> = reactive(new Map());

  const contrResult = computed(() => {
    return (contrId: string): ContrResult | undefined =>
      controllers.get(contrId);
  });

  const clients = computed(() => {
    return controllers.keys();
  });

  function updateContr(contrId: string, res: ContrResult): void {
    controllers.set(contrId, res);
  }

  function removeClient(contrId: string): void {
    controllers.delete(contrId);
  }

  function isActive(contrId: string): boolean {
    return controllers.has(contrId);
  }

  return { contrResult, updateContr, isActive, clients, removeClient };
});
