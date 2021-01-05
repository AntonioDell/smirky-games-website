<template>
  <div>
    <h1>These are our games</h1>
    <carousel
      :per-page="4"
      @page-change="changeGame"
    >
      <slide
        v-for="image in previewImages"
        :key="image.name"
      >
        <img
          :src="require('@/assets/' + image.name)"
          :alt="image.alt"
        />
      </slide>
    </carousel>
    <iframe
      :title="`Click to play ${currentGame.name} on itch.io!` "
      :src="currentGame.iframeLink"
      height="167"
      width="552"
    >
    </iframe>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import gamesData from "../data/games.json";

export default {
  name: "games",
  components: { Carousel, Slide },
  data: () => ({
    gamesList: gamesData.list,
    previewImages: gamesData.list.flatMap((game) => game.preview.images),
    currentIndex: 0,
    currentGame: gamesData.list[0],
  }),
  computed: {},
  methods: {
    changeGame(newIndex) {
      this.currentGame = this.gamesList[newIndex];
      this.currentIndex = newIndex;
      console.log("new game is", this.currentGame);
    },
  },
};
</script>

<style></style>
