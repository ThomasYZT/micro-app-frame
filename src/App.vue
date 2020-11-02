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
        if (newVal.status === true) {
          this.$refs.loginModal.show(newVal.name);
        }
      },
      deep: true
    }
  }
};

const HTTP_ENV = process.env.HTTP_ENV;
if (HTTP_ENV === 'prod') {
  var _mtac = {"senseQuery":1};
  (function() {
    var mta = document.createElement("script");
    mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500730622");
    mta.setAttribute("cid", "500730623");
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mta, s);
  })();
}
</script>

<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
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
