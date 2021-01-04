<template>
  <article>
    <h2>{{ title }}</h2>
    <span>{{ text }}</span>
  </article>
</template>

<script>
export default {
  name: "AnimatedArticle",
  props: {
    title: String,
    text: String,
  },
};
</script>
