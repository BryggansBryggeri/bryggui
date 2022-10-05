<template>
  <div class="h-screen flex flex-col justify-between">
    <Navbar />
    <!-- Send Nats Client Status as a prop?-->
    <div class="bg-base-100" />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { eventbus } from "@/eventbus";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  components: { Navbar, Footer },
  setup() {
    eventbus.start();
    return {};
  },
});
</script>
<script setup lang="ts"></script>
