<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import HeaderComp from "./HeaderComp.vue";
import { RouterLink, RouterView } from "vue-router";
import { AllTasks, Task } from "@/utils/task";
import { AllProjects, Project } from "@/utils/project";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const allTasksState = ref(new AllTasks([]));
const allProjectsState = ref(new AllProjects([]));
const menuToggle = ref(true);

const handleAdd = (task: Task) => {
  const taskAux = new Task(
    task.name,
    task.completed,
    task.description,
    task.date,
    task.id,
    task.idProject
  );
  allTasksState.value.addTask(taskAux);
};
const handleProjectAdd = (project: Project) => {
  const projectAux = new Project(project.id, project.nombre);
  allProjectsState.value.addProject(projectAux);
};

const handleDelete = (id: string) => {
  allTasksState.value.removeTask(id);
};
const handleUpdate = (
  id: string,
  description: string,
  date: string,
  name: string
) => {
  allTasksState.value.updateTask(id, description, date, name);
};

const handleDeleteProject = (idProject: string) => {
  allProjectsState.value.removeProject(idProject);
  allTasksState.value.removeProjectsById(idProject);
  router.push("/tasks/all");
};
const handleCompleted = (isCompleted: boolean, id: string) => {
  allTasksState.value.updateCompleted(isCompleted, id);
};
const handleMenuShow = () => {
  menuToggle.value = true;
};
const handleMenuHide = () => {
  menuToggle.value = false;
};
const handleMenuToggle = () => {
  menuToggle.value = !menuToggle.value;
};
</script>

<template>
  <div id="layout-content">
    <HeaderComp
    @handleMenuHide="handleMenuHide"
    @handleMenuShow="handleMenuShow"
    @handleMenuToggle="handleMenuToggle"
    />
    <Sidebar
      v-if="menuToggle"
      @handleProjectAdd="handleProjectAdd"
      @handleDeleteProject="handleDeleteProject"
      :allProjects="allProjectsState.projects"
    />
    <router-view
      :allTasks="allTasksState"
      @handleAdd="handleAdd"
      @handleDelete="handleDelete"
      @handleUpdate="handleUpdate"
      @handleCompleted="handleCompleted"
    ></router-view>
  </div>
</template>
