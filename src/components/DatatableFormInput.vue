<script setup>
import { defineProps, defineModel } from "vue";
import _ from "lodash";
defineProps({
  name: { type: String, required: true },
  placeholder: { type: String },
});

const value = defineModel({ type: String, required: true });
</script>

<template>
  <div class="flex flex-col py-3 px-3">
    <label :for="name">{{ _.upperFirst(name) }}</label>
    <input
      v-model="value"
      type="text"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      class="border border-gray-500 rounded-xl px-3 py-2"
    />
  </div>
</template>
