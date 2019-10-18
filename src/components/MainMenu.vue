<template>
  <div>
    <nav class="circle">
      <main-menu-item class="circle-pos pos-3" item-text="Private" circleColor="yellow"></main-menu-item>
      <main-menu-item class="circle-pos pos-2" item-text="Projects" circleColor="red"></main-menu-item>
      <main-menu-item class="circle-pos pos-1" item-text="About Me" circleColor="blue"></main-menu-item>
    </nav>
  </div>
</template>

<script>
import MainMenuItem from "./MainMenuItem.vue";

export default {
  components: { MainMenuItem },
  name: "MainMenu",
  props: {},
  data: function() {
    return {
      show: true
    };
  }
};
</script>

<style scoped>
.circle{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>