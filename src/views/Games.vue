<template>
  <div>
    <h1>These are our games</h1>
    <h2>{{currentGame.name}}</h2>
    <carousel
      :per-page="1"
      @page-change="changeGame"
      @transition-start="hideGameDetails"
      adjustableHeight
      paginationPosition="top"
      :minSwipeDistance="32"
      :loop="true"
      ref="homeCarrousel"
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
        >
        </iframe>
      </transition>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import gamesData from "../data/games.json";

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
  computed: {},
  methods: {
    changeGame(newIndex) {
      this.currentGame = this.gameList[newIndex];
      if (newIndex == this.gameList.length - 1) {
        this.loopAround = true;
      }
      this.isLooping = false;
      this.currentIndex = newIndex;
    },
    hideGameDetails() {
      this.isDetailsVisible = false;
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

<style>
.reveal-container {
  overflow: hidden;
  background-color: black;
  height: 100%;
  min-height: 167px;
}
.reveal-down-enter-active {
  transform-origin: top;
  animation: reveal-down-anim 0.5s forwards;
}

.reveal-down-leave-active {
  transform-origin: top;
  animation: reveal-down-anim 0.5s reverse forwards;
}

@keyframes reveal-down-anim {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
