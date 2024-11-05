<template>
  <div
    class="bg-neutral text-neutral-content flex flex-row justify-between p-6 mb-5"
  >
    <div class="flex-1">
      <p class="text-primary text-xl font-bold">BryggUI</p>
    </div>
    <div class="flex flex-none flex-row space-x-4">
      <!--We can do natsclientstatus, or a compound of several statuses here.
      Change icon depending on system status etc--->
      <div
        id="connection status"
        class="flex flex-row gap-2 bg-neutral-focus px-2 rounded-full items-center text-sm shadow-inner"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-warning animate-pulse"
        >
          <path
            d="M512 183.466667c149.333333 0 292.266667 46.933333 409.6 132.266666 19.2 12.8 23.466667 40.533333 8.533333 59.733334-12.8 19.2-40.533333 23.466667-59.733333 8.533333-102.4-74.666667-228.266667-115.2-358.4-115.2-130.133333 0-256 40.533333-358.4 115.2-19.2 12.8-44.8 8.533333-59.733333-8.533333-12.8-19.2-8.533333-44.8 8.533333-59.733334 119.466667-85.333333 260.266667-132.266667 409.6-132.266666z m0 170.666666c108.8 0 211.2 32 298.666667 91.733334 19.2 12.8 23.466667 40.533333 10.666666 59.733333-12.8 19.2-40.533333 23.466667-59.733333 10.666667-72.533333-51.2-160-78.933333-251.733333-78.933334-91.733333 0-177.066667 27.733333-249.6 76.8-19.2 12.8-44.8 8.533333-59.733334-10.666666-12.8-19.2-8.533333-44.8 10.666667-59.733334 89.6-57.6 192-89.6 300.8-89.6z m0 168.533334c23.466667 0 42.666667 19.2 42.666667 42.666666s-19.2 42.666667-42.666667 42.666667c-51.2 0-100.266667 14.933333-142.933333 40.533333-19.2 12.8-46.933333 6.4-57.6-14.933333-12.8-19.2-6.4-46.933333 14.933333-57.6 53.333333-34.133333 117.333333-53.333333 185.6-53.333333z m0 189.866666c34.133333 0 64 27.733333 64 64 0 34.133333-27.733333 64-64 64s-64-27.733333-64-64c0-34.133333 27.733333-64 64-64z m164.266667-106.666666l89.6 89.6 89.6-89.6c17.066667-17.066667 42.666667-17.066667 59.733333 0 17.066667 17.066667 17.066667 42.666667 0 59.733333l-89.6 89.6 89.6 89.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-17.066667 17.066667-42.666667 17.066667-59.733333 0l-89.6-89.6-89.6 89.6c-17.066667 17.066667-42.666667 17.066667-59.733334 0-17.066667-17.066667-17.066667-42.666667 0-59.733333l89.6-89.6-89.6-89.6c-17.066667-17.066667-17.066667-42.666667 0-59.733333 14.933333-17.066667 42.666667-17.066667 59.733334 0z "
          />
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path class="" d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line class="" x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
        <p>BryggIO server status: {{ natsClientStatus }}</p>
      </div>

      <div
        id="Theme Switcher"
        class="flex flex-row bg-neutral-focus p-2 rounded-full items-center shadow-inner"
      >
        <button
          class="transition transition-all"
          data-toggle-theme="emerald, dark"
          data-act-class="ACTIVECLASS"
          @click="toggleDark()"
        >
          <svg
            :class="{ hidden: !isDark }"
            class="transition transition-all w-6 h-6 hover:scale-125 hover:text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            :class="{ hidden: isDark }"
            class="transition transition-all w-6 h-6 hover:scale-125 hover:text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, defineComponent } from "vue";
import { themeChange } from "theme-change";
import { useToggle, useDark } from "@vueuse/core";
import { useNatsClientStore } from "@/stores/nats_client";

export default defineComponent({
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const [modeSwitcher, toggle] = useToggle();
    const store = useNatsClientStore();
    const natsClientStatus = computed(() => store.status);
    onMounted(() => {
      themeChange(false);
    });
    return { modeSwitcher, toggle, isDark, toggleDark, natsClientStatus };
  },
});
</script>
