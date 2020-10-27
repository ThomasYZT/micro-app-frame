<template>
  <div class="carousel-item"
       :class="{ 'animating' : animating }"
       :style="itemStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TCarouselItem',
  computed: {
    itemStyle () {
      return {
        display: this.display,
        transform: `translateX(${this.translate}px)`
      };
    }
  },
  data () {
    return {
      translate: 0,
      display: 'block',
      animating: true
    };
  },
  methods: {
    transformPosition (index, curIndex, oldIndex) {
      const len = this.$parent.items.length;
      this.animating = index === curIndex || oldIndex === index;
      if (curIndex === oldIndex) {
        return this.initPosition(index, curIndex);
      }
      if (index === curIndex) {
        this.translate = 0;
      } else if (index > curIndex) {
        if (curIndex === 0 && index === len - 1) {
          this.translate = -this.calcDistence();
        } else {
          this.translate = this.calcDistence();
        }
      } else {
        if (curIndex === len - 1 && index === 0) {
          this.translate = this.calcDistence();
        } else {
          this.translate = -this.calcDistence();
        }
      }
    },
    initPosition (index, curIndex) {
      if (index === curIndex) {
        this.translate = 0;
      } else if (index > curIndex) {
        this.translate = this.calcDistence();
      } else {
        this.translate = -this.calcDistence();
      }
    },
    calcDistence () {
      return this.$el.offsetWidth;
    }
  }
};
</script>

<style scoped lang="scss">
.carousel-item {
  position: absolute;
  left: 0;
  top: 0;
  vertical-align: top;
  width: 100%;
  height: 100%;

  &.animating {
    transition: all .3s ease-in-out;
  }
}
</style>
