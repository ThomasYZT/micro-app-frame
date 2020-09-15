<template>
  <div id="app">
    <transition v-if="isRouterAlive" name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
export default {
  provide () {
    return {
      reload: this.reload
    };
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
