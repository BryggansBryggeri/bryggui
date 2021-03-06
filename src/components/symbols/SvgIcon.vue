<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="cssClass"
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke-linecap="round" stroke-linejoin="round" :d="path"></path>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IconName } from "@/utils";

@Component({
  components: {},
})
export default class SvgIcon extends Vue {
  @Prop({ required: true }) name!: IconName;

  @Prop({ default: "4" }) size!: string;

  @Prop({ default: null }) color!: string;

  @Prop({ default: "2" }) stroke!: string;

  @Prop() tailwind!: string;

  get iconColor(): string {
    if (this.color) {
      return `text-${this.color}`;
    }
    return "";
  }

  get cssClass(): string {
    if (this.tailwind) {
      return this.tailwind;
    }
    return `h-${this.size} w-${this.size} stroke-${this.stroke} ${this.iconColor}`;
  }

  get path(): string {
    return this.icons[this.name];
  }

  get dimension(): string {
    return `h-${this.size} w-${this.size}`;
  }

  private icons = {
    check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    cross: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    exclamation: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    power: "M13 10V3L4 14h7v7l9-11h-7z",
    temp: "M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5",
    chevronRight: "M9 5l7 7-7 7",
    chevronDown: "M19 9l-7 7-7-7",
    moon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    sun:
      "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    git:
      "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
    book:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    dashboard:
      "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
  } as const;
}
</script>
