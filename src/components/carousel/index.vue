<template>
  <div class="carousel-wrapper" @mouseover="onMouseover" @mouseleave="onMouseleave">
    <slot></slot>
    <transition name="fade">
      <img v-if="showArrow" class="prev-arrow" src="./img/icon_viewpage_right@2x.png" alt="" @click="onPrev">
    </transition>
    <transition name="fade">
      <img v-if="showArrow" class="next-arrow" src="./img/icon_viewpage_ligt@2x.png" alt="" @click="onNext">
    </transition>

    <div class="index-box">
      <span v-for="(item, index) in items"
            :key="index"
            class="index-dot"
            :class="{ 'active-dot' : index === activeIndex }"
            @click="setActiveItem(index)">

      </span>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
export default {
  name: 'TCarousel',
  props: {
    interval: {
      type: Number,
      default: 5000
    }
  },
  data () {
    return {
      items: [],
      activeIndex: 0,
      showArrow: false,
      timer: null
    };
  },
  methods: {
    onMouseover () {
      this.pauseTimer();
      this.showArrow = true;
    },
    onMouseleave () {
      this.startTimer();
      this.showArrow = false;
    },
    getAllItems () {
      this.items = this.$children.filter(item => item.$options.name === 'TCarouselItem');
    },
    setActiveItem: throttle(function (index) {
      const len = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = len - 1;
      } else if (index > len - 1) {
        this.activeIndex = 0;
      } else {
        this.activeIndex = index;
      }
      this.updatePosition(this.activeIndex, oldIndex);
    }, 300),
    updatePosition (curIndex, oldIndex) {
      this.items.forEach((item, index) => {
        item.transformPosition(index, curIndex, oldIndex);
      });
    },
    startTimer () {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.setActiveItem(this.activeIndex + 1);
        }, this.interval);
      }
    },
    pauseTimer () {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    onPrev () {
      this.setActiveItem(this.activeIndex - 1);
    },
    onNext () {
      this.setActiveItem(this.activeIndex + 1);
    }
  },
  destroyed () {
    this.pauseTimer();
  },
  mounted () {
    this.getAllItems();
    this.setActiveItem(this.activeIndex);
    this.$nextTick(() => {
      this.startTimer();
    });
  }
};
</script>

<style scoped lang="scss">
.carousel-wrapper {
  position: relative;
  padding-bottom: 80px;
  width:  100%;
  height: 100%;
  white-space: nowrap;
  overflow-x: hidden;

  .prev-arrow, .next-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 60px;
    cursor: pointer;
  }

  .prev-arrow {
    left: 0;
  }
  .next-arrow {
    right: 0;
  }
  .index-box {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    .index-dot {
      display: inline-block;
      margin-right: 20px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(204, 204, 204, .5);
      cursor: pointer;
      transition: all .3s ease-in-out;

      &:last-child {
        margin-right: 0;
      }

      &.active-dot {
        position: relative;
        background-color: #FF4383;
        transition: all .3s ease-in-out;
        &:after {
          position: absolute;
          left: -10px;
          top: -10px;
          display: inline-block;
          content: ' ';
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #FF4383;
        }
      }
    }
  }

}
</style>
