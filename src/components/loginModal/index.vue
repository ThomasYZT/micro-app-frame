<template>
  <div class="modal-wrapper">
    <t-modal v-model="visible">
      <div class="modal-box flex-box">
        <div class="left-box">
          <span class="code-title">请使用微信扫描登录</span>
          <div class="code" id="code"></div>
        </div>
        <div class="right-box">
          <img src="../../assets/img/pic_login_tips.png" alt="">
          <span>打开「微信」-「扫一扫」</span>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
import WxLogin from './wxLogin';
import config from '../../config';
export default {
  data () {
    return {
      visible: false
    };
  },
  methods: {
    show (name) {
      this.visible = true;
      this.$nextTick(() => {
        new WxLogin({
          id: 'code',
          appid: config.APPID,
          scope: 'snsapi_login',
          redirect_uri: encodeURIComponent(`${config.AUTHURL}${name ? `?jumpTo=${name}` : ''}`),
          href: 'data:text/css;base64,Ym9keSB7CiAgIGRpc3BsYXk6IGZsZXg7CiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7Cn0KLmxvZ2luUGFuZWwgLnRpdGxlIHsKICAgIGRpc3BsYXk6IG5vbmU7CiAgfQogIC5sb2dpblBhbmVsIC5pbmZvIHsKICAgIGRpc3BsYXk6IG5vbmU7CiAgfQogIC5pbXBvd2VyQm94IC5xcmNvZGUgewogICAgd2lkdGg6IDE4MHB4OwogICAgaGVpZ2h0OiAxODBweDsKICAgIG1hcmdpbi10b3A6IDA7CiAgICBib3JkZXI6IG5vbmU7CiAgfQoud2V1aV9tc2cgewogICBwYWRkaW5nLXRvcDogMTBweDsKfQoud2V1aV9tc2cgLndldWlfaWNvbl9hcmVhIHsKICAgbWFyZ2luLWJvdHRvbTogMDsKfQ=='
        });
      });
    },
    close () {
      this.visible = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.modal-wrapper {
  /deep/ .t-modal-box {
    width: 743Px;
    height: 560Px;
  }
}

.modal-box {
  width: 100%;
  height: 100%;
  &.flex-box {
    @include flex_layout(row, center, center);
    .left-box {
      @include flex_set(1, 1);
      @include flex_layout(column, center, center);
      padding: 30Px 0;
      border-right: 1Px solid #EDEDED;
      .code-title {
        margin-top: -10Px;
        margin-bottom: 50Px;
        color: #333333;
        font-size: 24Px;
      }
      .code {
        @include flex_layout(row, center, center);
        width: 200Px;
        height: 200Px;
        background: linear-gradient(to left, #FF4383, #FF4383) left top no-repeat,
        linear-gradient(to bottom, #FF4383, #FF4383) left top no-repeat,
        linear-gradient(to left, #FF4383, #FF4383) right top no-repeat,
        linear-gradient(to bottom, #FF4383, #FF4383) right top no-repeat,
        linear-gradient(to left, #FF4383, #FF4383) left bottom no-repeat,
        linear-gradient(to bottom, #FF4383, #FF4383) left bottom no-repeat,
        linear-gradient(to left, #FF4383, #FF4383) right bottom no-repeat,
        linear-gradient(to left, #FF4383, #FF4383) right bottom no-repeat;
        /*设置大小*/
        background-size: 3Px 20Px, 20Px 3Px, 3Px 20Px, 20Px 3Px;

        /deep/ iframe {
          width: 180Px;
          height: 180Px;

          .loginPanel  {
            .title {
              display: none;
            }
            .info {
              display: none;
            }
            .qrcode {
              width: 160Px;
              height: 160Px;
              margin-top: 0;
              margin-left: -6Px;
              border: 0;
            }
          }
        }
      }
    }
    .right-box {
      @include flex_set(1, 0);
      @include flex_layout(column, center, center);
      img {
        height: 360Px;
      }
      span {
        margin-top: 20Px;
        color: #666666;
        font-size: 14Px;
      }
    }
  }
}
</style>
