import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { ActorResult } from "@/models/actor";

export const useActorsStore = defineStore("actor", () => {
  const actors: Map<string, ActorResult> = reactive(new Map());

  const actorResult = computed(() => {
    return (actorId: string): ActorResult | undefined => actors.get(actorId);
  });

  function updateActor(actorId: string, res: ActorResult): void {
    actors.set(actorId, res);
  }

  const clients = computed(() => {
    return actors.keys();
  });

  return { actorResult, updateActor, clients };
});
