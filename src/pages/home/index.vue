<template>
  <div class="page-container">
    <navBar />
    <div ref="content" class="content">
      <div class="block-wrapper">
        <div class="block-content">
          <div class="card-wrapper">
            <t-card title="引领全球视频表达"
                    :titleMark="true">
              <span>一个快速实现你 “ 从记录到创作，从创作到表达，从表达到分享” 全过程的视频发声平台。</span>
              <template slot="footer">
                <t-button class="primary">创作视频</t-button>
                <t-button class="white">发布视频</t-button>
              </template>
            </t-card>
          </div>
        </div>
      </div>

      <production/>
      <about/>
      <contact/>
    </div>
  </div>
</template>

<script>
import navBar from '../../components/navBar';
import about from './components/about';
import production from './components/production';
import contact from './components/contact';
import { rAF } from '../../assets/utils/common';
export default {
  components: {
    navBar,
    about,
    production,
    contact
  },
  data () {
    return {
      scrollMap: []
    };
  },
  methods: {
    scollHandler (index, fn) {
      const scollMap = this.genScrollMap();
      const that = this;
      const srollOffset = scollMap[index];
      const maxScrollHeight = this.$refs.content.scrollHeight - this.$refs.content.offsetHeight;
      const _dir = that.$refs.content.scrollTop > srollOffset ? 'down' : 'up';
      let _lastScrollTop = that.$refs.content.scrollTop;
      let timer = rAF(function tick () {
        const _speed = Math.ceil(Math.abs((_lastScrollTop - srollOffset) / 6));
        if (_speed <= 1 || that.$refs.content.scrollTop > maxScrollHeight) {
          that.$refs.content.scrollTop = srollOffset;
          fn && fn();
          window.cancelAnimationFrame(timer);
        } else {
          _dir === 'up'
            ? (_lastScrollTop = that.$refs.content.scrollTop += _speed)
            : (_lastScrollTop = that.$refs.content.scrollTop -= _speed);
          timer = rAF(tick);
        }
      });
    },
    genScrollMap () {
      const _childs = this.$refs.content.children;
      const _contentHeight = this.$refs.content.scrollHeight;
      const map = { 0: 0 };
      _childs.forEach((el, index) => {
        const cur = el.scrollHeight;
        if (index === _childs.length - 2) {
          map[index + 1] = _contentHeight - this.$refs.content.offsetHeight;
        } else if (index !== _childs.length - 1) {
          map[index + 1] = Object.values(map).reduce((sum, num) => { return sum + num; }) + cur;
        }
      });
      return map;
    }
  },
  mounted () {
    this.$bus.on('hashScroll', this.scollHandler);
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.page-container {
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .content {
    height: calc(100% - 80px);
    overflow-y: auto;
    .block-wrapper {
      position: relative;
      width: 100%;
      height: 400px;
      .block-content {
        @include flex_layout(row, flex-start, center);
        padding: 0 220px;
        .card-wrapper {

        }
      }
    }

    &::-webkit-scrollbar {
      z-index: 11;
      width: 0;
    }

    &:hover {
      &::-webkit-scrollbar {
        z-index: 11;
        width: 2px;
        &-thumb {
          border-radius: 5px;
          width: 2px;
          background: rgba(0,0,0, .6);
        }
      }
    }
  }

}

</style>
