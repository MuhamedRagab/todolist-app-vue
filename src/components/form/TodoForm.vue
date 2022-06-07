<template>
  <form @submit.prevent="addTodo" class="todo__form">
    <button class="todo__form-btn">+</button>
    <input
      v-model="text"
      type="text"
      placeholder="Add new todo"
      class="todo__form-input"
    />
  </form>
  <div class="menu">
    <div>
      <button @click="clearAllTodos" class="menu__btn--clear">Clear all</button>
      <small class="menu__todos-length">Items left: {{ todos.length }}</small>
    </div>
    <ul class="menu__states">
      <li @click="allTodos">All</li>
      <li @click="activeTodos">Active</li>
      <li @click="completedTodos">Completed</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoForm",
  props: ["todos"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    addTodo() {
      this.$emit("add", this.text);
      this.text = "";
    },
    clearAllTodos() {
      this.$emit("clear");
    },
    allTodos() {
      this.$emit("all");
    },
    activeTodos() {
      this.$emit("active");
    },
    completedTodos() {
      this.$emit("completed");
    },
  },
};
</script>

<style lang="scss">
.todo__form {
  @apply flex justify-center items-center
  mt-16 p-2 gap-4 rounded select-none;

  &-btn {
    @apply h-10 w-11 pb-1 border-2 text-white text-xl rounded-full
    hover:border-blue-500 hover:text-blue-500;
  }

  &-input {
    @apply w-full p-2 border-b-2 bg-transparent border-gray-300
    focus:border-blue-500 outline-none placeholder:text-gray-400
    text-xl text-white;
  }
}
.menu {
  @apply flex flex-col sm:flex-row mt-6
  justify-between items-center select-none;

  &__states {
    @apply flex justify-center items-center gap-4 my-4;

    li {
      @apply text-cyan-400 text-xl border-b-2
    border-cyan-400 hover:border-cyan-600
      cursor-pointer font-bold;
    }
  }
  &__btn--clear {
    @apply block text-red-400 text-xl hover:text-red-600
    italic;
  }
  &__todos-length {
    @apply text-gray-400 text-xl italic;
  }
}
</style>
