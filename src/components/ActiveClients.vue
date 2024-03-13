<template>
  <div class="flex flex-col w-full">
    <h2>Active clients:</h2>
    <h3>Controllers</h3>
    <li v-for="contr in controllers" :key="contr">
      {{ contr }}
    </li>
    <h3>Sensors</h3>
    <li v-for="sensor in sensors" :key="sensor">
      {{ sensor }}
    </li>
    <h3>Actors</h3>
    <li v-for="actor in actors" :key="actor">
      {{ actor }}
    </li>
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
