<template>
  <div class="w-full md:w-2/3 min-h-screen mx-auto p-8">
    <todo-header />
    <main>
      <todo-form
        :todos="todos"
        @add="addTodo($event)"
        @clear="clearAllTodos"
        @all="showAllTodos"
        @active="showActiveTodos"
        @completed="showCompletedTodos"
      />
      <Transition>
        <todo-list
          v-if="show"
          :todos="todosList"
          @remove="removeTodo($event)"
          @change="changeTodoStates($event)"
          @edit="editTodo($event)"
        />
      </Transition>
    </main>
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
  data() {
    return {
      show: true,
      timeWritten: new Date(Date.now()).toLocaleTimeString(),
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      todosList: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  beforeCreate() {
    if (localStorage.getItem("todos") == null) {
      localStorage.setItem(
        "todos",
        JSON.stringify([
          {
            text: "Learn Vue",
            Completed: false,
            date: new Date(Date.now()).toLocaleTimeString(),
          },
          {
            text: "Learn Vuex",
            Completed: false,
            date: new Date(Date.now()).toLocaleTimeString(),
          },
          {
            text: "Learn Vue Router",
            Completed: false,
            date: new Date(Date.now()).toLocaleTimeString(),
          },
        ])
      );
    }
  },
  mounted() {
    setInterval(() => {
      this.timeWritten = new Date(Date.now()).toLocaleTimeString();
    }, 1000);
    console.clear();
    this.todosList = this.todos;
  },
  updated() {
    console.clear();
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
    },
    removeTodo(index) {
      if (this.todosList !== this.todos) {
        let deletedElement = this.todosList.splice(index, 1);
        let indexOfDeletedElement = this.todos.indexOf(deletedElement[0]);
        this.todos.splice(indexOfDeletedElement, 1);
      } else {
        this.todos.splice(index, 1);
      }
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    editTodo(index) {
      if (this.todosList !== this.todos) {
        let editedElement = this.todosList[index];
        let indexOfEditedElement = this.todos.indexOf(editedElement);
        let editedTodo = prompt(
          "Edit todo",
          this.todos[indexOfEditedElement].text
        );
        if (editedTodo !== null) {
          this.todos[indexOfEditedElement].text = editedTodo;
          localStorage.setItem("todos", JSON.stringify(this.todos));
        }
      } else {
        let editedTodo = prompt("Edit todo", this.todos[index].text);
        if (editedTodo !== null) {
          this.todos[index].text = editedTodo;
          localStorage.setItem("todos", JSON.stringify(this.todos));
        }
      }
    },
    changeTodoStates(index) {
      this.todosList[index].Completed = !this.todosList[index].Completed;
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    clearAllTodos() {
      localStorage.removeItem("todos");
      this.todosList = this.todos = [];
    },
    showAllTodos() {
      this.todosList = this.todos;
      this.show = false;
      this.showTodosSlowly();
    },
    showActiveTodos() {
      this.todosList = this.todos.filter((todo) => !todo.Completed);
      this.show = false;
      this.showTodosSlowly();
    },
    showCompletedTodos() {
      this.todosList = this.todos.filter((todo) => todo.Completed);
      this.show = false;
      this.showTodosSlowly();
    },
    showTodosSlowly() {
      setTimeout(() => {
        this.show = true;
      }, 400);
    },
  },
};
</script>

<style lang="scss">
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
