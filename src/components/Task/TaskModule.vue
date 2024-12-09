<script setup>
import { ref } from "vue";
import TaskList from "@/components/Task/TaskList.vue";
import TaskForm from "@/components/Task/TaskForm.vue";
import { defineProps } from "vue";

defineProps({
  title: { type: String },
});

const list = ref([]);

const add = (task) => {
  list.value.push(task);
  console.log(list.value);
};
</script>

<template>
  <h1 v-if="title">{{ title }}</h1>
  <TaskForm @add="add" />
  <TaskList :list="list" />
</template>

<style scoped></style>
