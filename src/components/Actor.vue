<template>
  <div class="container mx-auto mt-4">
    <div class="mt-2 has-text-centered">
      {{ id }}
    </div>
    <div v-if="!dispActor.isErr" class="mt-2 has-text-centered">
      {{ dispActor.val }}
    </div>
    <div v-else class="mt-2 has-text-centered">
      {{ dispActor.err }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { StoreApi } from "@/store/api";
import { match } from "@/models/result";
import { ActorResult } from "@/models/actor";

export default defineComponent({
  components: {},
  props: {
    id: { type: String, required: true },
  },
  setup(props) {
    const storeApi = new StoreApi();
    const dispActor = computed(() => {
      const res = storeApi.getActorValue(props.id);
      return dispActorFromApiRes(res);
    });

    return { dispActor };
  },
});

type DispActor = {
  isErr: boolean;
  val: string;
  err: string;
};

function dispActorFromApiRes(res: ActorResult | undefined): DispActor {
  if (res !== undefined) {
    return match(
      res,
      (ok): DispActor => {
        return { isErr: false, val: `${ok[0] * 100}%`, err: "" };
      },
      (err): DispActor => {
        return { isErr: true, val: "", err: `${err}` };
      }
    );
  } else {
    return { isErr: true, val: "", err: "Inactive" } as DispActor;
  }
}
</script>
