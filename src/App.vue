<script setup>
import TaskModule from "@/components/TaskModule.vue";
import { computed, ref } from "vue";

const taskModuleNames = ref([]);
const currentTaskModule = ref("");

const taskModuleButtons = computed(() => {
  const buttons = [
    {
      label: "all",
      action: () => {
        currentTaskModule.value = "";
      },
    },
  ];
  taskModuleNames.value.forEach((item) => {
    buttons.push({
      label: item,
      action: () => {
        currentTaskModule.value = item;
      },
    });
  });
  return buttons;
});

const newTaskModule = ref("");

const addTaskModule = () => {
  taskModuleNames.value.push(newTaskModule.value);
  newTaskModule.value = "";
};
</script>

<template>
  <input type="text" v-model="newTaskModule" />
  <button @click.prevent="addTaskModule">Ajouter une liste</button>
  <section class="columns">
    <div class="left-container">
      <button
        v-for="(button, index) in taskModuleButtons"
        @click.prevent="button.action"
        :key="index"
      >
        {{ button.label }}
      </button>
    </div>
    <div>
      <div v-if="currentTaskModule === ''">
        <TaskModule
          v-for="(title, index) in taskModuleNames"
          :key="index"
          :title="title"
        />
      </div>
      <div v-else>
        <TaskModule :title="currentTaskModule" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.columns {
  display: flex;
  height: 100%;
}

.left-container {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
}
</style>
