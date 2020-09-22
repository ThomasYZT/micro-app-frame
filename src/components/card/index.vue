<template>
  <div class="card" :class="{ 'title-card' : type === 'title' }">
    <div class="card-head" :class="{ 'no-mark' : !titleMark }">
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.card {
  max-width: 360px;
  height: auto;
  .card-head {
    position: relative;
    margin-bottom: 24px;
    padding-bottom: 32px;
    text-align: left;
    .title {
      color: #160A19;
      font-size: 36px;
      font-weight: bold;
    }

    .sub-title {
      font-size: 20px;
      color: rgba(51, 51, 51, 0.2);
      line-height: 23px;
    }

    .title-mark {
      position: absolute;
      left: 0;
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

  &.title-card {
    .card-head {
      font-size: 44px;
      padding-bottom: 28px;
      margin-bottom: 0;
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
