<script setup lang="ts">
import { ref, type PropType } from "vue";
import TableRow from "./TableRow.vue";
const props = defineProps({
  filterTasks: Object,
  title: String,
  idProject: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined,
  },
});

const emit = defineEmits([
  "forwardDelete",
  "forwardHandleAdd",
  "forwardUpdate",
  "forwardUpdateCompleted"
]);

const modalTrigger = ref(false);

const handleModal = () => {
  modalTrigger.value = !modalTrigger.value;
};
const forwardUpdate = (
  id: string,
  description: string,
  date: string,
  name: string
) => {
  emit("forwardUpdate", id, description, date, name);
};

const forwardDelete = (id: string) => {
  emit("forwardDelete", id);
};

const forwardUpdateCompleted = (isCompleted:boolean,id: string) => {
  emit("forwardUpdateCompleted", isCompleted,id);
  modalTrigger.value = false;
};

</script>
<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Task</th>
        <th>Due Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in filterTasks" :key="task.id">
        <TableRow 
        @forwardDelete="forwardDelete"
        @forwardUpdate="forwardUpdate"
        @handleModal="handleModal"
        @forwardUpdateCompleted="forwardUpdateCompleted"
        :modalTrigger="modalTrigger"
        :task="task"
        />
      </tr>
    </tbody>
  </table>
</template>

<style >
table,
th,
td {
  padding: 7px;
}
th,
td {
  text-align: left;
}
table tr td:nth-child(1),
table tr td:nth-child(4),
table tr td:nth-child(5) {
  width: 15px;
}

table tr td:nth-child(3) {
  width: 100px;
}

tbody {
  background-color: #eeeee3;
}

table {
  width: 80vw;
  margin: 0 auto;
  border-collapse: collapse;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 15px;
}
button {
  border: none;
}
svg {
  color: #d10000;
  cursor: pointer;
  font-size: 16px;
}
.texto-tachado {
  text-decoration: line-through;
  color: gray;
}
</style>
