<script setup lang="ts">
import { ref, type PropType } from "vue";
import { Task } from "@/utils/task";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  isUpdate: Boolean,
  id: String,
  routeIdProject: {
    type: [String, Array] as PropType<string | string[] | undefined>,
    default: "none",
  },
});
const taskAux = ref(new Task("", false, "", "", uuidv4(),props.routeIdProject));
const emit = defineEmits(["forwardHandleAdd", "handleModal", "forwardUpdate"]);
const handleSubmit = () => {
  emit("forwardHandleAdd", taskAux.value);
};
const handleUpdate = () => {
  emit(
    "forwardUpdate",
    props.id,
    taskAux.value.description,
    taskAux.value.date,
    taskAux.value.name
  );
  emit("handleModal");
};
</script>
<template>
  <div class="backdrop" @click="emit('handleModal')"></div>
  <div id="modal">
    <form action="" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="Name of the task"
        v-model="taskAux.name"
        name="name"
        required
      />
      <input
        type="text"
        placeholder="Description"
        v-model="taskAux.description"
        name="description"
        required
      />
      <input type="date" 
      name="date" 
      v-model="taskAux.date"  
      required
      />
      <div id="wrapper">
        <button v-if="!isUpdate" type="submit" class="btnConfirm">
          Submit
        </button>
        <button v-else type="submit" @click="handleUpdate" class="btnConfirm">
          Update
        </button>
        <button type="button" @click="emit('handleModal')" class="btnCancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
#modal {
  padding-top: 20px;
  border: 0.5px solid #4a4a4a;
  /* display: none; */
  width: 500px;
  height: 200px;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 200;
  background-color: white;
}

#modal {
  padding-top: 20px;
  border: 0.5px solid #4a4a4a;
  /* display: none; */
  width: 500px;
  height: 200px;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 200;
  background-color: white;
  transform: translate(-50%, -50%);
}

/* Responsive Styles */
@media (max-width: 600px) {
  #modal {
    width: 90%;
    height: auto;
    max-width: 400px;
    padding: 10px;
  }
}

@media (max-width: 400px) {
  #modal {
    width: 90%;
    height: auto;
    max-width: 300px;
    padding: 10px;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
form > input {
  border: none;
  margin-left: 10px;
  margin-right: 10px;
  font-family: "Roboto";
  border: 0.5px solid #eeeee3;
  font-size: 14px;
  height: 30px;
  padding-left: 4px;
}
form > input::-webkit-input-placeholder {
  font-weight: bold;
  font-size: 1rem;
}
#wrapper {
  display: flex;
  width: 100%;
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
}
#wrapper > button {
  font-family: "Lexend";
  width: 100px;
  height: 30px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}
#wrapper > button:hover {
  scale: 1.2;
}


.btnConfirm {
  background-color: #d10000;
  color: #eeeee3;
}

.btnCancel {
  background-color: #d4d4d4;
}

.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  cursor: pointer;
}
</style>
