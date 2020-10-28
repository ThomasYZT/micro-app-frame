<template>
  <div class="card" :class="[{ 'title-card' : type === 'title' }, `${align}-align`]">
    <div v-if="title" class="card-head" :class="{ 'no-mark' : !titleMark }">
      <h4 class="title" v-html="title"></h4>
      <h5 class="sub-title" v-html="subTitle"></h5>
      <div v-if="titleMark || type === 'title'" class="title-mark"></div>
    </div>
    <div class="card-content">
      <slot>{{content}}</slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tCard',
  props: {
    type: {
      type: String,
      default: 'card'
    },
    titleMark: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: (val) => {
        return val || 'left';
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.card {
  max-width: 360px;
  height: auto;

  &.title-card {
    .card-head {
      padding-bottom: 28px;
      margin-bottom: 0;
      .title {
        font-size: 44px;
      }
    }
  }

  &.center-align {
    .card-head {
      text-align: center;

      .title-mark {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  &.left-align {
    .card-head {
      text-align: left;

      .title-mark {
        left: 0;
      }
    }
  }

  .card-head {
    position: relative;
    margin-bottom: 24px;
    padding-bottom: 32px;
    .title {
      color: #160A19;
      font-size: 36px;
      font-weight: bold;
    }

    .sub-title {
      font-size: 20px;
      color: rgba(51, 51, 51, 0.2);
      line-height: 23px;
      font-weight: lighter;
    }

    .title-mark {
      position: absolute;
      bottom: 0;
      height: 8px;
      width: 40px;
      background-color: #FF4383;
    }

    &.no-mark {
      margin-bottom: 0;
      padding-bottom: 24px;
    }
  }

  .card-content {
    margin-bottom: 40px;
    text-align: left;
  }

  .card-footer {
    @include flex_layout(row, space-between, center);
  }

  .footer {

  }
}

</style>
