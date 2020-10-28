<template>
  <button class="button" :class="type || 'primary'"  @click="$emit('click')">
    <div v-if="hoverExpand" class="expand-box">
      <div class="btn-wrapper">
        <img class="prefix-icon" v-if="icon && (icon.pos === 'prefix' || !icon.pos)" v-lazy="icon || icon.src" src="" alt="">
        <slot></slot>
        <img class="suffix-icon" v-if="icon.src && (icon.pos === 'suffix' || !icon.pos)" v-lazy="icon.src" src="" alt="">
      </div>
      <slot name="expand"></slot>
    </div>
    <template v-else>
      <img class="prefix-icon" v-if="icon && (icon.pos === 'prefix' || !icon.pos)" v-lazy="icon || icon.src" src="" alt="">
      <slot></slot>
      <img class="suffix-icon" v-if="icon.src && (icon.pos === 'suffix' || !icon.pos)" v-lazy="icon.src" src="" alt="">
    </template>
  </button>
</template>

<script>
export default {
  name: 'tButton',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: [Object, String],
      default () {
        return '';
      }
    },
    hoverExpand: {
      type: Boolean,
      default: false
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
  @include flex_layout(row, center, center);
  position: relative;
  min-width: 174px;
  height: 54px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all .3s;
  overflow: visible;

  .prefix-icon {
    margin-right: 4px;
    height: 20px;
  }

  .suffix-icon {
    margin-left: 8px;
    height: 12px;
  }

  &.primary {
    color: $color_white;
    background: #FF4383;
    border-radius: 34px;

    &:hover {
      box-shadow: 0px 4px 8px 0px rgba(255, 67, 131, 0.5);
    }

    &:active {
      background: #E9427B;
      box-shadow: 0px 4px 8px 0px rgba(255, 67, 131, 0.7);
      border-radius: 34px;
    }

    .expand-box {
      background: #FF4383;
    }
  }

  &.dark {
    color: $color_white;
    background: #160A19;
    border-radius: 34px;

    &:hover {
      box-shadow: 0px 4px 8px 0px rgba(62, 62, 62, 0.3);
    }

    &:active {
      background: #160A19;
      box-shadow: 0px 4px 8px 0px rgba(62, 62, 62, 0.7);
      border-radius: 34px;
    }

    .expand-box {
      background: #160A19;
    }
  }

  &.white {
    color: $light_black_color;
    background: #F3F3FC;
    border-radius: 34px;

    &:hover {
      box-shadow: 0px 4px 8px 0px rgba(62, 62, 62, 0.1);
    }
    &:active {
      background: #F3F3FC;
      box-shadow: 0px 4px 8px 0px rgba(62, 62, 62, 0.3);
      border-radius: 34px;
     }

    .expand-box {
      background: #F3F3FC;
    }
  }

  .expand-box {
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 34px;
    max-height: 54px;
    min-height: 54px;
    overflow: hidden;
    .btn-wrapper {
      @include flex_layout(row, center, center);
      width: 100%;
      height: 54px;
    }
    &:hover {
      max-height: 400px;
      border-radius: 20px;
      .btn-wrapper {
        display: none;
      }
    }
  }
}
</style>
