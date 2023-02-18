<template>
  <div class="flex flex-col w-full">
    <h3>Active clients:</h3>
    <h4>Controllers</h4>
    <li v-for="contr in controllers" :key="contr">
      {{ contr }}
    </li>
    <h4>Sensors</h4>
    <li v-for="sensor in sensors" :key="sensor">
      {{ sensor }}
    </li>
    <h4>Actors</h4>
    <li v-for="actor in actors" :key="actor">
      {{ actor }}
    </li>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { StoreApi } from "@/store/api";

export default defineComponent({
  setup() {
    const storeApi = new StoreApi();
    const controllers = computed(() =>
      Array.from(storeApi.getActiveClients().controllers)
    );
    const sensors = computed(() =>
      Array.from(storeApi.getActiveClients().sensors)
    );
    const actors = computed(() =>
      Array.from(storeApi.getActiveClients().actors)
    );
    return { controllers, sensors, actors };
  },
});
</script>
