<template>
  <div class="container mx-auto mt-4">
    <p class="mt-2 has-text-centered">
      {{ id }}: {{ valDisp }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { StoreApi } from "@/store/api";
import { match } from "@/models/result";

export default defineComponent({
  components: {},
  props: {
    id: { type: String, required: true },
  },
  setup(props) {
    const storeApi = new StoreApi();
    const val = computed(() => {
      const raw = storeApi.getActorValue(props.id);
      if (raw !== undefined) {
        return match(
          raw,
          (ok) => `${ok[0] * 100}%`,
          (err) => `${err}`
        );
      } else {
        return "Inactive";
      }
    });

    const valDisp = val;
    return { valDisp };
  },
});
</script>
