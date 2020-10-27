<template>
  <div v-if="!isDoubleSide" ref="TimelineItem" :data-label="label" class="timeline-item">
    <div v-if="hasTail" class="tail" @mouseenter="onActive">
      <img ref="flag" src="../img/pic_five_plane@2x.png" alt="">
      <div class="time">
        <img class="arrow" src="../img/icon_arrow_red@2x.png" alt="">
        <span>{{time}} <span class="unit">年</span> </span>
      </div>
    </div>
    <slot></slot>
  </div>
  <div v-else ref="TimelineItem" :data-label="label" class="double-timeline-item">
    <div v-if="hasTail" class="tail" @mouseenter="onActive">
      <img ref="flag" src="../img/pic_five_plane@2x.png" alt="">
    </div>
    <div ref="content" class="content">
      <div v-if="leftTime" class="left-radius">
        <div class="radius"></div>
        <div class="line"></div>
      </div>
      <div v-if="rightTime" class="right-radius"></div>
      <div class="left-block">
        <div ref="leftTime" class="time">{{leftTime}}</div>
        <slot name="left"></slot>
      </div>

      <div class="right-block">
        <div ref="rightTime" class="time">{{rightTime}}</div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineItem',
  inject: ['onItemActive', 'activeItem'],
  props: {
    hasTail: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    leftTime: {
      type: String,
      default: ''
    },
    rightTime: {
      type: String,
      default: ''
    }
  },
  computed: {
    isDoubleSide () {
      return this.$parent.doubleSide;
    }
  },
  data () {
    return {
      leftRadiusStyle: {
        height: '',
        width: ''
      },
      rightRadiusStyle: {
        height: '',
        width: ''
      }
    };
  },
  methods: {
    onActive (e) {
      this.onItemActive(e, this.label);
    },
    calculateStyle () {
      const itemHeight = this.$refs.content.offsetHeight;
      const lTimeH = this.$refs.leftTime.offsetHeight;
      const rTimeH = this.$refs.rightTime.offsetHeight;
      this.leftRadiusStyle.height = this.leftRadiusStyle.width = `${itemHeight - (lTimeH / 2)}px`;
      this.rightRadiusStyle.height = this.rightRadiusStyle.width = `${itemHeight - (rTimeH / 2)}px`;
    }
  },
  mounted () {
    if (this.label === this.activeItem.value) {
      this.onItemActive({}, this.label, true);
    }
    this.isDoubleSide && this.calculateStyle();
  }
};
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
    bottom: -2px;
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

  }
  .time {
    @include flex_layout(row, center, center);
    position: absolute;
    left: -150px;
    bottom: 0;
    width: 120px;
    height: 100%;
    font-weight: bold;
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

.double-timeline-item {
  padding-top: 40px;
  padding-bottom: 37px;
  position: relative;

  &:after {
    position: absolute;
    left: 50%;
    bottom: 2px;
    transform: translateX(-50%);
    content: ' ';
    width: 1Px;
    height: 100%;
    background-color: #EAEAEA;
  }

  &:first-child {
    padding-top: 0;
    &:after {
      width: 0;
      height: 0;
      content: '';
    }
  }

  .content {
    @include flex_layout(row, flex-start, flex-start);
    position: relative;
    height: 100%;
    width: 100%;

    .left-radius {
      position: absolute;
      bottom: 0;
      right: 50%;
      height: 100%;
      width: 50%;
      .radius {
        z-index: 4;
        position: absolute;
        bottom: 0;
        right: 0;
        height: calc(100% - 20Px);
        width: 50Px;
        border-top: 1Px solid #EAEAEA;
        border-right: 1Px solid #EAEAEA;
        border-top-right-radius: 75%;
      }
      &:after {
        z-index: 3;
        content: ' ';
        position: absolute;
        right: 50Px;
        top: 19Px;
        height: 1Px;
        width: 70%;
        background-color: #EAEAEA;
      }
    }

    .right-radius {
      position: absolute;
      left: 50%;
      bottom: 0;
      height: calc(100% - 20Px);
      width: 50Px;
      border-left: 1Px solid #EAEAEA;
      border-top: 1Px solid #EAEAEA;
      border-top-left-radius: 75%;
    }

    .left-block, .right-block {
      position: relative;
      text-align: left;
    }
    .left-block {
      @include flex_set(1, 0, 50%);
      padding-right: 66px;
    }
    .right-block {
      @include flex_set(1, 0, 50%);
    }

    .time {
      position: relative;
      z-index: 5;
      padding-right: 20px;
      display: inline-block;
      margin-bottom: 8px;
      font-size: 22px;
      font-weight: bold;
      color: #333333;
      background-color: white;

      &:after {
        content: ' ';
        position: absolute;
        right: 0;
      }
    }
  }

  .tail {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    cursor: pointer;
    font-size: 0;

    img {
      height: 37px;
    }

    .active-flag {
      position: absolute;
      top: 0;
      left: 0;
    }

  }
}
</style>
