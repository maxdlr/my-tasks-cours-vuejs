<script setup>
import { defineProps } from "vue";

defineProps({
  task: {
    type: { title: String, content: String, important: Boolean },
    required: true,
  },
});
</script>

<template>
  <div
    :class="{
      important: task.important,
    }"
    class="item"
  >
    <span>{{ task.title }}</span>
    <p>{{ task.content }}</p>
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
}

.important {
  border: 5px solid red;
}

.item p {
  margin: 0;
  padding-top: 10px;
}
</style>
