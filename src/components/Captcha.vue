<template>
  <div class="captcha">
    <canvas ref="numbers" class="numbers" width="150" height="100"></canvas>
    <div class="captchaInput">
      <label for="captcha">The numbers to the left add up to:</label>
      <div class="captchaRow">
        <input
          required
          name="captcha"
          type="number"
          placeholder="Hmm..."
          v-model="userInput"
        />
        <button @click="reloadCaptcha">Reload</button>
      </div>
    </div>
  </div>
</template>

<script>
import { loadFonts } from "./SelectGame";
export default {
  name: "captcha",
  data: function () {
    return {
      captchaResult: undefined,
      userInput: undefined,
    };
  },
  mounted: async function () {
    await loadFonts("Shadows Into Light");
    this.reloadCaptcha();
  },
  methods: {
    reloadCaptcha: function () {
      const numbersCanvas = this.$refs.numbers;
      // Clear canvas
      numbersCanvas.width = numbersCanvas.width;
      const canvasWidth = numbersCanvas.width;
      const fontSize = 16 * 5;
      const maxRotation = 0.5;
      const number1 = Math.round(Math.random() * 9);
      const number2 = Math.round(Math.random() * 9);

      const ctx = numbersCanvas.getContext("2d");
      ctx.font = `${fontSize}px Shadows Into Light`;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;

      ctx.save();
      ctx.translate(canvasWidth / 2 - 10, fontSize);
      ctx.rotate(Math.PI * maxRotation * -Math.random());
      ctx.fillText("" + number1, 0, 0);

      ctx.restore();
      ctx.save();
      ctx.translate(canvasWidth / 2 + 10, fontSize * 0.75);
      ctx.rotate(Math.PI * maxRotation * Math.random());
      ctx.fillText("" + number2, 0, 0);

      ctx.restore();
      ctx.rotate(Math.PI * maxRotation * -Math.random());
      const lineGap = 20;
      const lineCount = 10;
      for (let i = 0; i < lineCount; i++) {
        const y = lineGap * (i + 1);
        ctx.moveTo(-canvasWidth, y);
        ctx.lineTo(2 * canvasWidth, y);
      }
      ctx.stroke();

      this.captchaResult = number1 + number2;
      this.userInput = undefined
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../theme.scss";

.captcha {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.captcha * {
  margin: 0;
}

.numbers {
  font-family: "Shadows Into Light";
  font-size: $font-size-lg;
}

.captchaInput {
  width: 50%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.captchaRow {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

.captchaRow > * {
  max-width: 50%;
}

.captchaRow > button {
  height: 100%;
}
</style>
