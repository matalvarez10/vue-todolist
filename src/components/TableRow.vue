<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TaskForm from "./TaskForm.vue";
import { ref, type PropType } from "vue";
import { Task } from "@/utils/task";

library.add(fas);
const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    default: null, // Add a default value here or adjust it as needed
  },
  modalTrigger: Boolean
});
const emit = defineEmits([
  "forwardDelete",
  "forwardUpdate",
  "handleModal",
  "forwardUpdateCompleted",
]);
const isCompleted = ref(props.task.completed);
const forwardHandleModal = () => {
    emit('handleModal');
}
const forwardUpdate = (
  id: string,
  description: string,
  date: string,
  name: string
) => {
  emit("forwardUpdate", id, description, date, name);
};
const someFunction = (payload: Event | null) => {
    if (payload) {
        const checkbox = payload.target as HTMLInputElement; // Cast the target to HTMLInputElement
        emit("forwardUpdateCompleted", checkbox.checked, props.task.id);
    }
}
</script>


<template>
  <td>
    <input
      type="checkbox"
      name="completed"
      v-model="isCompleted"
      @change="someFunction"
      :checked="task.completed"
    />
  </td>
  <td :class="!isCompleted ? '' : 'texto-tachado'">{{ task.name }}</td>
  <td :class="!isCompleted ? '' : 'texto-tachado'">{{ task.date }}</td>
  <td>
    <button @click="emit('forwardDelete', task.id)">
      <font-awesome-icon :icon="['fas', 'trash-can']" />
    </button>
  </td>
  <td>
    <button @click="emit('handleModal')">
      <font-awesome-icon :icon="['fas', 'pen-to-square']" />
    </button>
  </td>
  <TaskForm
    v-if="modalTrigger"
    @handleModal="forwardHandleModal"
    @forwardUpdate="forwardUpdate"
    :isUpdate="true"
    :id="task.id"
  />
</template>

<style scoped>
.texto-tachado {
  text-decoration: line-through;
  color: gray;
}
</style>