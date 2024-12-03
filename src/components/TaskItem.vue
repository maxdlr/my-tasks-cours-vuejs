<script setup>
import { defineProps } from "vue";

defineProps({
  task: {
    type: {
      id: Number,
      userId: Number,
      title: String,
      body: String,
    },
    required: true,
  },
});
</script>

<template>
  <div class="item">
    <h2>{{ task.id }}</h2>
    <slot name="title" :title="task.title">
      <span>{{ task.title }}</span>
    </slot>
    <slot name="body" :body="task.body">
      <p>{{ task.body }}</p>
    </slot>
  </div>
</template>

<style scoped>
.item {
  padding: 10px 10px;
  border-radius: 20px;
  border: 5px solid blue;
  width: fit-content;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  max-width: 25%;
}

.item p {
  margin: 0;
  padding-top: 10px;
}
</style>
