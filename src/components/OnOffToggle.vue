<template>
  <!-- <div class="flex flex-row space-x-4">
    <div class="flex flex-row justify-between items-center">
      <div
        class="
          ml-3
          w-10
          h-6
          flex
          items-center
          rounded-full
          p-1
          border-2 border-gray-500
          duration-300
          ease-in-out
        "
        :class="{
          'bg-red-600': !state,
          'bg-green-600': state,
        }"
      >
        <div
          class="w-4 h-4 bg-white rounded-full shadow-lg transform duration-300 ease-in-out"
          :class="{
            'translate-x-4': state,
          }"
        ></div>
      </div>
    </div>
  </div> -->
  <!-- <label class="switch" @click.prevent> -->
  <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    state: { type: Boolean, required: true },
  },
  setup(props) {
    const state = computed(() => props.state);
    return { state };
  },
});
// import { Component, Emit, Prop, Vue } from "vue-property-decorator";
// // import { ToggleType } from "@/utils";
// 
// @Component({
//   components: {},
// })
// export default class Toggle extends Vue {
//   // @Prop({ required: true }) ToggleType!: ToggleType;
// 
//   @Prop({ default: false }) state!: boolean;
// 
//   @Emit()
//   private click(): void {
//     // click logic in parent comp.
//   }
// }
</script>

<style>
 /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

/*
input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}
*/

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
