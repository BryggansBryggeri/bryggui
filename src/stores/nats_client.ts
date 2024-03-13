import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { NatsClientStatus } from "@/nats_setup";

export const useNatsClientStore = defineStore("nats_client", () => {
  const loading: Ref<boolean> = ref(false);
  const status: Ref<NatsClientStatus> = ref(NatsClientStatus.Connecting);

  function setStatusReady(): void {
    status.value = NatsClientStatus.Ready;
  }

  function setStatusError(): void {
    status.value = NatsClientStatus.Error;
  }

  return { loading, status, setStatusError, setStatusReady };
});
