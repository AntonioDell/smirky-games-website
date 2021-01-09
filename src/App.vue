<template>
  <div id="app">
    <navigation-bar />
    <div class="animation-container">
      <transition
        name="fade"
        appear
        mode="out-in"
      >
        <router-view class="animated" />
      </transition>
    </div>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";

export default {
  data: () => ({}),
  components: { NavigationBar },
  methods: {},
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
  background-color: $dark;
  min-height: 100vh;
}

.animation-container {
  overflow-x: hidden;
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
</style>
