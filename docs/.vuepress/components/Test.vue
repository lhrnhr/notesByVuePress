<template>
  <div>
    <button class="btn-55" onclick="console.log('dsad')">按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ]
    };
  }
};
</script>
<style>
.btn-55,
.btn-55 *,
.btn-55 :after,
.btn-55 :before,
.btn-55:after,
.btn-55:before {
  border: 0 solid;
  box-sizing: border-box;
}
.btn-55 {
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: button;
  background-color: #000;
  background-image: none;
  color: #fff;
  cursor: pointer;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 100%;
  line-height: 1.5;
  margin: 0;
  -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
  padding: 0;
}
.btn-55:disabled {
  cursor: default;
}
.btn-55:-moz-focusring {
  outline: auto;
}
.btn-55 svg {
  display: block;
  vertical-align: middle;
}
.btn-55 [hidden] {
  display: none;
}
.btn-55 {
  background: linear-gradient(90deg, blue, red);
  border-radius: 999px;
  box-sizing: border-box;
  color: #000;
  display: block;
  font-weight: 900;
  overflow: hidden;
  padding: 1.8rem 5rem;
  position: relative;
  text-transform: uppercase;
}
.btn-55 span {
  background: #1e293b;
  border-radius: 999px;
  color: #fff;
  display: grid;
  inset: 5px;
  place-items: center;
  position: absolute;
  transition: background 0.3s;
}
.btn-55:hover span {
  background: none;
}


</style>

