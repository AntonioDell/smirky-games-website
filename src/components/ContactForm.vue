<template>
  <form ref="form" @submit.prevent="submit" novalidate>
    <input
      name="email"
      type="email"
      placeholder="Your email adress (optional)"
      pattern=".*@.*\..*"
    />
    <input name="name" type="text" placeholder="Your name (may be an alias)" />
    <textarea
      required
      name="message"
      rows="10"
      cols="10"
      placeholder="Anything you want to tell us? Maybe something you want to ask? Don’t be shy, we don’t byte (pun intended)."
    />
    <captcha></captcha>
    <button>Submit</button>
  </form>
</template>

<script>
import Captcha from "./Captcha.vue";
export default {
  name: "contact-form",
  components: { Captcha },
  methods: {
    submit() {
      //console.log(this.$refs.form.checkValidity());
    },
  },
};
</script>

<style lang="scss">
@import "../../theme.scss";

form * {
  color: $light;
  background: $dark;
  margin: $defaultGap/2 0 0 0;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  font-weight: bold;
  
}

form input,
form textarea {
  width: 100%;
  border: 5px solid $light;
  resize: none;
  padding: .5rem;
}

form button {
  color: $dark;
  background: $primary;
  border: none;
}

form *:first-child {
  margin-top: 0;
}

form *::placeholder {
  color: $primary;
  align-content: center;
  text-align: center;
}

form textarea {
  overflow-x: hidden;
  margin-bottom: -7px;
}
</style>
