<template>
  <div id="app">
    <transition v-if="isRouterAlive" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
      <router-view class="view"></router-view>
    </transition>
    <div id="app-container"></div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { mapGetters } from 'vuex';
export default {
  provide () {
    return {
      reload: this.reload
    };
  },
  computed: {
    ...mapGetters([
      'errMsg'
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
    errMsg: {
      handler(newVal) {
        if (!newVal) {
          this.$msg.error(newVal);
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
#app, #app-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
