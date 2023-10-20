<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import TaskForm from "./TaskForm.vue";
import { AllTasks, Task } from "@/utils/task";
import { useRoute } from "vue-router";
import TableTasks from "./TableTasks.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const route = useRoute();

const { allTasks } = defineProps(["allTasks"]);
const emit = defineEmits([
  "handleAdd",
  "handleDelete",
  "handleUpdate",
  "handleCompleted",
]);
const routeName = ref(route.params.typeTask);
const routeIdProject = ref(route.params.id);
const modalTrigger = ref(false);

const forwardDelete = (id: string) => {
  emit("handleDelete", id);
};
const forwardUpdate = (
  id: string,
  description: string,
  date: string,
  name: string
) => {
  emit("handleUpdate", id, description, date, name);
};

watchEffect(() => {
  if (route.params.typeTask !== routeName.value) {
    routeName.value = route.params.typeTask;
  }
  if (route.params.id !== routeIdProject.value) {
    routeIdProject.value = route.params.id;
  }
});
const forwardHandleAdd = (task: Task) => {
  emit("handleAdd", task);
  modalTrigger.value = false;
};
const forwardUpdateCompleted = (isCompleted:boolean,id: string) => {
  emit("handleCompleted", isCompleted,id);
  modalTrigger.value = false;
};

const handleModal = () => {
  modalTrigger.value = !modalTrigger.value;
};
library.add(fas);
</script>
<template>
  <main>
    <div id="main-header">
      <h1 v-if="!routeIdProject">
        {{
          routeName.toString().charAt(0).toUpperCase() +
          routeName.toString().slice(1)
        }}
        Tasks
      </h1>
      <h2 v-else>Project Tasks: {{ routeIdProject }}</h2>
      <button @click="handleModal">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <span> Add Task</span>
      </button>
    </div>
    <TaskForm
      v-if="modalTrigger"
      @forwardHandleAdd="forwardHandleAdd"
      @handleModal="handleModal"
      :routeIdProject="routeIdProject"
      :isUpdate="false"
    />
    <div>
      <TableTasks
        v-if="routeName === 'all'"
        :filterTasks="allTasks.tasks"
        title="all"
        @forwardDelete="forwardDelete"
        @forwardHandleAdd="forwardHandleAdd"
        @forwardUpdate="forwardUpdate"
        @forwardUpdateCompleted="forwardUpdateCompleted"
      />
      <TableTasks
        v-if="routeName === 'week'"
        :filterTasks="allTasks.weekTasks"
        title="week"
        @forwardDelete="forwardDelete"
        @forwardHandleAdd="forwardHandleAdd"
        @forwardUpdate="forwardUpdate"
        @forwardUpdateCompleted="forwardUpdateCompleted"

      />
      <TableTasks
        v-if="routeName === 'today'"
        :filterTasks="allTasks.dayTasks"
        title="today"
        @forwardDelete="forwardDelete"
        @forwardHandleAdd="forwardHandleAdd"
        @forwardUpdate="forwardUpdate"
        @forwardUpdateCompleted="forwardUpdateCompleted"

      />
      <TableTasks
        v-if="route.params.id !== undefined"
        :filterTasks="allTasks.tasks.filter((task : Task) =>task.idProject === route.params.id)"
        title="Project view"
        :idProject="route.params.id"
        @forwardDelete="forwardDelete"
        @forwardHandleAdd="forwardHandleAdd"
        @forwardUpdate="forwardUpdate"
        @forwardUpdateCompleted="forwardUpdateCompleted"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #f2f2f2;
  width: 100%;
  padding-top: 70px;
  position: relative;
}

#main-header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 30px;
}

button {
  font-family: "Lexend";
  font-size: 1.2rem;
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  color: gray;
  scale: 1.1;
}

svg {
  color: #d10000;
  cursor: pointer;
}
</style>
