<template>
  <div class="nav-wrapper">
    <div class="nav-bar">
      <div class="nav-title">
        <span class="title">票圈视频</span>
      </div>
      <div class="nav-list">
        <div class="nav-item"
             v-for="item in navList"
             :key="item.hash"
             :class="{ 'active' : item.hash === curHash }"
             @click="onItemClick(item.hash)">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curHash: '0',
      navList: [
        {
          name: '创作者中心',
          hash: '0',
          active: true
        },
        {
          name: '产品介绍',
          hash: '1'
        },
        {
          name: '关于我们',
          hash: '2'
        },
        {
          name: '联系我们',
          hash: '3'
        }
      ]
    };
  },
  methods: {
    onItemClick (hash) {
      this.curHash = hash;
      if (this.$route.path === '/home' && hash) {
        this.$bus.emit('hashScroll', hash);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.nav-wrapper {
  width: 100%;
  height: 80px;
  background-color: #D7DFFF;

  .nav-bar {
    padding: 0 220px;
    @include flex_layout(row, center, center);
    height: 100%;
    .nav-title {
      @include flex_layout(column, center, flex-start);
      @include flex_set(1, 1);
      height: 100%;

      .title {
        margin-right: 30px;
        color: $light_black_color;
      }
    }

    .nav-list {
      @include flex_layout(row, flex-end, center);
      @include flex_set(1, 0);
      height: 100%;
      .nav-item {
        @include flex_layout(row, center, center);
        height: 100%;
        padding: 0 20px;
        white-space: nowrap;
        color: $light_d5_black_color;
        cursor: pointer;
        transition: all .3s;
        &:hover {
          color: $light_black_color;
        }

        &.active {
          color: $light_black_color;
          font-weight: bold;
        }

        &:last-child {
          padding-right: 0;
        }
      }
    }
  }
}
</style>
