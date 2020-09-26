<template>
  <div class="contact">
    <div class="bg">
      <img src="../../../../assets/img/pic_six_bj.jpg" alt="">
      <div class="mask"></div>
    </div>

    <div class="block-wrapper">
      <div class="block-content">
        <div class="addr wow"  data-animate="fadeInUp">
          <t-card title="联系我们"
                  sub-title="Contact Us"
                  type="title" />
          <div id="map-container"></div>
        </div>
        <div class="desc wow"  data-animate="fadeInUp">
          <div class="info-row">
            <div class="info-item">
              <img v-lazy="imgSrc.icon1" src="" alt="">
              电话：0731 - 85679198
            </div>
            <div class="info-item">
              <img v-lazy="imgSrc.icon2" src="" alt="">
              手机：18974809627
            </div>
          </div>
          <div class="info-row">
            <div class="info-item">
              <img v-lazy="imgSrc.icon3" src="" alt="">
              地址：北京市海淀区西北旺东路10号院东区4号楼2层222室
            </div>
          </div>
          <div class="info-row">
            <div class="code-box">
              <img src="../../../../assets/img/pic_six_service@2x.png" alt="">
              <span>客服微信</span>
            </div>
            <div class="code-box">
              <img src="../../../../assets/img/pic_six_vlog@2x.png" alt="">
              <span>票圈Vlog精选公众号</span>
            </div>
            <div class="code-box">
              <img src="../../../../assets/img/pic_six_jsb@2x.png" alt="">
              <span>票圈极速版公众号</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="copryright-block">
      <p>© 2020 湖南为趣时代网络科技有限公司</p>
      <p>| 用户服务协议 | 隐私政策 | 帮助中心 | 客服及举报: 0731-85679198  |  举报邮箱：dengfeng@piaoquantv.com</p>
      <p>网络文化经营许可证：湘网文（2019）4171-013号 | 广播电视节目制作经营许可证：（湘）字第000349号 | ICP备案：湘B2-20180063</p>
    </div>
  </div>
</template>

<script>
import icon1 from '../../../../assets/img/icon_call.png';
import icon2 from '../../../../assets/img/icon_phone.png';
import icon3 from '../../../../assets/img/icon_add.png';
import AMap from  'AMap'
export default {
  data () {
    return {
      imgSrc : {
        icon1,
        icon2,
        icon3
      }
    }
  },
  mounted() {
    var map = new AMap.Map('map-container', {
      dragEnable: false,
      doubleClickZoom: false,
      scrollWheel: false,
      zoom: 17,
      center: [116.27912, 40.04972] //设置地图中心点坐标
    });
    map.on('click', function(e) {
      console.log(e)
    });
    let marker = new AMap.Marker({
      position: [116.279749, 40.04968]
    });
    map.add(marker);
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.contact {
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
      @include flex_layout(row, space-between, flex-end);

      /deep/ .title-card {
        .title {
          color: #FFFFFF;
        }

        .sub-title {
          color: rgba(255, 255, 255, .5);
        }
      }
      #map-container {
        width: 411px;
        height: 236px;
      }

      .desc {
        .info-row {
          color: #FFFFFF;
          @include flex_layout(row, space-between, center);

          &:last-child {
            margin-top: 17px;
          }
          .info-item {
            @include flex_layout(row, center, center);
            margin-bottom: 26px;
            font-size: 14px;

            img {
              margin-right: 8px;
            }
          }
          .code-box {
            margin: 0 15px;
            @include flex_layout(column, center, center);

            &:first-child {
              margin-left: 0;
            }
            &:last-child {
              margin-right: 0;
            }

            img {
              margin-bottom: 12px;
              width: 110px;
              height: 110px;
            }

            span {
              font-size: 14px;
              color: #FFFFFF;
            }
          }
        }
      }

    }
  }

  .copryright-block {
    padding-bottom: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    p {
      white-space: nowrap;
      font-size: 14px;
      color: #FFFFFF;
    }
  }
}
/deep/ .amap-logo, /deep/ .amap-copyright {
  display: none !important;
}
</style>
