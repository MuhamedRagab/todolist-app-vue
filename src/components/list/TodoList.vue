<template>
  <article>
    <ul class="todo-list">
      <li class="todo-list__item" v-for="(todo, i) in todos" :key="i">
        <div class="todo-list__date">
          <div class="todo-list__date--icon">🕰️</div>
          <small class="todo-list__date--text" v-text="todo.date"></small>
        </div>

        <div class="flex justify-between items-center w-full">
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-start gap-4"
          >
            <div @click="changeTodoStates(i)" class="compteled-todo">
              <small
                class="text-green-300"
                v-text="todo.Completed ? '✓' : ''"
              ></small>
            </div>
            <span>{{ todo.text }}</span>
          </div>
          <button class="todo-list__item--del" @click="removeTodo(i)">X</button>
        </div>
      </li>
    </ul>
  </article>
</template>
<script>
export default {
  name: "TodoList",
  props: ["todos"],
  methods: {
    removeTodo(index) {
      this.$emit("remove", index);
    },
    changeTodoStates(index) {
      this.$emit("change", index);
    },
  },
};
</script>

<style scoped lang="scss">
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 400ms;
}

.todo-list {
  @apply mt-10;
  $data-color: #fff;
  &__date {
    @apply text-center flex items-center justify-center gap-2;

    &--text {
      color: $data-color;
    }
  }

  &__item {
    @apply overflow-x-auto bg-slate-900 mt-2
    flex flex-col sm:flex-row items-center gap-4 p-4
    text-xl rounded-md hover:scale-105 transition;
    color: $data-color;

    &--del {
      @apply text-red-400 text-2xl hover:text-red-600
      cursor-pointer transition select-none;
    }
  }
  .compteled-todo {
    @apply w-8 h-8 border-2 rounded-full cursor-pointer
  flex justify-center items-center select-none;
  }
}
</style>
