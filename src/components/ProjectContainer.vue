<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Project } from "@/utils/project";

const { project } = defineProps<{
  project: Project;
}>();
const emit = defineEmits(["forwardDeleteProject"]);
const hover = ref(false);
const handleMouseOver = () => {
  hover.value = true; // Toggle the hover value
};
const handleMouseLeave = () => {
  hover.value = false;
};
library.add(fas);
</script>

<template>
  <div
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    class="project-container"
  >
    <font-awesome-icon :icon="['fas', 'list-ol']" />
    <RouterLink class="no-decoration" :to="`/projects/${project.id}`">{{
      project.nombre
    }}</RouterLink>
    <font-awesome-icon
      v-if="hover"
      class="deleteWrapper"
      @click="emit('forwardDeleteProject', project.id)"
      :icon="['fas', 'trash-can']"
    />
  </div>
</template>

<style scoped>
.project-container {
  font-size: 14px;
  margin: 2px 0 2px 45px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: relative;
}

.project-container > svg {
  margin-top: 2px;
}
.deleteWrapper {
  position: absolute;
  right: 40px;
  cursor: pointer;
  margin-top: 2px;
}

.no-decoration {
  text-decoration: none;
  color: black;
}
svg {
  color: #d10000;
}

@media (max-width: 768px) {
  .project-container {
    font-size: 0.8rem;
    margin: 2px 0 2px 5px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    position: relative;
  }

  .project-container > svg {
    margin-top: 2px;
  }
  .deleteWrapper {
    position: absolute;
    right: 5px;
    cursor: pointer;
    margin-top: 2px;
  }
  svg {
  font-size: 0.8rem;
}
}
</style>
