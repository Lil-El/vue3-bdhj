<template>
  <div>
    <div id="star1"></div>
  </div>

  <div style="margin-top: 40px;">
    <div id="star2"></div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
#star1 {
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  background-color: aqua;
  position: relative;
  transform: rotate(20deg);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    background-color: aqua;
    transform: rotate(135deg);
  }
}
#star2 {
  clip-path: polygon(
    264px 8px,
    312px 132px,
    440px 72px,
    380px 192px,
    516px 240px,
    384px 292px,
    432px 404px,
    312px 356px,
    260px 468px,
    212px 360px,
    88px 404px,
    136px 288px,
    8px 244px,
    140px 192px,
    80px 76px,
    204px 128px
  );
  background-color: aqua;
  width: 800px;
  height: 800px;
}
</style>