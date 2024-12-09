<script setup>
import { onMounted, ref } from "vue";

const data = ref([]);
const isLoading = ref(false);

const getData = async () => {
  isLoading.value = true;
  setTimeout(async () => {
    const fetched = await fetch("https://jsonplaceholder.typicode.com/posts");
    data.value = await fetched.json();
    isLoading.value = false;
  }, 2000);
};

onMounted(async () => {
  await getData();
});
</script>

<template>
  <div v-if="isLoading">LOADING</div>
  <div v-else>
    <div v-for="post in data" :key="post.id">
      <span>{{ post.id }}</span>
      <span> - {{ post.title }}</span>
    </div>
  </div>
</template>

<style scoped></style>
