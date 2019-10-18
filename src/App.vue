<template>
  <div>
    <main-menu></main-menu>
    <article-list></article-list>
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue";
import ArticleList from "./components/ArticleList";

export default {
  name: "app",
  components: {
    MainMenu,
    ArticleList
  }
};
</script>

<style>
</style>
