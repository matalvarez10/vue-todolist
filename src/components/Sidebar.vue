<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, watchEffect } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ProjectContainer from "./ProjectContainer.vue";
import { Project } from "@/utils/project";
import { v4 as uuidv4 } from "uuid";
import { useRoute } from "vue-router";

const props = defineProps({
  allProjects: Object,
});
const route = useRoute();
const showInputProject = ref(false);
const showProjectSection = ref(false);
const projectAux = ref(new Project("", ""));
const routeName = ref(route.params);
const emit = defineEmits(["handleProjectAdd", "handleDeleteProject"]);

const handleSubmitProject = () => {
  projectAux.value.id = uuidv4();
  emit("handleProjectAdd", projectAux.value);
  projectAux.value = new Project("", "");
  showInputProject.value = false;
};

const forwardDeleteProject = (idProject: string) => {
  emit("handleDeleteProject", idProject);
};

const handleShowProjectInput = () => {
  showInputProject.value = !showInputProject.value;
};
const handleProjectSection = () => {
  showProjectSection.value = !showProjectSection.value;
};

watchEffect(() => {
  if (route.params !== routeName.value) {
    routeName.value = route.params;
  }
});
library.add(fas);
</script>

<template>
  <aside>
    <RouterLink
      to="/tasks/all"
      :class="`icon main ${routeName.typeTask === 'all' ? 'active' : ''}`"
    >
      <font-awesome-icon :icon="['fas', 'check']" />
      <p to="/tasks/all" class="custom-link">Home</p>
    </RouterLink>
    <RouterLink
      to="/tasks/today"
      :class="`icon main ${routeName.typeTask === 'today' ? 'active' : ''}`"
    >
      <font-awesome-icon :icon="['fas', 'calendar-day']" />
      <p to="/tasks/today" class="custom-link">Today</p>
    </RouterLink>
    <RouterLink
      to="/tasks/week"
      :class="`icon main ${routeName.typeTask === 'week' ? 'active' : ''}`"
    >
      <font-awesome-icon :icon="['fas', 'calendar-week']" />
      <p to="/tasks/week" class="custom-link">Week</p>
    </RouterLink>
    <div
      class="icon"
      value="project-section"
      @click="handleProjectSection"
      :class="`icon main ${routeName.id ? 'active' : ''}`"
    >
      <font-awesome-icon :icon="['fas', 'book']" />
      <p class="custom-link">Projects</p>
    </div>
    <Transition name="slide">
      <div v-if="showProjectSection" id="projects">
        <button @click="handleShowProjectInput" id="add-project">
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span> Add Project</span>
        </button>
        <Transition name="slide">
          <div id="wrap-hide" v-if="showInputProject">
            <input
              type="text"
              id="project-input"
              placeholder="Enter project name"
              v-model="projectAux.nombre"
            />
            <button id="project-confirm" @click="handleSubmitProject">
              Confirm
            </button>
          </div>
        </Transition>
        <ProjectContainer
          v-for="project in allProjects"
          @forwardDeleteProject="forwardDeleteProject"
          :key="project.id"
          :project="project"
        />
      </div>
    </Transition>
  </aside>
</template>

<style scoped>
aside {
  font-family: "Lexend";
  padding-top: 100px;
  background-color: #eeeee3;
  width: 250px;
  display: flex;
  flex-direction: column;
}

svg {
  color: #d10000;
  cursor: pointer;
}
.icon {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  padding: 5px;
  height: 40px;
  text-decoration: none;
  color: black;
}
.icon > svg {
  font-size: 1.5rem;
  margin-left: 30px;
}
.custom-link {
  font-size: 1.2rem;
  margin-left: 10px;
}

#projects {
  /* max-height: 0; */
  overflow: hidden;
  margin-top: -10px;
  transition: max-height 0.2s linear;
}

#add-project {
  background-color: inherit;
  font-family: "Lexend";
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 35px;
  margin-bottom: 5px;
}

#project-input {
  width: 70%;
  border: 0.5px solid #d4d4d4;
  border-radius: 5px;
  height: 25px;
  margin: 5px 0 5px 35px;
  font-family: inherit;
  padding-left: 5px;
  background-color: inherit;
}
#project-confirm {
  margin-left: 45px;
  font-family: inherit;
  background-color: #d10000;
  font-size: 0.8rem;
  border: none;
  height: 25px;
  width: 100px;
  color: #eeeee3;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
}

#project-confirm:hover {
  background-color: #d4d4d4;
  color: black;
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.1s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 1000px;
}
/* ////////////////////////////////////////////////////////// */
.active {
  background-color: #6a5acd;
  color: white !important;
}
</style>
