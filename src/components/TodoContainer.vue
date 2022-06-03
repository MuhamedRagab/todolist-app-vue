<template>
  <div class="w-full md:w-2/3 min-h-screen mx-auto p-8">
    <todo-header />
    <todo-form
      :todos="todos"
      @add="addTodo($event)"
      @clear="clearAllTodos"
      @all="showAllTodos"
      @active="showActiveTodos"
      @completed="showCompletedTodos"
    />
    <todo-list
      :todos="todos"
      @remove="removeTodo($event)"
      @change="changeTodoStatus($event)"
    />
  </div>
</template>

<script>
import TodoHeader from "./header/TodoHeader.vue";
import TodoForm from "./form/TodoForm.vue";
import TodoList from "./list/TodoList.vue";
export default {
  name: "TodoContainer",
  components: {
    TodoHeader,
    TodoForm,
    TodoList,
  },
  emits: ["add", "clear", "remove", "change"],
  data() {
    return {
      timeWritten: new Date(Date.now()).toLocaleTimeString(),
      todos: JSON.parse(localStorage.getItem("todos")) || [
        {
          text: "Learn Vue",
          Completed: false,
          date: this.timeWritten,
        },
        {
          text: "Learn Vuex",
          Completed: false,
          date: this.timeWritten,
        },
        {
          text: "Learn Vue Router",
          Completed: false,
          date: this.timeWritten,
        },
      ],
      todosLocal: JSON.parse(localStorage.getItem("todos")),
    };
  },
  mounted() {
    setInterval(() => {
      this.timeWritten = new Date(Date.now()).toLocaleTimeString();
    }, 1000);
  },
  methods: {
    addTodo(text) {
      if (text.trim() !== "") {
        this.todos.push({
          text,
          Completed: false,
          date: this.timeWritten,
        });
        localStorage.setItem("todos", JSON.stringify(this.todos));
      }
      console.clear();
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(this.todos));
      console.clear();
    },
    changeTodoStatus(index) {
      this.todos[index].Completed = !this.todos[index].Completed;
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    clearAllTodos() {
      localStorage.removeItem("todos");
      this.todos = [];
      console.clear();
    },
    showAllTodos() {
      this.todos = this.todosLocal;
      console.clear();
    },
    showActiveTodos() {
      this.todos = this.todosLocal.filter((todo) => !todo.Completed);
      console.clear();
    },
    showCompletedTodos() {
      this.todos = this.todosLocal.filter((todo) => todo.Completed);
      console.clear();
    },
  },
};
</script>

<style lang="scss"></style>
