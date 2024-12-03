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
    <slot name="title" :title="task.title">
      <span>{{ task.title }}</span>
    </slot>
    <slot name="content" :content="task.content">
      <p>{{ task.content }}</p>
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
}

.important {
  border: 5px solid red;
}

.item p {
  margin: 0;
  padding-top: 10px;
}
</style>
