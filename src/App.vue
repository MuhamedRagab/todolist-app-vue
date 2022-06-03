<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 bg-gray-500">
    <todo-container />
  </div>
</template>

<script>
import TodoContainer from "./components/TodoContainer.vue";

export default {
  name: "App",
  components: {
    TodoContainer,
  },
};
</script>

<style lang="scss"></style>
