<script setup>
import TaskItem from "@/components/TaskItem.vue";
import { defineProps } from "vue";

defineProps({
  list: { type: Array, required: true },
});
</script>

<template>
  <div class="container">
    <div v-for="(item, index) in list" :key="index">
      <TaskItem :task="item">
        <template #title="slotProps">
          <button @click.prevent="() => console.log('bonjour')">
            {{ slotProps.title }}
          </button>
        </template>
      </TaskItem>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
