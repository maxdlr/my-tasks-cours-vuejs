<script setup>
import { ref } from "vue";
import TaskList from "@/components/TaskList.vue";
import TaskForm from "@/components/TaskForm.vue";
import { defineProps } from "vue";

defineProps({
  title: { type: String },
});

const list = ref([
  {
    title: "example",
    content: "content",
    important: false,
  },
  {
    title: "example",
    content: "content",
    important: true,
  },
  {
    title: "example",
    content: "content",
    important: false,
  },
  {
    title: "example",
    content: "content",
    important: false,
  },
]);

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
