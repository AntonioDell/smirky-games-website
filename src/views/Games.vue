<template>
  <div class="games emulated-flex-gap">
    <div ref="selectGame" class="gameContainer"></div>

    <transition name="fade" appear mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import gamesData from "../data/games.json";
import { SelectGame, loadFonts } from "../components/SelectGame";

export default {
  name: "games",
  data: () => ({
    gameList: gamesData.list,
    currentGame: gamesData.list[0],
  }),
  async mounted() {
    // TODO: show placeholder while stuff is loading
    await loadFonts("Press Start 2P", "Play");
    this.$refs.selectGame.addEventListener("gameSelected", this.onGameSelected);
    const game = new SelectGame(
      this.$refs.selectGame,
      350,
      200,
      this.gameList,
      this.currentGame.id
    );
    game.start();
    this.navigateToGame(this.currentGame.id);
  },
  methods: {
    onGameSelected(event) {
      const gameId = event.detail.gameId;
      if (gameId === this.currentGame.id) {
        return;
      }

      this.currentGame = this.gameList.find((game) => game.id === gameId);
      this.navigateToGame(gameId);
    },
    navigateToGame(gameId) {
      if (!this.$route.path.endsWith(gameId)) {
        this.$router.push({
          path: `/games/${gameId}`,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "theme.scss";

.games {
  display: flex;
  flex-direction: column;
}

.gameContainer {
  //border: 5px solid white;
  user-select: none;
  touch-action: none;
}

.game-carousel .VueCarousel-dot.VueCarousel-dot--active {
  background-color: $primary !important;
}
</style>
