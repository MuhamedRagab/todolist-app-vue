<template>
  <div class="w-full md:w-2/3 min-h-screen mx-auto p-8">
    <todo-header :time="timeWritten" />
    <main>
      <todo-form
        :todos="todos"
        :length="todosList.length"
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
          :listPosition="listPosition"
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
      listPosition: "All",
      timeWritten: new Date().toLocaleTimeString(),
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      todosList: [],
    };
  },
  created() {
    if (!localStorage.getItem("todos")) {
      localStorage.setItem(
        "todos",
        JSON.stringify([
          {
            text: "Learn Vue",
            Completed: false,
            date: new Date().toLocaleTimeString(),
          },
          {
            text: "Learn Vuex",
            Completed: false,
            date: new Date().toLocaleTimeString(),
          },
          {
            text: "Learn Vue Router",
            Completed: false,
            date: new Date().toLocaleTimeString(),
          },
        ])
      );
    }
  },
  mounted() {
    setInterval(() => {
      this.timeWritten = new Date().toLocaleTimeString();
    }, 1000);
    this.todosList = this.todos;
  },
  methods: {
    addTodo(text) {
      if (text.trim() === "") return;
      this.todos.push({
        text,
        Completed: false,
        date: this.timeWritten,
      });
      localStorage.setItem("todos", JSON.stringify(this.todos));
      this.updateTodosList();
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
        if (editedTodo === null || editedTodo.trim() === "") return;
        this.todos[indexOfEditedElement].text = editedTodo;
        this.todos[indexOfEditedElement].date = this.timeWritten;
      } else {
        let editedTodo = prompt("Edit todo", this.todos[index].text);
        if (editedTodo === null || editedTodo.trim() === "") return;
        this.todos[index].text = editedTodo;
        this.todos[index].date = this.timeWritten;

        localStorage.setItem("todos", JSON.stringify(this.todos));
      }
    },
    changeTodoStates(index) {
      this.todosList[index].Completed = !this.todosList[index].Completed;
      localStorage.setItem("todos", JSON.stringify(this.todos));
      this.updateTodosList();
    },
    clearAllTodos() {
      localStorage.removeItem("todos");
      this.todosList = this.todos = [];
    },
    showAllTodos() {
      this.listPosition = "All";
      this.updateTodosList();
      this.showTodosSlowly();
    },
    showActiveTodos() {
      this.listPosition = "Active";
      this.updateTodosList();
      this.showTodosSlowly();
    },
    showCompletedTodos() {
      this.listPosition = "Completed";
      this.updateTodosList();
      this.showTodosSlowly();
    },
    updateTodosList() {
      if (this.listPosition === "Active") {
        this.todosList = this.todos.filter((todo) => !todo.Completed);
      } else if (this.listPosition === "Completed") {
        this.todosList = this.todos.filter((todo) => todo.Completed);
      } else {
        this.todosList = this.todos;
      }
    },
    showTodosSlowly() {
      this.show = false;
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
