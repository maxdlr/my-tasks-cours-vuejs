<script setup>
import makeData, { status } from "/src/composables/data.js";
import { onMounted, ref } from "vue";
import _ from "lodash";
import { formatDate, truncate } from "/src/composables/utils";
import DataTableButton from "@/components/DataTableButton.vue";
import DatatableFormInput from "@/components/DatatableFormInput.vue";
import DatatableFormDropdown from "@/components/DatatableFormDropdown.vue";

const data = ref([]);
const archive = ref([]);
const headers = ref([]);
const isFormVisible = ref(false);
const isLoading = ref(false);
const showRowId = ref(0);

const buildHeader = () => {
  const tempHeaders = [];
  for (const key in data.value[0]) {
    tempHeaders.push(key);
  }
  tempHeaders.push("Actions");
  headers.value = tempHeaders;
};

const deleteById = (id) => {
  data.value = data.value.filter((entry) => entry.id !== id);
};

const newItemRef = ref({
  title: "",
  description: "",
  status: "",
});

const findNonExistingId = () => {
  const ids = data.value.map((item) => item.id);
  ids.sort((a, b) => (a < b ? -1 : 1));
  return ids[ids.length - 1] + 1;
};

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    data.value = archive.value = makeData(100);
    buildHeader();
    isLoading.value = false;
  }, 4000);
});

const handleCreation = () => {
  isFormVisible.value = false;

  const newItem = {
    id: findNonExistingId(),
    title: newItemRef.value.title,
    author: {
      id: 1,
      name: "Max",
    },
    status: newItemRef.value.status,
    description: newItemRef.value.description,
    createdAt: new Date(),
  };

  data.value.push(newItem);

  newItemRef.value = {
    title: "",
    description: "",
    status: "",
  };
};

const currentOrderBy = ref("id");
const orderBy = (value) => {
  if (value === "author") {
    data.value.sort((a, b) => (a[value].name < b[value].name ? -1 : 1));
    return;
  }
  data.value.sort((a, b) => (a[value] < b[value] ? -1 : 1));
};

const filterBy = (value) => {
  data.value = archive.value;

  if (value === "") return;

  data.value = data.value.filter((entry) => entry.status === value);
};

const showRow = (id) => {
  if (showRowId.value === id) {
    showRowId.value = 0;
    return;
  }

  showRowId.value = id;
};
</script>

<template>
  <div class="flex justify-between items-start py-5 px-3">
    <DatatableFormDropdown
      :allow-all="false"
      label="Order by"
      :options="headers"
      v-model:selection="currentOrderBy"
      @selected="orderBy"
    />

    <div class="flex justify-center items-start gap-2">
      <DatatableFormDropdown
        label="Filter by Status"
        :options="Object.values(status)"
        @selected="filterBy"
      />
      <DataTableButton label="Clear" @click.prevent="data = archive" />
    </div>

    <DataTableButton
      label="Create"
      @click.prevent="isFormVisible = !isFormVisible"
    />
  </div>

  <div class="flex justify-center items-start my-8" v-if="isFormVisible">
    <div>
      <DatatableFormInput
        v-model="newItemRef.title"
        name="title"
        placeholder="Example de titre"
      />
      <DatatableFormInput
        v-model="newItemRef.description"
        name="description"
        placeholder="Example de Description"
      />
    </div>

    <DatatableFormDropdown
      :options="Object.values(status)"
      v-model:selection="newItemRef.status"
    />

    <DataTableButton
      v-if="
        newItemRef.title !== '' &&
        newItemRef.description !== '' &&
        newItemRef.status !== ''
      "
      label="Submit"
      class="my-5"
      click
      @click.prevent="handleCreation"
    />
  </div>

  <div
    v-if="isLoading"
    class="w-full h-[500px] flex justify-center items-center animate-spin"
  >
    <span class="w-[50px] h-[50px] bg-black" />
  </div>

  <table class="w-full" v-else>
    <thead>
      <tr>
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="py-3 px-3 bg-gray-300"
        >
          <span v-if="header === 'createdAt'"> Creation Date </span>
          <span v-else>
            {{ _.upperFirst(header) }}
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(entry, index) in data"
        :key="index"
        @click.prevent="showRow(entry.id)"
        class="hover:bg-gray-700 hover:text-white cursor-pointer"
        :class="{
          'bg-gray-200': index % 2 === 0,
        }"
      >
        <td
          :colspan="headers.length"
          v-if="showRowId === entry.id"
          class="p-10 bg-white text-black"
        >
          <div class="flex justify-between items-center">
            <div>
              <span class="text-xl block">
                {{ _.upperFirst(entry.author.name) }}
              </span>
              <small>Le {{ formatDate(entry.createdAt) }}</small>
            </div>
            <div>
              <span
                class="px-2 py-1 font-bold rounded-2xl text-white"
                :class="{
                  'bg-red-500': entry.status === 'deleted',
                  'bg-green-500': entry.status === 'published',
                  'bg-gray-500': entry.status === 'draft',
                }"
              >
                {{ _.upperFirst(entry.status) }}
              </span>
            </div>
          </div>
          <div>
            <span class="text-2xl block text-center mb-5">
              {{ _.upperFirst(entry.title) }}
            </span>
            <p>
              {{ entry.description }}
            </p>
          </div>
          <div class="flex justify-end items-center">
            <DataTableButton
              bg-color="red-500"
              hover-text-color="red-700"
              @click.prevent="deleteById(entry.id)"
              ><template #icon>
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </template>
            </DataTableButton>
          </div>
        </td>
        <td
          v-else
          v-for="(col, index0) in headers"
          :key="index0"
          class="py-2 px-2 border-b"
        >
          <span v-if="col === 'description'">
            {{ truncate(entry.description, 20) }}
          </span>

          <span v-else-if="col === 'author'">
            {{ _.upperFirst(entry.author.name) }}
          </span>

          <span v-else-if="col === 'createdAt'">
            {{ formatDate(entry.createdAt) }}
          </span>

          <span v-else-if="col === 'title'">
            {{ _.upperFirst(entry.title) }}
          </span>

          <span
            v-else-if="col === 'status'"
            class="px-2 py-1 rounded-2xl text-white"
            :class="{
              'bg-red-500': entry.status === 'deleted',
              'bg-green-500': entry.status === 'published',
              'bg-gray-500': entry.status === 'draft',
            }"
          >
            {{ _.upperFirst(entry.status) }}
          </span>

          <span v-else-if="col === 'Actions'">
            <DataTableButton
              bg-color="red-500"
              hover-text-color="red-700"
              @click.prevent="deleteById(entry.id)"
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </template>
            </DataTableButton>
          </span>

          <span v-else>
            {{ entry[col] }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
