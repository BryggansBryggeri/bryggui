<template>
  <div class="flex flex-col justify-between h-screen">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
    return {};
  },
});
</script>
