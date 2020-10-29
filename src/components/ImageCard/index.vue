<template>
  <div class="t-img-card" @click="$emit('click')">
    <div class="img-block"
         :style="{ backgroundImage: `url(${img})` }">
      <slot name="cover"></slot>
    </div>
    <div class="text-block">
      <div class="desc" v-html="text"></div>
      <slot name="text-footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TImgCard',
  props: {
    img: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.t-img-card {
  @include flex_layout(column, center, center);
  height: 360px;
  width: 320px;
  border-radius: 8px;
  cursor: pointer;
  transition: all .3s ease-in-out;

  &:hover {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }
  .img-block {
    @include flex_set(1, 0, 50%);
    position: relative;
    height: 50%;
    width: 100%;
    background-size: auto 100%;
    background-position: center center;
    border-radius: 8px 8px 0 0;
  }
  .text-block {
    @include flex_set(0, 1, 50%);
    position: relative;
    height: 100%;
    width: calc(100% - 40px);
    padding: 20px 20px;
    border: 1px solid #E5E5E5;
    border-top: none;
    border-radius: 0 0 8px 8px;
    font-size: 14px;
    color: #333333;
    text-align: left;

    .desc {
      font-weight: bold;
    }
  }
}
</style>
