<template>
  <button class="button" :class="{ type : type || 'primary' }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'tButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
button {
  border: none;
  outline: none;
}
.button {
  min-width: 176px;
  height: 60px;
  font-size: 18px;
  cursor: pointer;
  transition: all .3s;

  &.primary {
    color: $color_white;
    background: #E9427B;
    box-shadow: 0 4px 8px 0 rgba(233, 66, 123, 0.5);
    border-radius: 34px;

    &:hover {
      background: rgba(233, 66, 123, .6);
    }

    &:active {
      background: #E9427B;
      box-shadow: 0 4px 8px 0 rgba(233, 66, 123, 0.5);
      border-radius: 34px;
    }
  }

  &.white {
    color: $light_black_color;
    background: #F3F3FC;
    box-shadow: 0px 4px 8px 0px rgba(62, 62, 62, 0.1);
    border-radius: 34px;

    &:hover {
      background: rgba(243, 243, 252, .6);
    }
    &:active {
      background: #E9427B;
      box-shadow: 0 4px 8px 0 rgba(233, 66, 123, 0.5);
      border-radius: 34px;
    }
    &:active {
      background: #F3F3FC;
      box-shadow: 0px 4px 8px 0px rgba(62, 62, 62, 0.1);
      border-radius: 34px;
     }
  }
}
</style>
