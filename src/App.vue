<template>
  <div id="app">
    <div class="emulated-flex-gap main">
      <navigation-bar class="navigation" />
      <transition name="fade" appear mode="out-in">
        <router-view class="main-route" />
      </transition>
      <footer class="footer">
        <div>DISCLAIMER: Website is still in development!</div>
        <div>
          <img
            src="./assets/github/github_white_small.png"
            class="github-logo"
          />
          <a href="https://github.com/AntonioDell"> profile</a> |
          <a href="https://github.com/AntonioDell/smirky-games-website"
            >website</a
          >
          | <a href="https://github.com/AntonioDell/smirky-games-api">server</a>
        </div>
        <div>Social media links (XING, LinkedIn)</div>
      </footer>
    </div>
    <div ref="anim" class="backgroundAnimation"></div>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
import CityAnimation from "./components/cityAnimation/CityAnimation";

export default {
  components: { NavigationBar },
  mounted: function () {
    new CityAnimation(this.$refs.anim);
  },
  methods: {
    visibilityChanged: function (isVisible) {
      this.visible = isVisible;
    },
  },
  data: function () {
    return {
      visible: true,
    };
  },
};
</script>

<style lang="scss">
// Import custom SASS variable overrides, or alternatively
// define your variable overrides here instead
@import "theme.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $light;
  //background-color: $dark;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
}

.main {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  z-index: 1;
  min-height: 100vh;
  background: $dark;
  padding: 0 1rem;
}

.main-route,
.navigation {
  min-width: 350px;
  width: 350px;
}

.fade-enter-active {
  opacity: 0;
  transform-origin: left;
  animation: fade-in-anim 0.5s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

.fade-leave-active {
  transform-origin: left;
  animation: fade-out-anim 0.5s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes fade-in-anim {
  0% {
    transform: translateX(-10%);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes fade-out-anim {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(10%);
    opacity: 0;
  }
}

.footer {
  font-size: $font-size-sm;
  margin-top: auto !important;
}

.backgroundAnimation {
  position: absolute;
  top: 0px;
  right: 0px;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1000 !important;
  overflow: hidden;
  margin: 0 !important;
}
</style>
