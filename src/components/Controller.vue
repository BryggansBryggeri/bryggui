<template>
  <div class="container mx-auto mt-4">
    <p class="mt-2 has-text-centered">
      {{ id }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { StoreApi } from "@/store/api";
import { eventbus } from "@/eventbus";
import type { ControllerProps } from "@/models/controller";

export default defineComponent({
  components: {},
  props: {
    contrProps: { type: ControllerProps, required: true },
  },
  setup(props) {
    eventbus.startController(props, 0.0);
    const storeApi = new StoreApi();
    const val = 3;
    const id = "dump";
    return { val, id };
  },
});
</script>
