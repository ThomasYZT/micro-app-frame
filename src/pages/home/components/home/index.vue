<template>
  <div class="home">
    <div class="block-wrapper home-block">
      <img class="home-bg" src="../../../../assets/img/home_bg.png" alt="">
      <div class="block-content">
        <div class="card-wrapper">
          <t-card :title="`引领全球视频表达<br/>让你的观点被世界看见`"
                  :titleMark="true">
            <div class="custom-content">
              <h3 class="sub-title">4亿用户 - 都在用的视频创作分享平台</h3>
              <p class="content">打破视频创作边界，用更简洁的操作，更智能的技术，更短的时间，创造更精致的视频。</p>
            </div>
            <template slot="footer">
              <t-button :icon="imgSrc.icon1" class="primary" @click="go('/clip')">创作视频</t-button>
              <t-button :icon="imgSrc.icon2"  class="white" @click="go('/upload')">发布视频</t-button>
            </template>
          </t-card>
        </div>

        <div class="animation-wrapper">
          <img class="ani-1" src="../../../../assets/img/pic_desktop.png" alt="">
          <img class="ani-2" src="../../../../assets/img/pic_person_one.png" alt="">
          <img class="ani-3" src="../../../../assets/img/pic_person_two.png" alt="">
          <img class="ani-4" src="../../../../assets/img/pic_person_three.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import icon1 from '../../../../assets/img/icon_create@2x.png';
import icon2 from '../../../../assets/img/icon_upload.png';
export default {
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
      }
    };
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.home {
  min-height: 100%;
  .home-block {
    min-height: 100%;
    margin: 0 auto;
    position: relative;
    .home-bg {
      width: 100%;
      height: 100%;
    }

    .block-content {
      @include flex_layout(row, space-between, flex-start);
      @include pos_set(absolute, 0, 0, 0, 0);
      margin-top: 140px;
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
          color: rgba(51, 51, 51, 0.8);
          white-space: nowrap;
        }

        .content {
          font-size: 14px;
          color: rgba(51, 51, 51, .8);
        }
      }
    }
  }
}
</style>
