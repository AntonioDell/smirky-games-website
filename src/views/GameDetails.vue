<template>
  <div class="game-details emulated-flex-gap">
    <transition name="fade" appear mode="out-in">
      <h1 :key="game.id">{{ game.name }}</h1>
    </transition>
    <transition name="fade" appear mode="out-in">
      <carousel
        :per-page-custom="perPageCustom"
        paginationPosition="top"
        :loop="true"
        class="game-carousel"
        :key="game.id"
      >
        <slide v-for="image in game.preview.images" :key="image.name">
          <img :src="require('@/assets/' + image.name)" :alt="image.alt" />
        </slide>
      </carousel>
    </transition>

    <transition name="fade" appear mode="out-in" @after-leave="showIframe">
      <iframe
        v-show="isIframeVisible"
        :title="`Click to play ${game.name} on itch.io!`"
        :src="game.iframeLink"
        height="167"
        @load="iframeLoadComplete"
        class="widget-frame"
      >
      </iframe>
    </transition>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import gamesData from "../data/games.json";
export default {
  name: "game-details",
  components: { Carousel, Slide },
  props: ["gameId"],
  data: function () {
    return {
      iFrameCount: 0,
      isIframeVisible: false,
      isIframeReady: false,
      perPageCustom: [[350, 1]],
    };
  },
  computed: {
    game: function () {
      return gamesData.list.find((game) => game.id === this.gameId);
    },
  },
  watch: {
    gameId: function (newGameId, oldGameId) {
      this.isIframeVisible = false;
    },
  },
  methods: {
    showIframe() {
      if (this.isIframeReady) {
        this.isIframeVisible = true;
      }
    },
    iframeLoadComplete() {
      this.isIframeReady = true;
      this.showIframe();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "theme.scss";
.game-details {
  display: flex;
  flex-direction: column;
}
.widget-frame {
  border: none;
  transition-delay: 0.5s;
  width: 100%;
}
</style>
