<template>
<div class="bg-red-200 flex flex-row justify-between p-6 mt-2 mb-5">
  <div class="">
      <p>BryggIO/UI</p>
  </div>
  <div class="">
  </div>
  <div class="">
      Connection Status
  </div>
<button data-toggle-theme="retro, dark" data-act-class="ACTIVECLASS">Toggle</button>
</div>

</template>

<script lang="ts">


import { onMounted } from 'vue'
import { themeChange } from 'theme-change'

export default {
  setup() {
    onMounted(() => {
      themeChange(false)
    })
  },
}
</script>