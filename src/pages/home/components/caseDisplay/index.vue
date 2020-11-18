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
          videoCover: 'https://rescdn.yishihui.com/longvideo/pic/vpc/20201111/15706400f1x2gvQ16N9rvAuR4i?x-oss-process=image/rotate,0/resize,h_720/resize,m_fill,w_1280,h_720,limit_0/format,jpg',
          src: 'https://rescdn.yishihui.com/longvideo/transcode/clip/video/e5294419526e47079cdf60d09868ae1c.mp4',
          title: '真人对话配音：体验多角色对话的快乐，带你开启声音新世界~',
          tag: '真人对话配音',
          clipAddr: 'https://www.piaoquantv.com/clip/?draftboxId=20201117103305848281589&projectId=20201117103401702928644',
          userName: '颍川东逝',
          desc: `我是小白配音玩家，以前做配音反反复复得花费半天时间，而这款软件，<span class="em-text">不用匹配音轨，10分钟搞定5分钟的多人配音长视频！</span>真的爱了！`
        },
        {
          videoCover: 'https://rescdn.yishihui.com/longvideo/pic/e82fa588dc4e4d3bb833b2b39bec97a21605584516298?x-oss-process=image/rotate,0/resize,h_720/resize,m_fill,w_1280,h_720,limit_0/format,jpg',
          src: 'https://rescdn.yishihui.com/longvideo/transcode/clip/video/9d9cf89dc16b4d43930fe9468e24983b.mp4',
          title: '图文转视频：无需视频剪辑基础，创作视频原来这么简单！',
          tag: '图文转视频',
          clipAddr: 'https://www.piaoquantv.com/clip/?projectId=20201117103547222478679&draftboxId=20201116174006673569880&userInfo=null&t=1605580385083',
          userName: '晴朗',
          desc: `我是视频爱好者晴朗，我制作的退休人视频，<span class="em-text">输入文字，自动推荐图片、视频素材，还能一键智能配音！</span>现在已经20多万的播放了，大家都爱看！`
        },
        {
          videoCover: 'https://rescdn.yishihui.com/longvideo/clip/snapshot/c9066c3ac40246289cf73e8f418441be_8?x-oss-process=image/rotate,0/resize,h_720/resize,m_fill,w_1280,h_720,limit_0/format,jpg',
          src: 'https://rescdn.yishihui.com/longvideo/transcode/clip/video/c9066c3ac40246289cf73e8f418441be.mp4',
          title: '视频加讲解：加上讲解和背景音乐，普通航拍秒变大型纪录片！',
          tag: '视频加讲解',
          clipAddr: 'https://www.piaoquantv.com/clip/?draftboxId=20201116174033611519873&projectId=20201117103504214139812',
          userName: '时间の俘虏',
          desc: `我是一个航拍作者，以前视频都是直接加个音乐，现在<span class="em-text">视频加上讲解配音</span>，瞬间有种”航拍中国“纪录片的感觉。`
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
