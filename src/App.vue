<template>
  <div id="app">
    <transition v-if="isRouterAlive" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
      <router-view class="tzld-view"></router-view>
    </transition>
    <loginModal ref="loginModal"></loginModal>
    <div id="app-container"></div>
  </div>
</template>

<script>
import loginModal from './components/loginModal';
import debounce from 'lodash/debounce';
import { mapGetters } from 'vuex';
export default {
  components: {
    loginModal
  },
  provide () {
    return {
      reload: this.reload
    };
  },
  computed: {
    ...mapGetters([
      'loginModalStatus'
    ])
  },
  data () {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload: debounce(function () {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      }, 500);
    })
  },
  watch: {
    loginModalStatus: {
      handler (newVal) {
        if (newVal) {
          this.$refs.loginModal.show();
        }
      }
    }
  }
};
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .tzld-view {
    font-family: ArialMT, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Roboto, Arial, Hiragino Sans GB, Microsoft Yahei, Microsoft Jhenghei, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
}
#app-container {
  width: 100%;
  height: 100%;
}
</style>
