<template>
  <div ref="TimelineItem" :data-label="label" class="timeline-item">
    <div class="tail" @click="onTimeClick">
      <img ref="flag" src="../img/pic_five_plane@2x.png" alt="">
      <div class="time">
        <img class="arrow" src="../img/icon_arrow_red@2x.png" alt="">
        <span>{{time}} <span class="unit">年</span> </span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TimelineItem",
  inject: ['itemClick', 'activeItem'],
  props: {
    label : {
      type : String,
      default : ''
    },
    time : {
      type : String,
      default : ''
    }
  },
  methods: {
    onTimeClick (e) {
      this.itemClick(e, this.label);
    }
  },
  mounted() {
    if (this.label === this.activeItem.value) {
      this.itemClick({}, this.label, true)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.timeline-item {
  padding-top: 20px;
  position: relative;
  padding-left: 49px;
  margin-left: 30%;
  border-left: 1px solid #EAEAEA;
  text-align: left;

  .tail {
    position: absolute;
    left: -18px;
    bottom: 0;
    width: 34px;
    height: 37px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }

    .active-flag {
      position: absolute;
      top: 0;
      left: 0;
    }

    .time {
      @include flex_layout(row, center, center);
      position: absolute;
      left: -150px;
      bottom: 0;
      width: 120px;
      height: 100%;
      white-space: nowrap;

      .arrow {
        margin-right: 10px;
        display: inline-block;
        width: 12px;
        height: 18px;
      }
      .unit {
        font-size: 22px;
      }
      span {
        font-size: 30px;
        color: #000;
      }
    }
  }


}
</style>
