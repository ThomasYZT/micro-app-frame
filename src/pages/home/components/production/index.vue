<template>
  <div class="production">
    <div class="block-wrapper">
      <div class="block-header align-center">
        <t-card title="产品介绍"
                sub-title="Product Introduction"
                type="title"
                align="center" />
      </div>
      <div class="block-content carousel-wrapper">
        <carousel>
          <carouselItem>
            <div class="block-wrapper clip">
              <div class="block-content">
                <div class="animation-wrapper">
                  <img class="ani-1" src="../../../../assets/img/pic_product.png" alt="">
                  <img class="ani-2" src="../../../../assets/img/pic_one_music@2x.png" alt="">
                  <img class="ani-3" src="../../../../assets/img/pic_one_font@2x.png" alt="">
                </div>
                <div class="card-wrapper">
                  <t-card title="视频创作工具">
                    <p class="card-info">无需剪辑基础，无使用门槛，小白上手即用 <br>
                      颠覆传统操作，无需准备素材，文字即可生成视频<br>
                      海量视觉素材，自动搜索，智能匹配<br>
                      智能语音一键添加，音色完美拟人化</p>
                    <template slot="footer">
                      <t-button :icon="imgSrc.icon2" class="dark play-btn" @click="showTutorial">观看介绍</t-button>
                      <t-button :icon="{ pos: 'suffix', src: imgSrc.icon1 }" class="primary" @click="go('/upload')">立即体验</t-button>
                    </template>
                  </t-card>
                </div>
              </div>
            </div>
          </carouselItem>
          <carouselItem>
            <div class="block-wrapper upload">
              <div class="block-content">
                <div class="card-wrapper">
                  <t-card title="视频上传使用">
                    <p class="card-info">高效批量上传视频<br>
                      一键发布，极速审核<br>
                      高清长视频无压缩，保留最完美观赏体验<br>
                      公众号、小程序、APP多平台同时发布</p>
                    <template slot="footer">
                      <t-button :icon="{ pos: 'suffix', src: imgSrc.icon1 }" class="primary" @click="go('/upload')">立即体验</t-button>
                    </template>
                  </t-card>
                </div>

                <div class="animation-wrapper">
                  <img class="ani-1" src="../../../../assets/img/pic_upload.png" alt="">
                  <img class="ani-2" src="../../../../assets/img/pic_two_plane@2x.png" alt="">
                  <img class="ani-3" src="../../../../assets/img/pic_two_picture@2x.png" alt="">
                </div>
              </div>
            </div>
          </carouselItem>
          <carouselItem>
            <div class="block-wrapper business">
              <div class="block-content">
                <div class="animation-wrapper">
                  <img class="ani-1" src="../../../../assets/img/pic_flow.png" alt="">
                  <img class="ani-2" src="../../../../assets/img/pic_three_date@2x.png" alt="">
                  <img class="ani-3" src="../../../../assets/img/pic_three_light@2x.png" alt="">
                </div>
                <div class="card-wrapper">
                  <t-card title="流量/内容变现">
                    <p class="card-info">4亿平台用户基础，普通人上传内容播放也能轻松破百万<br>
                      随时转发，快速涨粉，极易传播<br>
                      付费，广告，电商多模式变现，助力收益增长<br>
                      个性算法推荐，高效触达属于你的粉丝群</p>
                    <template slot="footer">
                      <t-button :icon="{ pos: 'suffix', src: imgSrc.icon1 }" class="primary" @click="go('/upload')">立即体验</t-button>
                    </template>
                  </t-card>
                </div>
              </div>
            </div>
          </carouselItem>
        </carousel>
      </div>
    </div>

    <tutorialModal ref="tutorialModal"></tutorialModal>
  </div>
</template>

<script>
import carousel from '../../../../components/carousel';
import carouselItem from '../../../../components/carousel/carouselItem';
import tutorialModal from '../tutorialModal';
import icon1 from '../../../../assets/img/icon_arrow.png';
import icon2 from '../../../../assets/img/btn_play_icon@2x.png';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    tutorialModal,
    carousel,
    carouselItem
  },
  data () {
    return {
      imgSrc: {
        icon1,
        icon2
      }
    };
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'showLoginModal'
    ]),
    go (path) {
      if (!this.userInfo) {
        this.showLoginModal();
        return;
      }
      this.$router.push(path);
    },
    showTutorial () {
      this.$refs.tutorialModal.show();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.production {
  .carousel-wrapper {
    height: 480px;
    width: 100%;
  }
}
.clip {
  .block-content {
    padding-top: 60px;
    padding-bottom: 60px;

    .animation-wrapper {
      position: relative;
      .ani-1 {
        height: 360px;
      }

      .ani-2 {
        position: absolute;
        top: 0;
        left: 221px;
        height: 57px;
        animation: bottomToTop 3s linear infinite alternate;
      }
      .ani-3 {
        position: absolute;
        bottom: 10px;
        right: 108px;
        height: 120px;
        animation: rightToLeft 3s linear infinite alternate;
      }
    }
  }

  /deep/ .play-btn {
    .prefix-icon {
      margin-left: -7px;
      padding-top: 7px;
      height: 30px;
    }
  }
}
.upload {
  .block-content {
    padding-top: 60px;
    padding-bottom: 60px;

    .animation-wrapper {
      position: relative;
      .ani-1 {
        height: 360px;
      }

      .ani-2 {
        position: absolute;
        top: 45px;
        left: 155px;
        height: 44px;
        animation: rightToLeft 3s linear infinite alternate;
      }

      .ani-3 {
        position: absolute;
        top: 202px;
        right: 57px;
        height: 73px;
        animation: leftToRight 3s linear infinite alternate;
      }
    }
  }
}

.business {
  .block-content {
    padding-top: 60px;
    padding-bottom: 60px;

    .animation-wrapper {
      position: relative;
      .ani-1 {
        height: 360px;
      }
      .ani-2 {
        position: absolute;
        top: 40px;
        left: 112px;
        width: 142px;
        height: 85px;
        animation: bottomToTop 3s linear infinite alternate;
      }
      .ani-3 {
        position: absolute;
        bottom: 63px;
        right: 27px;
        width: 102px;
        height: 102px;
        animation: lightToDark 1s linear infinite alternate;
      }
    }
  }
}

.card-wrapper {
  /deep/ .card {
    height: 100%;
  }
}

.card-info {
  font-size: 18px;
  white-space: nowrap;
  line-height: 44px;
}
</style>
