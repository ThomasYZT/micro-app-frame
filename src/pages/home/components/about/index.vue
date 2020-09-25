<template>
  <div class="about">
    <div class="block-wrapper introduce">
      <div class="block-content">
        <div class="card-wrapper wow">
          <t-card title="关于我们"
                  sub-title="About Us"
                  type="title" />
        </div>

        <div class="content wow"  data-animate="fadeInUp">
          <p class="para">票圈视频是一个基于移动互联网打造的集生活记录，创作表达，视频制作，AI处理，分享互动等多种强大功能的全品类、全能型视频记录，创作及表达平台。</p>
          <p class="para">4大核心产品：PC版票圈视频，票圈视频APP，票圈视频小程序，票圈Vlog小程序相辅相成，构建票圈视频矩阵。历时两年，高居阿拉丁视频榜单Top3，累计4亿+平台用户，服务上百万内容创作生产者，创造百万收益。</p>
          <p class="para">我们以视频为核心，为用户提供智能AI功能，视频制作、上传、处理、展示、个性分发、互动、变现等服务，助力工具运用，内容沉淀、分发、传播，粉丝获取，以及关系沉淀。</p>
          <p class="para">我们相信人人皆是UP主，票圈视频旨在为大家打造一个展现自我，创造财富，实现价值，赋能生活，扩大品牌势能，构建完整生态的视频平台。</p>
          <p class="para">我们的愿景：成为一家引领全球表达方式的公司。<br> 我们的使命：激发创造，丰富表达。<br>我们的Slogan：用视频发声。</p>
        </div>
      </div>
    </div>

    <div class="block-wrapper history">
      <div class="block-header wow"  data-animate="fadeInUp">
        <div class="card-wrapper">
          <t-card title="发展历史"
                  sub-title="Development History"
                  type="title" />
        </div>
      </div>
      <div class="block-content">

        <div class="time-wrapper wow"  data-animate="fadeInUp">
          <timeline v-model="activeName">
            <timeline-item label="2020" time="2020">
              <div class="time-item">
                <div class="time">9月</div>
                <div class="desc">票圈视频PC端在线视频制作工具上线，重新定义视频制作剪辑。</div>
              </div>
              <div class="time-item">
                <div class="time">3月</div>
                <div class="desc">票圈视频APP上线，小程序累计用户超4亿，视频生态圈更完善。</div>
              </div>
            </timeline-item>
            <timeline-item label="2019" time="2019">
              <div class="time-item">
                <div class="time">12月</div>
                <div class="desc">平台广告模式引入，首创平台视频UP主获取流量收益模式。</div>
              </div>
              <div class="time-item">
                <div class="time">7月</div>
                <div class="desc">平台自有个性化算法上线，小程序DAU突破500万。</div>
              </div>
              <div class="time-item">
                <div class="time">2月</div>
                <div class="desc">推出内容付费功能，平台用户获益 ，收益超200万。</div>
              </div>
            </timeline-item>
            <timeline-item label="2018" time="2018">
              <div class="time-item">
                <div class="time">11月</div>
                <div class="desc">票圈由视频工具转型为内容平台，DAU100万+。</div>
              </div>
              <div class="time-item">
                <div class="time">7月</div>
                <div class="desc">票圈视频工具以高清、免广告视频赋能公众号运营机构，DAU首破20万。</div>
              </div>
              <div class="time-item">
                <div class="time">5月</div>
                <div class="desc">票圈长视频小程序正式上线，致力于视频表达传播。</div>
              </div>
            </timeline-item>
          </timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timeline from '../../../../components/timeline';
import timelineItem from '../../../../components/timeline/timelineItem';
export default {
  components : {
    timeline,
    timelineItem
  },
  data () {
    return {
      activeName: '2020'
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.about {
  padding: 120px 0 40px;
  background-image: url("../../../../assets/img/pic_five_bj.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;
  .introduce {
    margin-bottom: 40px;
    .block-content {
      @include flex_layout(row, space-between, flex-start);
      .card-wrapper {
        flex: 1 0 30%;
      }
      .content {
        flex: 1 0 70%;
        padding-left: 49px;
        border-left: 1px solid #EAEAEA;

        .para {
          margin-bottom: 24px;
          font-size: 14px;
          color: #333333;
          text-align: left;
          line-height: 32px;

          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }

  .history {
    .block-content {
      .time-wrapper {
        width: 100%;
        .time-item {
          margin: 30px 0;
          .time {
            margin-bottom: 8px;
            font-size: 22px;
            font-weight: bold;
            color: #333333;
          }

          .desc {
            font-size: 14px;
            color: #333333;
          }

          &:last-child {
            margin: 0;
          }

          &:first-child {
            margin: 0;
          }
        }
      }
    }


  }

}
</style>
