<template>
  <div>
    <h1>Welcome home!</h1>
    <h5>
      My home, not yours. Obviously. <br />But welcome nethertheless I
      guess...
    </h5>
    <hr />
    <p>Found yourself here because of an application? Check out my RESUME.</p>
    <p>Interested in my services? Check them out HERE.</p>
    <p>
      Just browsing around, searching for meaning in a vast and empty universe,
      in which each and every one of us is but a tiny, insignificant grain in
      the history of humanity? No? It's just me?<br />Well okay then...
    </p>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "theme.scss";

.small {
  font-size: $font-size-sm;
}
</style>
