<template>
  <nav>
    <div
      id="Navbar"
      class="
        relative
        z-50
        flex flex-row
        items-center
        justify-between
        w-full
        px-6
        py-3
        mx-auto
        mb-4
        align-middle
        bg-white
        border-t-2 border-green-800
        shadow-lg
        dark:bg-blue-gray-900
      "
    >
      <h4 class="text-xl font-bold leading-tight underline logo">
        BryggIO
      </h4>
      <div class="flex flex-row items-center space-x-6 text-sm">
        <button
          class=""
          @click="toggle"
        >
          <ArrowsExpandIcon class="w-5 h-5" />
        </button>
        <button
          class="focus:outline-none focus:ring-0"
          @click="toggleDark()"
        >
          <div
            v-if="isDark"
            class="transition duration-150 hover:text-yellow-600"
          >
            <SunIcon class="w-6 h-6" />
          </div>
          <div
            v-else
            class="transition duration-150 hover:text-indigo-400"
          >
            <MoonIcon class="w-6 h-6" />
          </div>
        </button>
        <router-link
          class="
            flex flex-row
            space-x-2
            transition
            duration-150
            ease-in-out
            rounded
            focus:outline-none
            hover:text-indigo-400
          "
          to="/"
        >
          <svg-icon
            name="dashboard"
            size="5"
          />
          <p>Dashboard</p>
        </router-link>
      </div>
    </div>
  </nav>

  <div class="container mx-auto mt-4">
    <h1 class="p-2 is-size-3 has-text-centered has-text-weight-bold">
      This iteration: Vue 3/Vuex 4/ts/vite/Composition API
    </h1>
    <div v-if="loading">
      <h3 class="mt-4 has-text-centered">
        Loading...
      </h3>
    </div>
    <div v-else>
      <sensor id="mash_temp" />
      <sensor id="boil_temp" />
      <p class="mt-2 has-text-centered">
        NatsClientStatus: {{ natsClientStatus }}
      </p>
      <h3>Active sensors:</h3>
      <li
        v-for="sensorClient in activeSensors"
        :key="sensorClient"
      >
        {{ sensorClient }}
      </li>
    </div>
  </div>
  <Switch />
</template>

<script setup lang="ts">
import Switch from "@/components/utils/Switch.vue";
import { SunIcon, MoonIcon, ArrowsExpandIcon } from "@heroicons/vue/outline";
import { useDark, useToggle, useFullscreen } from "@vueuse/core";

const { isFullscreen, enter, exit, toggle } = useFullscreen();

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import { StoreApi } from "@/store/api";
import { eventbus } from "@/eventbus";
import Sensor from "@/components/Sensor.vue";

export default defineComponent({
  components: { Sensor },
  setup() {
    eventbus.start();
    const store = useStore();
    const storeApi = new StoreApi();
    const loading = computed(() => store.state.loading);
    const natsClientStatus = computed(() => storeApi.getNatsClientStatus());
    onMounted(() => {
      storeApi.fauxLoading();
    });
    const activeSensors = computed(() => Array.from(storeApi.sensorClients()));
    return { loading, natsClientStatus, activeSensors };
  },
});
</script>
