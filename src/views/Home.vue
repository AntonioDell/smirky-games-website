<template>
  <article-list :article-list="articleList"></article-list>
</template>

<script>
// @ is an alias to /src
import ArticleList from "./animatedArticles/ArticleList";

export default {
  name: "home",
  components: { ArticleList },
  data: () => {
    return {
      articleList: [
        {
          id: 0,
          title: "Title1",
          text: "This is a sample Text which will get replaced soon.",
        },
        {
          id: 1,
          title: "Title2",
          text: "This is a sample Text which will get replaced soon.",
        },
        {
          id: 2,
          title: "Title3",
          text: "This is a sample Text which will get replaced soon.",
        },
      ],
    };
  },
};
</script>
