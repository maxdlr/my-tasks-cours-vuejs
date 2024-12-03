<script setup>
import TaskForm from "@/components/TaskForm.vue";
import TaskList from "@/components/TaskList.vue";
import { ref, onMounted } from "vue";

const list = ref([]);

const add = (task) => {
  list.value.push(task);
  console.log(list.value);
};

const isLoading = ref(false);

const getData = async () => {
  isLoading.value = true;
  setTimeout(async () => {
    const fetched = await fetch("https://jsonplaceholder.typicode.com/posts");
    list.value = await fetched.json();
    isLoading.value = false;
  }, 2000);
};

onMounted(async () => {
  await getData();
});
</script>

<template>
  <TaskForm @add="add" />
  <button @click.prevent="getData">REFRESH</button>
  <div>
    <div
      v-if="isLoading"
      style="
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <span>LOADING</span>
    </div>
    <TaskList v-else :list="list" />
  </div>
</template>

<style scoped></style>
