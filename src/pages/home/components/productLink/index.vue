<template>
  <div class="product-link">
    <div class="bg">
      <img class="bg" src="../../../../assets/img/pic_four_bj.jpg" alt="">
      <div class="mask"></div>
    </div>

    <div class="block-wrapper">
      <div class="block-content">
        <img class="ani-1 wow" data-animate="fadeInUp" src="../../../../assets/img/pic_four_code@2x.png" alt="">
        <div class="card-wrapper wow"  data-animate="fadeInUp">
          <t-card title="移动端快捷创作">
            <p class="card-info">不受场景限制，移动制作上传发布视频
              APP+小程序双端操作，随时记录灵感分享创意
              高清视频永久保存，释放手机内存
              智能算法推荐，主动唤醒粉丝，不错过你的消息</p>
            <template slot="footer">
              <t-button :icon="imgSrc.icon1" hover-expand class="white hover-expand">
                下载APP
                <div class="code-wrapper" slot="expand">
                  <img class="qr-code" v-lazy="imgSrc.code1" src="" alt="">
                  <span>扫描二维码，下载APP</span>
                </div>
              </t-button>
              <t-button :icon="imgSrc.icon2" hover-expand class="primary hover-expand">
                打开小程序
                <div class="code-wrapper" slot="expand">
                  <img class="qr-code circle" v-lazy="imgSrc.code2" src="" alt="">
                  <span>扫描二维码，打开小程序</span>
                </div>
              </t-button>
            </template>
          </t-card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import icon1 from '../../../../assets/img/pic_four_ewm.png';
import icon2 from '../../../../assets/img/pic_four_ewm_red.png';
import code1 from '../../../../assets/img/app_qrcode.png';
import code2 from '../../../../assets/img/mini_pro_code.png';
export default {
  data () {
    return {
      imgSrc: {
        icon1,
        icon2,
        code1,
        code2
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.product-link {
  position: relative;
  .bg {
    position: relative;
    width: 100%;
    font-size: 0;

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .8);
    }
    img {
      width: 100%;
    }
  }

  .block-wrapper {
    @include pos_set(absolute, 0, 0, 0, 0);
    width: 100%;
    height: 100%;

    .block-content {
      @include flex_layout(row, space-between, center);
      margin: 0 auto;
      height: 100%;

      .ani-1 {
        height: 400px;
      }

      .card-wrapper {
        color: #FFFFFF;
        /deep/ .card {
          .title {
            color: #FFFFFF;
          }
        }
      }
    }
  }
  .card-info {
    font-size: 14px;
    line-height: 44px;
  }

  .code-wrapper {
    @include flex_layout(column, center, center);
    padding: 20px 0;
    .qr-code {
      margin-bottom: 8px;
      width: 126px;

      &.circle {
        border-radius: 50%;
      }
    }

    span {
      font-size: 14px;
      font-weight: normal;
    }
  }
}
</style>
