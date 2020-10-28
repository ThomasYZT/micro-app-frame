<template>
  <div class="case">
    <div class="block-wrapper">
      <div class="block-header align-center">
        <t-card title="优秀案例"
                sub-title="Excellent Case"
                type="title"
                align="center" />
      </div>
      <div class="block-content">
        <div class="card-wrapper">
          <image-card v-for="(item, index) in caseList"
                      :key="index"
                      :img="item.videoCover"
                      :text="item.desc"
                      @click="cardClick(index)">
            <div slot="cover" class="cover">
              <img src="../../../../assets/img/icon_paly@2x.png" alt="">
            </div>
            <div slot="text-footer" class="text-footer">
              <div class="tag">{{item.tag}}</div>
              <div class="username">—— {{item.userName}}</div>
            </div>
          </image-card>
        </div>
      </div>
      <t-button :icon="{ pos: 'suffix', src: imgSrc.icon1 }" class="primary case-btn" @click="goClip">开始我的创作</t-button>
    </div>

    <caseModal ref="caseModal" :videoList="caseList"></caseModal>
  </div>
</template>

<script>
import icon1 from '../../../../assets/img/icon_arrow.png';
import ImageCard from '../../../../components/ImageCard';
import { mapActions } from 'vuex';
import caseModal from '../caseModal';
export default {
  components: {
    ImageCard,
    caseModal
  },
  data () {
    return {
      imgSrc: {
        icon1
      },
      caseList: [
        {
          videoCover: 'https://rescdn.yishihui.com/longvideo/pic/vpc/20200917/451aSR1S0HQMh1DTrwOk?x-oss-process=image/rotate,0/resize,h_720/resize,m_fill,w_1280,h_720,limit_0/format,jpg',
          src: 'https://rescdn.yishihui.com/longvideo/transcode/clip/video/33f6e6b11cd64baa8a1c55f5f5d478a0.mp4',
          title: '文章生成视频：无需视频剪辑基础，1分钟创作精美视频。',
          tag: '文章生成视频',
          clipAddr: 'https://www.piaoquantv.com/clip/?draftboxId=20201024174128425382282&projectId=20201024174232046876055',
          userName: '朝花夕拾',
          desc: `我在朋友圈看到篇美文，把文字复制过来后会<span class="em-text">自动匹配图片并生成配音，制作很简单，</span>比看纯文字的内容精彩多了。视频播放量竟然超过20多万！`
        },
        {
          videoCover: 'https://rescdn.yishihui.com/longvideo/clip/snapshot/b9fb532786374da19c805486bee86f4b_8?x-oss-process=image/rotate,0/resize,h_720/resize,m_fill,w_1280,h_720,limit_0/format,jpg',
          src: 'https://rescdn.yishihui.com/longvideo/transcode/clip/video/b9fb532786374da19c805486bee86f4b.mp4',
          title: '视频加讲解： 智能真人配音，让拍摄的视频更有故事性',
          tag: '视频加讲解',
          clipAddr: 'https://www.piaoquantv.com/clip/?projectId=20201024174351814446511&draftboxId=20201024174316649336087&userInfo=null&t=1603532594765',
          userName: '时间の俘虏',
          desc: `我是个航拍爱好者，喜欢讲解风景视频。之前会花很多时间在配音上，现在<span class="em-text">文字可以自动生成语音，而且声音很好听、不生硬。</span>`
        },
        {
          videoCover: 'https://rescdn.yishihui.com/longvideo/clip/snapshot/c4fd9d330c4c4966adcc144690e65224_0?x-oss-process=image/rotate,0/resize,h_720/resize,m_fill,w_1280,h_720,limit_0/format,jpg',
          src: 'https://rescdn.yishihui.com/longvideo/transcode/clip/video/c4fd9d330c4c4966adcc144690e65224.mp4',
          title: '极速剪辑：海量图片/视频素材智能匹配，再无找素材的烦恼',
          tag: '极速剪辑',
          clipAddr: 'https://www.piaoquantv.com/clip/?projectId=20201024174512384783893&draftboxId=20201024174507175124056&userInfo=null&t=1603532705277',
          userName: 'L',
          desc: `我发现这款工具真的很强大，只需输入想要的主题，工具会根据主题<span class="em-text">自动匹配视频片段，大量节省了我寻找素材的时间！</span>`
        }
      ]
    };
  },
  methods: {
    ...mapActions([
      'showLoginModal'
    ]),
    cardClick (index) {
      this.$refs.caseModal.show(index);
    },
    goClip () {
      this.showLoginModal();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.case {
  padding: 80px 0;

  .card-wrapper {
    @include flex_layout(row, center, center);

    .cover {
      @include flex_layout(row, center, center);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      img {
        width: 50px;
        height: 50px;
      }
    }

    /deep/ .t-img-card {
      margin-right: 20px;
      &.last-child {
        margin-right: 0;
      }
    }
  }
  /deep/ .em-text {
    color: #FF4383;
    font-weight: bold;
  }

  .text-footer {
    @include flex_layout(row, space-between, center);
    position: absolute;
    padding: 0 20px;
    width: calc(100% - 40px);
    bottom: 20px;
    left: 0;
    margin-top: 13px;

    .tag {
      padding: 6px 12px;
      font-size: 14px;
      background: #F0F7FF;
      border-radius: 8px;
    }

    .username {
      font-size: 14px;
    }
  }

  .case-btn {
    margin-top: 40px;
  }
}
</style>
