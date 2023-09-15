<template>
  <div class="container">
    <nav>
      <div>手机</div>
      <div class="active">银行卡</div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 320px;
  aspect-ratio: 1/2;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
nav {
  display: flex;
  background: linear-gradient(145deg, #eee 50%, white 50%);
  height:  36px;
  div {
    width: 50%;
    height: 100%;
    line-height: 36px;
    text-align: center;
    // 左边的
    background: #eee;
    border-bottom-right-radius: 10px;
    transform: skewX(-18deg);
  }
  // 右边的
  .active {
    background-color: white;
    border-top-left-radius: 10px;
    transform: skewX(-18deg);
  }
}
</style>