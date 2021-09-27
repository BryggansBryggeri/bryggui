<template>
  <div class="container mx-auto mt-4">
    <p class="has-text-centered mt-2">
      {{ id }}: {{ val }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { StoreApi } from "@/store/api";

export default defineComponent({
  components: {},
  props: {
    id: String,
  },
  setup(props) {
    const storeApi = new StoreApi();
    const val = computed(() => storeApi.getSensorValue(props.id));
    return { val };
  },
});
</script>
