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
               :src="src"></video>
      </div>
    </t-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      src: ''
    };
  },
  methods: {
    show (src) {
      this.src = src;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.video.play();
      });
    },
    hide () {
      this.src = '';
      this.visible = false;
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
