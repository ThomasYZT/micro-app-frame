<template>
  <div class="page-container">
    <div class="page-content">
      <div class="header">
        <img src="https://weapppiccdn.yishihui.com/h5icon/activity/pc_pic_banner_out@2x.png" alt="">
        <img class="banner" src="https://weapppiccdn.yishihui.com/h5icon/activity/pc_pic_banner_in.png" alt="">
      </div>

      <div class="info-box" style="margin-top: -80px">
        <img class="top-left-angle" src="../../assets/img/activity/z@2x.png" alt="">
        <img class="top-right-angle" src="../../assets/img/activity/y@2x.png" alt="">
        <img class="bottom-left-angle" src="../../assets/img/activity/y@2x.png" alt="">
        <img class="bottom-right-angle" src="../../assets/img/activity/z@2x.png" alt="">
        <div class="info-box-header">活动规则介绍</div>
        <div class="info-box-content">
          <div class="img-block" style="padding: 0 34px;">
            <img src="../../assets/img/activity/text1@2x.png" alt="">
          </div>

          <div class="img-block">
            <img src="../../assets/img/activity/hdjl@2x.png" alt="">
          </div>
          <div class="img-block">
            <img src="https://weapppiccdn.yishihui.com/h5icon/activity/pc_hdsj@2x.png" alt="">
          </div>
          <div class="img-block">
            <img src="https://weapppiccdn.yishihui.com/h5icon/activity/pc_pxgz@2x.png" alt="">
          </div>
          <div class="img-block">
            <img src="https://weapppiccdn.yishihui.com/h5icon/activity/pc_hdyq@2x.png" alt="">
          </div>
          <div class="img-block">
            <img src="https://weapppiccdn.yishihui.com/h5icon/activity/pc_gbfs.png" alt="">
          </div>
          <div class="img-block">
            <img class="code-img" src="../../assets/img/activity/ewm@2x.png" alt="">
          </div>
        </div>
      </div>

      <div class="info-box carousel-box">
        <img class="top-left-angle" src="../../assets/img/activity/z@2x.png" alt="">
        <img class="top-right-angle" src="../../assets/img/activity/y@2x.png" alt="">
        <img class="bottom-left-angle" src="../../assets/img/activity/y@2x.png" alt="">
        <img class="bottom-right-angle" src="../../assets/img/activity/z@2x.png" alt="">
        <div class="info-box-header">优秀案例</div>
        <div class="info-box-content">
          <t-carousel class="carousel" bottom="20px">
            <t-carousel-item v-for="(group, index) in videoGroup"
                             :key="index">
              <div class="video-display-block">
                <div class="video-card"
                     v-for="(item, index) in group"
                     :key="index"
                     @click="playVideo(item)">
                  <div class="cover-block"
                       :style="{ backgroundImage: `url(${item.videoCover})` }">
                    <img class="play-btn" src="../../assets/img/icon_paly@2x.png" alt="">
                  </div>
                  <div class="info-block">
                    <div class="title">{{item.title}}</div>
                    <div class="user">
                      <img :src="item.avatar" alt="">
                      {{item.nickName}}
                    </div>
                  </div>
                </div>
              </div>
            </t-carousel-item>
          </t-carousel>
        </div>
      </div>
    </div>
    <img class="entry-btn" src="https://weapppiccdn.yishihui.com/h5icon/activity/pc_annie@2x.png" alt="" @click="goClip">
    <videoPlayModal ref="videoPlayModal"></videoPlayModal>
  </div>
</template>

<script>
import videoPlayModal from '../../components/videoPlayModal';
import { videoGroup } from './activityData';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    videoPlayModal
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data () {
    return {
      videoGroup
    };
  },
  methods: {
    ...mapActions([
      'showLoginModal'
    ]),
    playVideo (item) {
      this.$refs.videoPlayModal.show(item.src);
    },
    goClip () {
      if (this.userInfo) {
        this.$router.push('/clip');
      } else {
        this.showLoginModal('clip');
      }
      window.MtaH5 && window.MtaH5.clickStat('100001');
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.page-container {
  height: 100%;
  background-color: #010A22;
  font-size: 0;
  overflow-y: auto;

  .entry-btn {
    position: absolute;
    bottom: 60Px;
    left: 50%;
    transform: translateX(-50%);
    width: 187Px;
    cursor: pointer;
  }

  .page-content {
    position: relative;
    padding-bottom: 130Px;

    .header {
      position: relative;

      .banner {
        position: absolute;
        width: 900px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -55%);
      }
    }
  }

  img {
    width: 100%;
  }

  .carousel-box {
    margin-bottom: 0;
    .info-box-content {
      padding: 100Px 0 60Px;

      .carousel {
        height: 560Px;
        margin-top: 30Px;
        .video-display-block {
          @include flex_layout(row, space-between, flex-start);
          flex-wrap: wrap;
          padding: 0 60Px 0;
          width: calc(100% - 120Px);
          height: 100%;
          .video-card {
            @include flex_set(0, 1, 274Px);
            @include flex_layout(column, center, center);
            width: 274Px;
            height: 280Px;
            cursor: pointer;

            .cover-block {
              position: relative;
              flex: 1 0 154Px;
              height: 154Px;
              width: 100%;
              border-radius: 8Px;
              background-size: 100% auto;
              background-position: center;

              .play-btn {
                position: absolute;
                height: 50Px;
                width: 50Px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }

            .info-block {
              position: relative;
              flex: 0 1 126Px;
              padding-top: 14Px;
              height: 126Px;
              width: 100%;
              color: #FFFFFF;
              text-align: left;

              .title {
                margin-bottom: 12Px;
                font-size: 18Px;
                font-weight: bold;
                white-space: normal;
              }
              .user {
                position: absolute;
                bottom: 0;
                @include flex_layout(row, flex-start, center);
                font-size: 14Px;
                img {
                  margin-right: 10Px;
                  height: 30Px;
                  width: 30Px;
                  border-radius: 50%;
                }
              }
            }
          }
        }

        /deep/ .index-dot {
          &.active-dot {
            background-color: #FFFFFF;
            &:after {
              border-color: #FFFFFF;
            }
          }
        }
      }
    }
  }

  .img-block {
    text-align: center;
    margin-top: 60Px;
  }

  .code-img {
    width: 435Px;
  }
}

.info-box {
  padding: 2Px 2Px;
  position: relative;
  margin: 0 auto 60Px;
  width: 1000Px;
  border-radius: 12Px;
  background-image: linear-gradient(180deg, rgba(95, 49, 137, 1), rgba(9, 76, 82, 1));
  .info-box-header {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 240Px;
    height: 76Px;
    line-height: 76Px;
    font-size: 28Px;
    font-weight: bold;
    color: #FFFFFF;
    background-image: url("../../assets/img/activity/pc_font_bj@2x.png");
    background-size: 100% 100%;
  }
  .info-box-content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 100Px 60Px 60Px;
    border-radius: 12Px;
    background-color: #2B195B;
  }
  .top-left-angle,
  .top-right-angle,
  .bottom-left-angle,
  .bottom-right-angle {
    position: absolute;
    height: 30Px;
    width: 30Px;
  }

  .top-left-angle {
    top: 15Px;
    left: 15Px;
  }

  .top-right-angle {
    top: 15Px;
    right: 15Px;
  }

  .bottom-left-angle {
    bottom: 15Px;
    left: 15Px;
  }

  .bottom-right-angle {
    bottom: 15Px;
    right: 15Px;
  }
}
</style>
