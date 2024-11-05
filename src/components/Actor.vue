<template>
  <div
    class="flex bg-base-300 px-3 py-2 rounded-lg flex-col flex-none text-sm w-1/3"
  >
    <div class="capitalize">
      {{ prettify(id) }}
    </div>
    <div
      v-if="!dispActor.isErr"
      class="flex text-mono justify-end text-accent text-lg"
    >
      {{ dispActor.val }}
    </div>
    <div v-else class="flex text-mono justify-end text-accent text-lg">
      {{ dispActor.err }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useActorsStore } from "@/stores/actor";
import { match } from "@/models/result";
import { ActorResult } from "@/models/actor";

export default defineComponent({
  components: {},
  props: {
    id: { type: String, required: true },
  },
  setup(props) {
    const store = useActorsStore();
    const dispActor = computed(() => {
      const res = store.actorResult(props.id);
      return dispActorFromApiRes(res);
    });

    return { dispActor, prettify };
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
      },
    );
  } else {
    return { isErr: true, val: "", err: "Inactive" } as DispActor;
  }
}

function prettify(input: string): string {
  return input.replace("_", " ");
}
</script>
