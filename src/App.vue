<template>
  <div class="h-screen flex flex-col justify-between">
    <Navbar >
      <slot>
        Connection Status: {{ natsClientStatus }}
      </slot>
    </Navbar>
  <div class="bg-base-100">
  </div>
     <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { eventbus } from "@/eventbus";
import { StoreApi } from "@/store/api";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  components: { Navbar, Footer, },
  setup() {
    eventbus.start();
    const storeApi = new StoreApi();
    const loading = computed(() => storeApi.isLoading());
    const natsClientStatus = computed(() => storeApi.getNatsClientStatus());
    onMounted(() => {
      storeApi.fauxLoading();
    });
    return { loading, natsClientStatus};
  },
});

</script>
<script setup lang="ts">

</script>
