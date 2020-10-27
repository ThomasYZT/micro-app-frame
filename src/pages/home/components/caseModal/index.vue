<template>
  <div class="modal-wrapper">
    <t-modal v-model="visible">
      <div class="dialog-wrapper">
        <div class="dialog-header">
          <div class="nav-list">
            <div v-slide="curHash" class="nav-list-wrapper">
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
        <div class="dialog-body">
          <div v-for="(item, index) in videoList"
               v-show="index === curHash"
               class="info-panel">
            <div class="info-block">
              <div class="cover-block"
                   :style="{ backgroundImage: `url(${item.videoCover})` }">
                <video v-if="index === curHash && visible"
                       ref="video"
                       loop="loop"
                       controls
                       autoplay="autoplay"
                       :src="item.src"
                       id="clipEntryVideo">抱歉，您的浏览器不支持内嵌视频</video>
              </div>
              <div class="detail-block">
                <div class="desc" v-html="item.desc"></div>
                <div class="author">
                  <img style="height: 48px;" src="./img/pic_pop_bj@2x.png" alt="">
                  <span>—— {{item.userName}}</span>
                </div>
                <div class="operator">
                  <div class="t-btn" @click="goClip('check')">
                    查看创作过程
                    <img style="height: 12px;margin-left: 6px;" src="./img/btn-angle-dark@2x.png.png" alt="">
                  </div>
                  <div class="t-btn primary-btn" @click="goClip('go')">
                    开始我的创作
                    <img style="height: 12px;margin-left: 6px;" src="./img/btn-angle-white@2x.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
export default {
  directives: {
    slide: (() => {
      let _parent = null;
      let _bar = null;
      let _offsetMap = {};
      let _curHash = 0;

      const reset = () => {
        _parent = null;
        _bar && _bar.remove();
        _bar = null;
        _offsetMap = {};
        _curHash = 0;
      };

      const resize = debounce(() => {
        _bar && _bar.remove();
        _bar = null;
        _offsetMap = {};
        init(_parent, _curHash);
      }, 1000);

      function init (el, curHash = 0) {
        _parent = el;
        const items = Array.from(el.getElementsByClassName('nav-item'));
        console.log(items);
        items.forEach((item, index) => {
          _offsetMap[index] = {
            width: item.offsetWidth * 0.4,
            itemWidth: item.offsetWidth,
            xAxis: (Object.values(_offsetMap).reduce((s, item) => s + item.itemWidth, 0) || 0) + item.offsetWidth * 0.3
          };
        });
        console.log(_offsetMap);
        _bar = document.createElement('span');
        _bar.setAttribute('class', 'active-line');
        _bar.style.width = `${_offsetMap[curHash].width}px`;
        _bar.style.transform = `translateX(${_offsetMap[curHash].xAxis}px)`;
        _parent.appendChild(_bar);

        window.addEventListener('resize', resize);
      }

      return {
        inserted: function (el, bind) {
          setTimeout(() => {
            init(el, bind.value || 0);
          });
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
  props: {
    videoList: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      visible: false,
      curHash: 0,
      navList: [
        {
          name: '文章生成视频',
          hash: 0,
          active: true
        },
        {
          name: '视频加讲解',
          hash: 1
        },
        {
          name: '极速剪辑',
          hash: 2
        }
      ]
    };
  },
  methods: {
    show (index) {
      this.curHash = index;
      this.visible = true;
    },
    hide () {
      this.visible = false;
    },
    onItemClick (hash) {
      this.curHash = hash;
    },
    goClip (type) {
      this.$emit('goClick', {
        type,
        link: type === 'check' ? this.videoList[this.curHash].clipAddr : ''
      });
      if (this.$refs.video) {
        this.$refs.video.forEach(video => {
          video.pause();
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.modal-wrapper {
  /deep/ .t-modal-box {
    width: 1000Px;
    height: 480Px;

    .t-close-btn {
      height: 20px;
    }
  }

  .dialog-wrapper {
    .dialog-header {
      position: relative;
      border-bottom: 1px solid #EAEAEA;
      .nav-list {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        .nav-list-wrapper {
          position: relative;
          display: inline-block;
          white-space: nowrap;
          height: 100%;
          .nav-item {
            display: inline-block;
            height: 100%;
            line-height: 68px;
            padding: 0 20px;
            white-space: nowrap;
            font-size: 18px;
            color: #453B47;
            cursor: pointer;
            transition: all .3s;
            &:hover {
              color: #160A19;
            }

            &.active {
              color: #160A19;
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
            background-color: #FF4383;
            transition: transform .3s cubic-bezier(.645,.045,.355,1);
          }
        }
      }
    }

    .dialog-body {
      padding: 40px 40px;

      .info-panel {
        height: 100%;
        width: 100%;
        .info-block {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 320px;

          .cover-block {
            flex: 1 0 567px;
            width: 567px;
            height: 100%;
            background-size: 100% 100%;
            background-position: center;

            video {
              width: 100%;
              height: 100%;
            }
          }

          .detail-block {
            flex: 0 1 353px;
            padding: 10px 0 0 30px;
            width: 100%;
            height: 100%;

            .desc {
              font-size: 18px;
              color: #333333;
              line-height: 35px;
              text-align: left;
              /deep/ .em-test {
                color: #FF4383;
                font-weight: bold;
              }
            }

            .author {
              margin-top: 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 18px;
              color: #333333;
              font-weight: bold;
            }

            .operator {
              margin-top: 30px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .t-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 20px;
                height: 44px;
                border: 1px solid #E5E5E5;
                font-size: 14px;
                color: #666666;
                border-radius: 8px;
                background-color: #FFFFFF;
                cursor: pointer;

                &.primary-btn {
                  color: #FFFFFF;
                  background: #FF4383;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
