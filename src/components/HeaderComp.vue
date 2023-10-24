<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, onBeforeUnmount, ref } from "vue";
library.add(fas);

const emit = defineEmits(["handleMenuShow","handleMenuHide","handleMenuToggle"]);
const breakpointTriggered = ref(false);

const handleResize = () => {
  if (window.innerWidth <= 1024 && !breakpointTriggered.value) {
    emit("handleMenuHide");
    breakpointTriggered.value = true;
  } else if (window.innerWidth > 1024 && breakpointTriggered.value) {
    emit("handleMenuShow");
    breakpointTriggered.value = false;
  }
};

onMounted(() => {
  handleResize(); // Initial check when the component is mounted
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<template>
  <header>
    <font-awesome-icon class="menu-icon" :icon="['fas', 'bars']" @click="emit('handleMenuToggle')"/>
    <font-awesome-icon :icon="['fas', 'check-double']" />
    <h1>My Task List!</h1>
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

.menu-icon{
  display: none;
}

@media (max-width: 1024px) {
h1{
  font-size: 1.3rem;
}
.menu-icon{
  display: block !important;;
}
}
</style>
