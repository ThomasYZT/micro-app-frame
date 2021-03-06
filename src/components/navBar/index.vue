<template>
  <div class="nav-wrapper" :style="{ backgroundColor: bgColor }">
    <div class="nav-bar">
      <div class="nav-title">
        <img class="logo" src="../../assets/img/pc_logo@2x.svg" alt="" @click="threebleClick">
      </div>
      <div class="nav-list">
        <div v-slide class="nav-list-wrapper">
          <div class="nav-item"
               v-for="item in navList"
               :key="item.hash"
               :class="{ 'active' : item.hash === curHash }"
               @click="onItemClick(item.hash)">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="login-block" @click="login">
        <div class="login-btn">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { mapActions } from 'vuex';
export default {
  props: {
    bgColor: {
      type: String,
      default: 'none'
    },
    curNav: {
      type: String,
      default: '0'
    }
  },
  directives: {
    slide: (() => {
      let _parent = null;
      let _bar = null;
      let _offsetMap = {};
      let _curHash = 0;

      const reset = () => {
        _parent = null;
        _bar && _bar.remove ? _bar.remove() : _bar.removeNode(true);
        _bar = null;
        _offsetMap = {};
        _curHash = 0;
      };

      const resize = debounce(() => {
        _bar && (_bar.remove ? _bar.remove() : _bar.removeNode());
        _bar = null;
        _offsetMap = {};
        init(_parent, _curHash);
      }, 1000);

      function init (el, curHash = 0) {
        _parent = el;
        const items = document.getElementsByClassName('nav-item');
        items.forEach((item, index) => {
          _offsetMap[index] = {
            width: item.offsetWidth * 0.4,
            itemWidth: item.offsetWidth,
            xAxis: (Object.values(_offsetMap).reduce((s, item) => s + item.itemWidth, 0) || 0) + item.offsetWidth * 0.3
          };
        });
        _bar = document.createElement('span');
        _bar.setAttribute('class', 'active-line');
        _bar.style.width = `${_offsetMap[curHash].width}px`;
        _bar.style.transform = `translateX(${_offsetMap[curHash].xAxis}px)`;
        _parent.appendChild(_bar);

        window.addEventListener('resize', resize);
      }

      return {
        inserted: function (el) {
          init(el);
        },
        update: function (el, bind, vnode) {
          _curHash = vnode.context.curHash;
          _bar.style.display = `inline-block`;
          _bar.style.width = `${_offsetMap[_curHash].width}px`;
          _bar.style.transform = `translateX(${_offsetMap[_curHash].xAxis}px)`;
        },
        unbind: function () {
          reset();
          window.removeEventListener('resize', resize);
        }
      };
    })()
  },
  data () {
    return {
      curHash: '0',
      navList: [
        {
          name: '首页',
          hash: '0',
          active: true
        },
        {
          name: '产品介绍',
          hash: '1'
        },
        {
          name: '优秀案例',
          hash: '2'
        },
        {
          name: 'App/小程序',
          hash: '3'
        },
        {
          name: '关于我们',
          hash: '4'
        }
      ]
    };
  },
  methods: {
    ...mapActions([
      'showLoginModal'
    ]),
    onItemClick (hash) {
      this.curHash = hash;
      if (this.$route.path === '/' && hash) {
        this.$emit('update:curNav', hash);
        this.$emit('navClick', hash);
      }
    },
    login () {
      this.showLoginModal();
    },
    threebleClick: (() => {
      let count = 0;
      let t = null;
      return function () {
        count += 1;
        if (count === 3) {
          count = 0;
          this.$emit('titleClick');
        } else {
          clearTimeout(t);
          t = setTimeout(() => {
            count = 0;
          }, 300);
        }
      };
    })()
  },
  watch: {
    curNav: {
      handler (newVal) {
        this.curHash = newVal;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.nav-wrapper {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;

  .nav-bar {
    display: flex;
    max-width: 1000px;
    height: 100%;
    margin: auto;
    .nav-title {
      @include flex_layout(column, center, flex-start);
      @include flex_set(0, 1, auto);
      height: 100%;

      .logo {
        height: 21px;
      }
    }

    .nav-list {
      @include flex_set(1, 0, auto);
      @include flex_layout(row, flex-end, center);
      height: 100%;

      .nav-list-wrapper {
        position: relative;
        display: inline-block;
        height: 100%;
        .nav-item {
          display: inline-block;
          height: 100%;
          line-height: 68px;
          padding: 0 20px;
          white-space: nowrap;
          font-size: 18px;
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
        }

        /deep/ .active-line {
          position: absolute;
          left: 0;
          bottom: 9px;
          display: inline-block;
          width: 22px;
          height: 4px;
          background-color: $primary_color;
          transition: transform .3s cubic-bezier(.645,.045,.355,1);
        }
      }
    }
  }
  .login-block {
    display: flex;
    align-items: center;
    .login-btn {
      display: inline-block;
      margin-left: 20px;
      padding: 5px 10px;
      color: #FFFFFF;
      line-height: 20px;
      font-size: 14px;
      text-align: justify;
      background: #160A19;
      border-radius: 4px;
      cursor: pointer;
      transition: all .3s linear;

      &:hover {
        background-color: rgba(22, 10, 25, 0.5);
      }
    }
  }

}
</style>
