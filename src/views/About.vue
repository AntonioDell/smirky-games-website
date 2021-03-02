<template>
  <div class="about emulated-flex-gap">
    <div>
    <h1>About me</h1>
    <h5>
      What does my face look like?<br />Are you convinced that I'm a capable developer?<br />Be judge,
      jury and executioner!
    </h5></div>
    <p>
      I'm Antonio Dell'Annunziata, proud owner and creator of this beautifully
      minimalstic - some call it cheap, but we don't speak about THEM - webpage.
      Big fan of learning new technologies, open source (look at my github for
      proof!), game development and everything web.
    </p>
    <contact-form />
    <div>[ Insert coin here ]</div>
  </div>
</template>
<script>
import ContactForm from '../components/ContactForm.vue';

export default {
  name: "about",
  components: {ContactForm}
}
</script>

<style lang="scss" scoped>
@import "../../theme.scss";

</style>