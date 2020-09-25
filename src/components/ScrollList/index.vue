<template>
  <div ref="content"
       class="list-wrapper"
       @wheel="onwheel"
       @scroll="onScroll">
    <slot></slot>
  </div>
</template>

<script>
import { rAF } from '../../assets/utils/common';
export default {
  name: "ScrollList",
  data () {
    return {
      timer: null,
      scollMap: null,
    }
  },
  methods: {
    onwheel () {
      if (this.timer) {
        window.cancelAnimationFrame(this.timer);
        this.timer = null
      }
    },
    onScroll(e) {
      !this.scollMap && (this.scollMap = this.genScrollMap());
      this.$emit('scroll', e, this.scollMap)
    },
    scrollTo (index, fn) {
      if (this.timer) {
        window.cancelAnimationFrame(this.timer);
        this.timer = null
      }
      !this.scollMap && (this.scollMap = this.genScrollMap());
      const that = this;
      const srollOffset = this.scollMap[index];
      const maxScrollHeight = this.$refs.content.scrollHeight - this.$refs.content.offsetHeight;
      const _dir = that.$refs.content.scrollTop > srollOffset ? 'down' : 'up';
      let _lastScrollTop = that.$refs.content.scrollTop;
      this.timer = rAF(function tick () {
        const _speed = Math.ceil(Math.abs((_lastScrollTop - srollOffset) / 6));
        if (_speed <= 1 || that.$refs.content.scrollTop > maxScrollHeight) {
          that.$refs.content.scrollTop = srollOffset;
          fn && fn();
          window.cancelAnimationFrame(that.timer);
          that.timer = null
        } else {
          _dir === 'up'
            ? (_lastScrollTop = that.$refs.content.scrollTop += _speed)
            : (_lastScrollTop = that.$refs.content.scrollTop -= _speed);
          that.timer = rAF(tick);
        }
      });
    },
    genScrollMap () {
      const _hList = Object.values(this.$refs.content.childNodes).map(el => el.offsetHeight);
      const _contentHeight = this.$refs.content.scrollHeight;
      return _hList.map((curH, index) => {
        if (index !== _hList.length - 1) {
          return _hList.slice(0, index).reduce((s, c) => s + c, 0) - 91
        } else {
          return _contentHeight - this.$refs.content.offsetHeight;
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
.list-wrapper {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
