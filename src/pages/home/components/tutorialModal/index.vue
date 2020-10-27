<template>
  <div class="modal-wrapper">
    <t-modal v-model="visible"
             :outerClose="true"
             @close="hide">
      <!-- 内容 -->
      <div class="box">
        <video v-if="visible"
               ref="video"
               id="video"
               controls="controls"
               preload="auto"
               src="https://weapppiccdn.yishihui.com/resources/videos/introduce.mp4"></video>
      </div>
    </t-modal>
  </div>
</template>

<script>
import MD5 from 'crypto-js/md5';
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      visible: false,
      formData: {
        uid: '',
        pwd: ''
      }
    };
  },
  methods: {
    ...mapMutations([
      'UPDATE_USERINFO'
    ]),
    show () {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.video.play();
      });
    },
    hide () {
      this.visible = false;
    },
    formValidate () {
      if (!this.formData.pwd || !this.formData.uid) {
        this.$msg.error('请输入完整信息');
        return;
      }
      this.pwdLogin();
    },
    pwdLogin () {
      this.$ajax.post({
        apiKey: 'wxLoginByPwd',
        params: {
          uid: this.formData.uid,
          pwd: MD5(this.formData.pwd).toString()
        }
      }).then(res => {
        if (res.code === 0) {
          this.hide();
          this.UPDATE_USERINFO(res.data);
          this.$nextTick(() => {
            this.$router.push('/upload');
          });
        } else {
          this.$msg.error('登录失败');
        }
      }).catch(() => {
        this.$msg.error('登录失败');
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.modal-wrapper {
  /deep/ .t-modal-box {
    width: 744px;
    height: 418px;
  }
  .box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    #video {
      width: 100%;
      height: 100%;
      border-radius: 24Px;
      outline: none;
      object-fit: fill
    }
  }
}
</style>
