<template>
  <div
    id="nav"
  >
    <template v-for="(route) in displayRoutes">
      <span
        :key="route.path"
        :class="[route.animation, 'link-container']"
      >
        <router-link
          :to="route.path"
          v-on:click.native="linkClicked(route)"
        >{{route.name}}</router-link>
      </span>
    </template>
  </div>
</template>

<script>
import { routes } from "../router/index";

const FROM_LEFT = "from-left";
const FROM_RIGHT = "from-right";
const TO_LEFT = "to-left";
const TO_RIGHT = "to-right";
const NO_ANIM = "";

/**
 * Since this.$router.currentRoute.path updates too late, we have to get the currently selected main route from the `window.location`.
 * @returns the path between the first and the second `/` in `window.location.hash`;
 */
function getMainRoute() {
  const secondIndexOfSlash = window.location.hash.indexOf("/", 2);
  return window.location.hash.substring(
    1,
    secondIndexOfSlash == -1 ? window.location.hash.length : secondIndexOfSlash
  );
}

export default {
  name: "navigation-bar",
  data: function () {
    const currentMainRoute = getMainRoute();
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
  },
};
</script>

<style lang="scss" scoped>
@import "theme.scss";
$defaultColor: $dark;

#nav {
  color: $defaultColor;
  width: auto;
  display: flex;
  justify-content: space-evenly;
  //border: .25rem solid $light
}

#nav a {
  color: $light;
  mix-blend-mode: difference;
}

.link-container {
  background-color: $defaultColor;
  color: $light;
  width: 100%;
  //padding: 0.5rem 0.5rem;
}

.from-left,
.to-left {
  background: linear-gradient(to right, $light 50%, $defaultColor 50%);
  /** Random 1% is used to correct rounding errors and prevent white lines */
  background-size: 201% 100%;
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
  background: linear-gradient(to right, $defaultColor 50%, $light 50%);
  /** Random 1% is used to correct rounding errors and prevent white lines */
  background-size: 201% 100%;
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