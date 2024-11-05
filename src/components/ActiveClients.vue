<template>
  <div class="flex flex-col w-full rounded-lg px-4 py-5">
    <div class="flex flex-col rounded-lg bg-base-200 p-4 space-y-4">
      <div class="divider">Clients</div>
      <div class="flex flex-col w-full">
        <h3 class="capitalize font-bold">Controllers</h3>
        <li v-for="contr in controllers" :key="contr">
          {{ contr }}
        </li>
        <h3 class="capitalize font-bold">Sensors</h3>
        <li v-for="sensor in sensors" :key="sensor">
          {{ sensor }}
        </li>
        <h3 class="capitalize font-bold">Actors</h3>
        <li v-for="actor in actors" :key="actor">
          {{ actor }}
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useContrStore } from "@/stores/controller";
import { useActorsStore } from "@/stores/actor";
import { useSensorsStore } from "@/stores/sensor";

export default defineComponent({
  setup() {
    const contrStore = useContrStore();
    const sensorStore = useSensorsStore();
    const actorStore = useActorsStore();
    const controllers = computed(() => Array.from(contrStore.clients));
    const sensors = computed(() => Array.from(sensorStore.clients));
    const actors = computed(() => Array.from(actorStore.clients));
    return { controllers, sensors, actors };
  },
});
</script>
