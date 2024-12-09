<script setup>
import { defineProps, defineEmits, defineModel, ref } from "vue";
import DataTableButton from "@/components/DataTableButton.vue";
import _ from "lodash";
defineProps({
  options: { type: Array, required: true },
  allowAll: { type: Boolean, default: true },
  label: { type: String, required: true },
  bgColor: { type: String },
});
const isListShown = ref(false);

const emit = defineEmits(["selected"]);

const selection = defineModel("selection", { type: String });

const handleSelection = (option) => {
  emit("selected", option);
  selection.value = option;
  isListShown.value = false;
};
</script>

<template>
  <div>
    <DataTableButton
      :label="selection ?? label"
      @click.prevent="isListShown = !isListShown"
      :bg-color="bgColor"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </template>
    </DataTableButton>

    <div v-if="isListShown">
      <ul class="px-2 py-2 flex flex-col justify-start items-start">
        <li @click.prevent="handleSelection('')" v-if="allowAll">
          <button
            class="bg-gray-200 hover:bg-gray-400 py-2 px-2 rounded-xl my-1"
          >
            All
          </button>
        </li>

        <li
          v-for="(option, index) in options"
          :key="index"
          @click.prevent="handleSelection(option)"
        >
          <button
            class="bg-gray-200 hover:bg-gray-400 py-2 px-2 rounded-xl my-1"
          >
            {{ _.upperFirst(option) }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
