<template>
  <header class="header">
    <h1 class="header__title">
      To do
      <span class="text-black">List</span>
    </h1>
    <h3 class="header__author">
      by: <span class="text-cyan-600 font-bold">Mohamed Ragab</span>
    </h3>

    <div class="header__date">
      <div class="header__date--history">
        <sup v-text="day"></sup>
        <strong
          class="text-4xl sm:text-5xl text-cyan-300"
          v-text="month"
        ></strong>
        <sub class="translate-y-2 text-black" v-text="year"></sub>
      </div>
      <span v-text="time" class="text-2xl sm:text-3xl"></span>
    </div>
  </header>
</template>

<script>
export default {
  name: "TodoHeader",
  props: ["time"],
  data() {
    return {
      day: new Date(Date.now()).getDate(),
      month: new Date(Date.now()).toLocaleString("en-us", { month: "long" }),
      year: new Date(Date.now()).toLocaleDateString("en-US", {
        year: "numeric",
      }),
    };
  },
};
</script>

<style lang="scss">
.header {
  @apply select-none;

  &__title {
    @apply text-4xl sm:text-5xl text-gray-300 font-bold mt-10 text-center;
  }

  &__author {
    @apply text-center text-sm sm:text-xl text-white mt-2 italic;
  }

  &__date {
    @apply flex justify-between flex-col sm:flex-row gap-6
       text-gray-300 items-center mt-12;

    &--history {
      @apply flex gap-4 justify-center items-center
      italic;

      sup,
      sub {
        @apply text-3xl;
      }
    }
  }
}
</style>
