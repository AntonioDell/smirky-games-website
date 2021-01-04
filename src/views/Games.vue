<template>
  <div>
    <h1>These are our games</h1>
    <carousel :per-page="1">
      <slide>
        <iframe
          src="https://itch.io/embed/874745"
          height="167"
          width="552"
          frameborder="0"
          ><a href="https://antonioda.itch.io/test-game"
            >Test Game by AntonioDA</a
          ></iframe
        >
      </slide>
      <slide> Second Slide </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "games",
  components: { Carousel, Slide },
};
</script>

<style></style>
