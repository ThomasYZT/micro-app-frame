<template>
  <div class="page-container">
    <navBar :bg-color="navBgColor"
            @navClick="scollHandler"/>

    <div ref="content"
         class="content"
         @wheel="onwheel"
         @scroll="onScroll">
      <div class="hash block-wrapper home-block">
        <img class="home-bg" src="../../assets/img/home_bg.png" alt="">
        <div class="block-content">
          <div class="card-wrapper">
            <t-card :title="`引领全球视频表达<br/>让你的观点被世界看见`"
                    :titleMark="true">
              <div class="custom-content">
                <h3 class="sub-title">4亿用户-都在用的视频创作分享平台</h3>
                <p class="content">一个快速实现你 “ 从记录到创作，从创作到表达，从表达到分享” 全过程的视频发声平台。</p>
              </div>
              <template slot="footer">
                <t-button :icon="imgSrc.icon1" class="primary" @click="go('/clip')">创作视频</t-button>
                <t-button :icon="imgSrc.icon2"  class="white" @click="go('/pc')">发布视频</t-button>
              </template>
            </t-card>
          </div>

          <div class="animation-wrapper">
            <img class="ani-1" src="../../assets/img/pic_desktop.png" alt="">
            <img class="ani-2" src="../../assets/img/pic_person_one.png" alt="">
            <img class="ani-3" src="../../assets/img/pic_person_two.png" alt="">
            <img class="ani-4" src="../../assets/img/pic_person_three.png" alt="">
          </div>
        </div>
      </div>

      <production class="hash"/>
      <about class="hash"/>
      <contact class="hash"/>

    </div>
  </div>
</template>

<script>
import navBar from '../../components/navBar';
import about from './components/about';
import production from './components/production';
import contact from './components/contact';
import { rAF } from '../../assets/utils/common';
import icon1 from '../../assets/img/icon_create.png';
import icon2 from '../../assets/img/icon_upload.png';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    navBar,
    about,
    production,
    contact
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data () {
    return {
      imgSrc: {
        icon1,
        icon2
      },
      scrollMap: [],
      timer: null,
      onTop: true,
      navBgColor: 'none'
    };
  },
  methods: {
    ...mapActions([
      'showLoginModal'
    ]),
    onScroll (e) {
      if (e.target.scrollTop <= 0) {
        this.navBgColor !== 'transparent' && (this.navBgColor = 'transparent');
      } else {
        this.navBgColor !== '#FFFFFF' && (this.navBgColor = '#FFFFFF');
      }
    },
    onwheel () {
      if (this.timer) {
        window.cancelAnimationFrame(this.timer);
        this.timer = null
      }
    },
    scollHandler (index, fn) {
      if (this.timer) {
        window.cancelAnimationFrame(this.timer);
        this.timer = null
      }
      const scollMap = this.genScrollMap();
      const that = this;
      const srollOffset = scollMap[index];
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
      const _childs = document.getElementsByClassName('hash');
      const _contentHeight = this.$refs.content.scrollHeight;
      const map = { 0: 0 };
      _childs.forEach((el, index) => {
        const cur = el.scrollHeight;
        if (index === _childs.length - 2) {
          map[index + 1] = _contentHeight - this.$refs.content.offsetHeight - 68;
        } else if (index !== _childs.length - 1) {
          map[index + 1] = Object.values(map).reduce((sum, num) => { return sum + num; }) + cur - 68;
        }
      });
      return map;
    },
    go (path) {
      if (!this.userInfo) {
        this.$msg.error('请先登录');
        this.showLoginModal();
        return;
      }
      this.$router.push(path);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$wow('.wow')
    })
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
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    .home-block {
      min-height: 100%;
      margin: 0 auto;
      position: relative;
      .home-bg {
        width: 100%;
        height: 100%;
      }

      .block-content {
        @include pos_set(absolute, 0, 0, 0, 0);
        margin-bottom: 94px;

        .animation-wrapper {
          position: relative;
          .ani-1 {
            width: 390px;
          }
          .ani-2 {
            position: absolute;
            top: 40px;
            left: -220px;
            width: 350px;
            animation: leftToRight 3s linear infinite alternate;
          }
          .ani-3 {
            position: absolute;
            left: 50%;
            bottom: -310px;
            margin-left: -200px;
            width: 270px;
            animation: bottomToTop 3s linear infinite alternate;
          }
          .ani-4 {
            position: absolute;
            top: 40px;
            right: -200px;
            width: 320px;
            animation: rightToLeft 3s linear infinite alternate;
          }
        }

        .custom-content {
          .sub-title {
            font-size: 21.5px;
            margin-bottom: 12px;
          }

          .content {
            font-size: 14px;
            color: #160A19;
          }

        }
      }
    }


    &::-webkit-scrollbar {
      z-index: 11;
      width: 0;
    }

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


</style>
