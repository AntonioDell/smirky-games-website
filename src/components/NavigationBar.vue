<template>
  <div
    id="nav"
    v-observe-visibility="{
  callback: visibilityChanged,
  throttle: 300,
}"
  >
    <template v-for="(route, index) in displayRoutes">
      <router-link
        :key="route.path"
        :to="route.path"
        v-on:click.native="linkClicked(route)"
        :class="[route.animation]"
      >{{route.name}}</router-link> {{index !== displayRoutes.length ? '|' : ''}}
    </template>
  </div>
</template>

<script>
import router, { routes } from "../router/index";

const FROM_LEFT = "from-left";
const FROM_RIGHT = "from-right";
const TO_LEFT = "to-left";
const TO_RIGHT = "to-right";
const NO_ANIM = "";

export default {
  name: "navigation-bar",
  data: function () {
    const secondIndexOfSlash = window.location.hash.indexOf("/", 2);
    const currentMainRoute = window.location.hash.substring(
      1,
      secondIndexOfSlash == -1
        ? window.location.hash.length
        : secondIndexOfSlash
    );
    console.log(currentMainRoute);
    return {
      displayRoutes: routes.map((route) => ({
        ...route,
        animation: route.path === currentMainRoute ? FROM_LEFT : NO_ANIM,
      })),
      currentPath: currentMainRoute,
    };
  },
  methods: {
    linkClicked(e) {
      const newPath = e.path;
      if (newPath === this.currentPath) {
        return;
      }
      const currentPathIndex = this.displayRoutes.findIndex(
        (route) => route.path === this.currentPath
      );
      const newPathIndex = this.displayRoutes.findIndex(
        (route) => route.path === newPath
      );

      if (
        currentPathIndex > newPathIndex ||
        (currentPathIndex === this.displayRoutes.length && newPathIndex === 0)
      ) {
        // Fill from right
        this.displayRoutes[newPathIndex].animation = FROM_RIGHT;
        this.displayRoutes[currentPathIndex].animation = TO_LEFT;
      } else if (
        currentPathIndex < newPathIndex ||
        (currentPathIndex === 0 && newPathIndex === this.displayRoutes.length)
      ) {
        // Fill from left
        this.displayRoutes[newPathIndex].animation = FROM_LEFT;
        this.displayRoutes[currentPathIndex].animation = TO_RIGHT;
      } else {
        // Error
      }
      this.currentPath = newPath;
    },
    visibilityChanged(isVisible) {
      console.log(`I'm ${isVisible ? "" : "not "}visible`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "theme.scss";
$defaultColor: $dark;

#nav {
  //  padding: 0px 30px;
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  background: $light;
  color: $defaultColor;
  width: 100%;
}

#nav a {
  color: $defaultColor;
}

.from-left,
.to-left {
  -webkit-text-fill-color: transparent;
  background: linear-gradient(to right, $primary 50%, $defaultColor 50%);
  background-clip: text;
  background-size: 200% 100%;
}

.from-left {
  background-position: 100%;
  animation: from-left-anim 0.5s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

.to-left {
  animation: to-left-anim 0.5s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes from-left-anim {
  0% {
    background-position: 100%;
  }

  100% {
    background-position: 0%;
  }
}

@keyframes to-left-anim {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 100%;
  }
}

.from-right,
.to-right {
  -webkit-text-fill-color: transparent;
  background: linear-gradient(to right, $defaultColor 50%, $primary 50%);
  background-clip: text;
  background-size: 200% 100%;
}

.from-right {
  background-position: 0%;
  animation: from-right-anim 0.5s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

.to-right {
  background-position: 100%;
  animation: to-right-anim 0.5s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes from-right-anim {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 100%;
  }
}

@keyframes to-right-anim {
  0% {
    background-position: 100%;
  }

  100% {
    background-position: 0%;
  }
}
</style>