<template>
  <div class="card" :class="{ 'title-card' : type === 'title' }">
    <div class="card-head">
      <span class="title">{{title}}</span>
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
    padding-bottom: 20px;
    color: $normal_black_color;
    font-weight: bold;
    font-size: 44px;
    text-align: left;
    .title {

    }
    .title-mark {
      display: inline-block;
      height: 8px;
      width: 40px;
      background-color: $primary_color;
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
