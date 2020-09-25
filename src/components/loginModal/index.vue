<template>
  <div v-if="visible" class="modal-wrapper" ref="modalWrapper" @click.self="close">
    <div class="modal-box">
      <div class="modal-body flex-box">
        <div class="left-box">
          <span class="code-title">请使用微信扫描登录</span>
          <div class="code" id="code"></div>
        </div>
        <div class="right-box">
          <img src="../../assets/img/pic_login_tips.png" alt="">
          <span>打开「微信」-「扫一扫」</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WxLogin from './wxLogin';
import config from '../../config';
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    //-------------------------------------------------------
    //  业务逻辑
    //-------------------------------------------------------
    show () {
      this.showMask();
      this.visible = true;
      this.$nextTick(() => {
        new WxLogin({
          id : 'code',
          appid : config.APPID,
          scope : 'snsapi_login',
          redirect_uri : encodeURIComponent(`${config.AUTHURL}`),
          href: 'data:text/css;base64,Ym9keSB7CiAgIGRpc3BsYXk6IGZsZXg7CiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7Cn0KLmxvZ2luUGFuZWwgLnRpdGxlIHsKICAgIGRpc3BsYXk6IG5vbmU7CiAgfQogIC5sb2dpblBhbmVsIC5pbmZvIHsKICAgIGRpc3BsYXk6IG5vbmU7CiAgfQogIC5pbXBvd2VyQm94IC5xcmNvZGUgewogICAgd2lkdGg6IDE4MHB4OwogICAgaGVpZ2h0OiAxODBweDsKICAgIG1hcmdpbi10b3A6IDA7CiAgICBib3JkZXI6IG5vbmU7CiAgfQoud2V1aV9tc2cgewogICBwYWRkaW5nLXRvcDogMTBweDsKfQoud2V1aV9tc2cgLndldWlfaWNvbl9hcmVhIHsKICAgbWFyZ2luLWJvdHRvbTogMDsKfQ=='
        });
      })
    },
    close () {
      this.closeMask();
      this.visible = false;
    },
    //-------------------------------------------------------
    //  公共逻辑
    //-------------------------------------------------------
    showMask () {
      let mask = this.createMask();
      let maskZIndex = mask.style.zIndex;
      setTimeout(() => {
        this.$refs.modalWrapper.style.zIndex = Number(maskZIndex) + 1;
        mask.style.backgroundColor = 'rgba(0, 0, 0, .5)';
      }, 0)
    },
    closeMask () {
      let mask = document.getElementsByClassName('t-mask').length > 0
        ? document.getElementsByClassName('t-mask')[0]
        : null;
      if (mask) {
        mask.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        setTimeout(() => {
          mask.remove();
        }, 300)
      }
    },
    createMask () {
      if (document.getElementsByClassName('t-mask').length === 0) {
        let maxZIndex = this.getMaxZIndex();
        let mask = document.createElement('div');
        mask.setAttribute('class', 't-mask');
        mask.style.zIndex = maxZIndex + 1;
        document.body.appendChild(mask);
        return mask;
      } else {
        return document.getElementsByClassName('t-mask')[0];
      }
    },
    getMaxZIndex () {
      return [...document.body.querySelectorAll('*')].reduce((r, e) => {
        return Math.max(r, +window.getComputedStyle(e).zIndex || 0)
      }, 0)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.modal-wrapper {
  @include pos_set(fixed, 0,0,0,0);
  width: 100%;
  height: 100%;
  .modal-box {
    position: relative;
    margin: 25% auto;
    transform: translateY(-50%);
    width: 743px;
    height: 560px;
    background: #FFFFFF;
    border-radius: 24px;
    .modal-body {
      width: 100%;
      height: 100%;
      &.flex-box {
        @include flex_layout(row, center, center);
        .left-box {
          @include flex_set(1, 1);
          @include flex_layout(column, center, center);
          .code-title {
            margin-bottom: 50px;
            color: #333333;
            font-size: 24px;
          }
          .code {
            @include flex_layout(row, center, center);
            width: 200px;
            height: 200px;
            background: linear-gradient(to left, #FF4383, #FF4383) left top no-repeat,
            linear-gradient(to bottom, #FF4383, #FF4383) left top no-repeat,
            linear-gradient(to left, #FF4383, #FF4383) right top no-repeat,
            linear-gradient(to bottom, #FF4383, #FF4383) right top no-repeat,
            linear-gradient(to left, #FF4383, #FF4383) left bottom no-repeat,
            linear-gradient(to bottom, #FF4383, #FF4383) left bottom no-repeat,
            linear-gradient(to left, #FF4383, #FF4383) right bottom no-repeat,
            linear-gradient(to left, #FF4383, #FF4383) right bottom no-repeat;
            /*设置大小*/
            background-size: 3px 20px, 20px 3px, 3px 20px, 20px 3px;

            /deep/ iframe {
              width: 180px;
              height: 180px;


              .loginPanel  {
                .title {
                  display: none;
                }
                .info {
                  display: none;
                }
                .qrcode {
                  width: 160px;
                  height: 160px;
                  margin-top: 0;
                  margin-left: -6px;
                  border: 0;
                }
              }
            }
          }
        }
        .right-box {
          @include flex_set(1, 0);
          @include flex_layout(column, center, center);

          span {
            margin-top: 20px;
            color: #666666;
            font-style: 14px;
          }
        }
      }
    }
  }

}
</style>
