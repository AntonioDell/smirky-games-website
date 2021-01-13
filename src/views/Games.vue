<template>
  <div>
    <div
      ref="selectGame"
    ></div>
    <h1>These are our games</h1>
    <h2>{{currentGame.name}}</h2>
    <carousel
      :per-page="1"
      @page-change="changeGame"
      paginationPosition="top"
      :minSwipeDistance="32"
      :loop="true"
      ref="homeCarrousel"
      class="game-carousel"
    >
      <slide
        v-for="game in gameList"
        :key="game.id"
      >
        <b-container fluid>
          <b-row>
            <b-col
              v-for="image in game.preview.images"
              :key="image.name"
              sm
            >
              <img
                :src="require('@/assets/' + image.name)"
                :alt="image.alt"
              />
            </b-col>

          </b-row>
        </b-container>
      </slide>
    </carousel>
    <div class="reveal-container">
      <transition
        name="reveal-down"
        @after-leave="showGameDetails"
      >
        <iframe
          v-show="isDetailsVisible"
          :title="`Click to play ${currentGame.name} on itch.io!`"
          :src="currentGame.iframeLink"
          height="167"
          width="350"
          @load="iframeLoadComplete"
          class="widget-frame"
        >
        </iframe>
      </transition>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import gamesData from "../data/games.json";
import setupGameCanvas from "../components/SelectGame";

export default {
  name: "games",
  components: { Carousel, Slide },
  data: () => ({
    gameList: gamesData.list,
    previewImages: gamesData.list.flatMap((game) => game.preview.images),
    currentIndex: 0,
    currentGame: gamesData.list[0],
    isDetailsVisible: false,
    isIframeReady: false,
  }),
  mounted() {
    setupGameCanvas(this.$refs.selectGame, 500, 300);
  },
  computed: {},
  methods: {
    changeGame(newIndex) {
      this.isDetailsVisible = false;
      if (newIndex === this.currentIndex) {
        return;
      }
      this.currentGame = this.gameList[newIndex];
      this.currentIndex = newIndex;
    },
    showGameDetails() {
      if (this.isIframeReady) {
        this.isDetailsVisible = true;
      }
    },
    iframeLoadComplete() {
      this.isIframeReady = true;
      this.showGameDetails();
    },
  },
};
</script>

<style lang="scss">
// Bootstrap and its default variables
@import "theme.scss";

.game-carousel .VueCarousel-dot.VueCarousel-dot--active {
  background-color: $primary !important;
}

.widget-frame {
  border: none;
  margin: 0.5em;
}

.reveal-container {
  overflow: hidden;
  height: 100%;
  min-height: 167px;
}
.reveal-down-enter-active {
  transform-origin: top;
  animation: reveal-down-anim 0.5s forwards
    cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.reveal-down-leave-active {
  transform-origin: top;
  animation: reveal-down-anim 0.5s reverse forwards
    cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes reveal-down-anim {
  0% {
    transform: translateY(-50%);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
