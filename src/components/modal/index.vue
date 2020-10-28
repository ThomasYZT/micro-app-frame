<template>
  <div ref="modalWrapper"
       :data-vid="vid"
       class="t-modal-wrapper"
       v-show="visible"
       @click.self.stop="statusChange(false)">
    <div v-if="visible" class="t-modal-box">
      <img v-if="outerClose"
           class="t-close-btn outer"
           src="../../assets/img/icon_pop_close_white@2x.png"
           alt=""
           @click="statusChange(false)">
      <img v-else
           class="t-close-btn inset"
           src="../../assets/img/icon_pop_close@2x.png"
           alt=""
           @click="statusChange(false)">
      <div class="t-modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
let vid = 0;
export default {
  name: 'TModal',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    outerClose: {
      typpe: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      vid: vid++,
      existModal: []
    };
  },
  methods: {
    statusChange (status) {
      this.$emit('change', status);
    },
    show () {
      this.cacheStatus();
      this.showMask();
    },
    close () {
      this.closeMask();
      this.$emit('close');
    },
    showMask () {
      const mask = this.createMask();
      const maskZIndex = mask.style.zIndex;
      setTimeout(() => {
        this.$refs.modalWrapper.style.zIndex = Number(maskZIndex) + 1;
        mask.style.backgroundColor = 'rgba(0, 0, 0, .5)';
      }, 0);
    },
    closeMask () {
      const mask = document.getElementsByClassName('t-mask').length > 0
        ? document.getElementsByClassName('t-mask')[0]
        : null;
      if (mask && this.existModal.length === 0) {
        mask.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        mask.remove();
      }
      this.existModal.forEach(item => {
        item.style.display = '';
      });
      this.existModal = [];
    },
    createMask () {
      if (document.getElementsByClassName('t-mask').length === 0) {
        const maxZIndex = this.getMaxZIndex();
        const mask = document.createElement('div');
        mask.setAttribute('class', 't-mask');
        mask.style.zIndex = maxZIndex + 1;
        document.body.appendChild(mask);
        return mask;
      } else {
        return document.getElementsByClassName('t-mask')[0];
      }
    },
    cacheStatus () {
      const modalList = document.getElementsByClassName('t-modal-wrapper');
      this.existModal = Array.from(modalList)
        .filter(item => Number(item.dataset.vid) !== this.vid && item.style.display !== 'none');
      this.existModal.forEach(item => {
        item.style.display = 'none';
      });
    },
    getMaxZIndex () {
      return [...document.body.querySelectorAll('*')].reduce((r, e) => {
        return Math.max(r, +window.getComputedStyle(e).zIndex || 0);
      }, 0);
    }
  },
  watch: {
    visible: {
      handler (newVal) {
        if (newVal) {
          this.show();
        } else {
          this.close();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.t-modal-wrapper {
  @include pos_set(fixed, 0,0,0,0);
  width: 100%;
  height: 100%;
}
.t-modal-box {
  box-sizing: border-box;
  position: relative;
  margin: 25% auto;
  transform: translateY(-50%);
  background: #FFFFFF;
  border-radius: 24Px;
  width: 300Px;
  height: 300Px;

  .t-close-btn {
    z-index: 1000;
    position: absolute;
    height: 24Px;
    cursor: pointer;

    &.inset {
      top: 24Px;
      right: 24Px;
    }
    &.outer {
      top: -48px;
      right: 24px;
    }
  }

  .t-modal-body {
    width: 100%;
    height: 100%;
  }
}
</style>
