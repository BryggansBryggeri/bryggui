<template>
  <div class="flex flex-col justify-between h-screen">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { StoreApi } from "@/store/api";
import { eventbus } from "@/eventbus";
import Footer from "@/components/layouts/Footer.vue";
import Nav from "@/components/layouts/Nav.vue";

export default defineComponent({
  components: {
    Footer,
    Nav,
  },
  setup() {
    eventbus.start();
    const store = useStore();
    const storeApi = new StoreApi();
    const loading = computed(() => store.state.loading);
    const natsClientStatus = computed(() => storeApi.getNatsClientStatus());
    onMounted(() => {
      storeApi.fauxLoading();
    });
    const mashTemp = computed(() => storeApi.getSensorValue("mash_temp"));
    const boilTemp = computed(() => storeApi.getSensorValue("boil_temp"));
    const activeSensors = computed(() => Array.from(storeApi.sensorClients()));
    return { loading, mashTemp, boilTemp, natsClientStatus, activeSensors };
  },
});
</script>
