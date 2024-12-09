<script setup>
import { defineProps } from "vue";
import _ from "lodash";
defineProps({
  label: { type: String },
  bgColor: { type: String, default: "gray-500" },
  textColor: { type: String, default: "white" },
  hoverTextColor: { type: String, default: "" },
});
</script>

<template>
  <button
    :class="`bg-${bgColor} text-${textColor} hover:text-${hoverTextColor}`"
    class="px-2 py-2 rounded-2xl"
  >
    <span class="flex">
      <span>{{ _.upperFirst(label) }}</span>
      <slot name="icon" />
    </span>
  </button>
</template>
