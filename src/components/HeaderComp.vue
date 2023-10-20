<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
</script>
<template>
  <header>
    <font-awesome-icon :icon="['fas', 'check-double']" />
    <h1>Homer's To Do List</h1>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  background-color: #d10000;
  position: absolute;
  top: 0;
  height: 50px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  gap: 20px;
  color: #eeeee3;
  z-index: 50;
}

svg {
  margin-left: 15px;
  color: white;
  font-size: 2rem;
}
</style>
