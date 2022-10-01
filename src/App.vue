<template>
  <div class="h-screen flex flex-col justify-between">
    <Navbar />
  <div class="bg-base-100">
  </div>
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
<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { usePreferredColorScheme } from '@vueuse/core'

const isDark = useDark();
const toggleDark = useToggle(isDark);
const colorScheme = usePreferredColorScheme()

</script>
