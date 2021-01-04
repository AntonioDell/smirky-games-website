<template>
  <div>
    <div class="horizontalScroller">
      <animated-article
        class="listItem"
        :key="currentArticle.id"
        :title="currentArticle.title"
        :text="currentArticle.text"
      ></animated-article>
    </div>
    <button @click="incrementIndex()">Next</button>
  </div>
</template>

<script>
import AnimatedArticle from "./AnimatedArticle";

export default {
  name: "ArticleList",
  components: { AnimatedArticle },
  props: {
    articleList: Array,
  },
  data: () => {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    currentArticle: function () {
      return this.articleList[this.currentIndex];
    },
  },
  methods: {
    incrementIndex: function () {
      if (this.currentIndex < this.articleList.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
  },
};
</script>
<style scoped>
.horizontalScroller {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.listItem {
  width: 100%;
  height: auto;
}
</style>
