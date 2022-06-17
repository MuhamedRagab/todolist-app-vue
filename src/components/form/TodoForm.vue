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
      <small class="menu__todos-length">Items left: {{ length }}</small>
    </div>
    <ul class="menu__states">
      <li :class="choiceAll" @click="allTodos">All</li>
      <li :class="choiceActive" @click="activeTodos">Active</li>
      <li :class="choiceCompleted" @click="completedTodos">Completed</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoForm",
  props: ["todos", "length"],
  emits: ["add", "clear", "all", "active", "completed"],
  data() {
    return {
      text: "",
      choiceAll: "active",
      choiceActive: "",
      choiceCompleted: "",
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
      this.choiceAll = "active";
      this.choiceActive = this.choiceCompleted = "";
    },
    activeTodos() {
      this.$emit("active");
      this.choiceActive = "active";
      this.choiceAll = this.choiceCompleted = "";
    },
    completedTodos() {
      this.$emit("completed");
      this.choiceCompleted = "active";
      this.choiceActive = this.choiceAll = "";
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
    @apply flex justify-center items-center gap-x-4 my-4;

    li {
      @apply text-cyan-600 text-xl border-b-2
    border-cyan-600 hover:border-cyan-400
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
  .active {
    @apply border-cyan-400 text-cyan-400;
  }
}
</style>
