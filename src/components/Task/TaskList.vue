<script setup>
import TaskItem from "@/components/Task/TaskItem.vue";
import { defineProps } from "vue";

defineProps({
  list: { type: Array, required: true },
});
</script>

<template>
  <div class="container">
    <TaskItem v-for="(item, index) in list" :key="index" :task="item">
      <template #title="slotProps">
        <h3>
          {{ slotProps.title }}
        </h3>
      </template>
    </TaskItem>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
}
</style>
