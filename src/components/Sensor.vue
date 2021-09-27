<template>
  <div class="container mx-auto mt-4">
    <p class="has-text-centered mt-2">{{ id }}: {{ val }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { StoreApi } from "@/store/api";
import { eventbus } from "@/eventbus";

export default defineComponent({
  components: {},
  props: {
    id: String,
  },
  setup(props) {
    const store = useStore();
    const storeApi = new StoreApi();
    const id = props.id;
    const val = computed(() => storeApi.getSensorValue(id));
    return { id, val };
  },
});
</script>
