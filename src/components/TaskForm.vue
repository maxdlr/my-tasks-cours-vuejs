<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

const emit = defineEmits(["add"]);

const title = ref("");
const content = ref("");
const important = ref(false);

const handleAdd = () => {
  if (title.value === "" || content.value === "") {
    return;
  }

  const newTask = {
    title: title.value,

    content: content.value,
    important: important.value,
  };

  emit("add", newTask);

  title.value = "";
  content.value = "";
  important.value = false;
};
</script>

<template>
  <div>
    <input type="text" v-model="title" placeholder="title" />
    <input type="text" v-model="content" placeholder="content" />
    <input type="checkbox" v-model="important" />
    <button @click.prevent="handleAdd">Ajouter</button>
  </div>
</template>

<style scoped></style>
