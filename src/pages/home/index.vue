<template>
  <div class="page-container">
    <navBar ref="navBar"
            :cur-nav.sync="curNav"
            :bg-color="navBgColor"
            @titleClick="showLoginByPwdModal"
            @navClick="navHandler"/>

    <ScrollList ref="List"
                @scroll="onScroll">
      <home id="home" class="hash" />
      <production class="hash" />
      <caseDisplay class="hash" />
      <productLink class="hash" />
      <about class="hash"/>
    </ScrollList>

    <div id="homeGuideIcon" v-if="navBgColor === 'transparent'" class="guide-icon" :style="{ top: guideTop }">
      <img class="arrow" src="../../assets/img/icon_arrow_up@2x.png" alt="">
      <img class="mouse" src="../../assets/img/icon_mouse@2x.png" alt="">
    </div>
    <loginByPwdModal ref="loginByPwdModal"></loginByPwdModal>
  </div>
</template>

<script>
import navBar from '../../components/navBar';
import ScrollList from '../../components/ScrollList';
import home from './components/home';
import production from './components/production';
import caseDisplay from './components/caseDisplay';
import about from './components/about';
import productLink from './components/productLink';
import loginByPwdModal from './components/loginByPwdModal';
import {mapActions, mapGetters} from 'vuex';
export default {
  components: {
    navBar,
    ScrollList,
    home,
    about,
    production,
    caseDisplay,
    productLink,
    loginByPwdModal
  },
  data () {
    return {
      navBgColor: 'transparent',
      curNav: '0',
      inControl: false,
      guideTop: '0px'
    };
  },
  computed: {
    ...mapGetters([
      'machineCode'
    ])
  },
  methods: {
    ...mapActions([
      'log'
    ]),
    onScroll (e, scrollMap) {
      if (e.target.scrollTop <= 0) {
        this.navBgColor !== 'transparent' && (this.navBgColor = 'transparent');
      } else {
        this.navBgColor !== '#FFFFFF' && (this.navBgColor = '#FFFFFF');
      }

      if (!this.inControl) {
        if (e.target.scrollTop < scrollMap[1]) {
          this.curNav !== '0' && (this.curNav = '0');
        } else if (e.target.scrollTop < scrollMap[2]) {
          this.curNav !== '1' && (this.curNav = '1');
        } else if (e.target.scrollTop < scrollMap[3]) {
          this.curNav !== '2' && (this.curNav = '2');
        } else if (e.target.scrollTop < scrollMap[4]) {
          this.curNav !== '3' && (this.curNav = '3');
        } else {
          this.curNav !== '4' && (this.curNav = '4');
        }
      } else {
        switch (this.curNav) {
          case '0':
            (e.target.scrollTop === scrollMap[0]) && (this.inControl = false);
            break;
          case '1':
            (e.target.scrollTop === scrollMap[1]) && (this.inControl = false);
            break;
          case '2':
            (e.target.scrollTop === scrollMap[2]) && (this.inControl = false);
            break;
          case '3':
            (e.target.scrollTop === scrollMap[3]) && (this.inControl = false);
            break;
          case '4':
            (e.target.scrollTop === scrollMap[4]) && (this.inControl = false);
            break;
        }
      }
    },
    navHandler (index, fn) {
      this.inControl = true;
      this.$refs.List.scrollTo(index, fn);
    },
    setGuideIconPos () {
      const _el = document.querySelector('#homeGuideIcon');
      if (_el) {
        this.guideTop = `${document.body.clientHeight - _el.offsetHeight - this.$util.realPx(40)}px`;
      }
    },
    showLoginByPwdModal () {
      this.$refs.loginByPwdModal.show();
    },
    /**
     * 访问上报
     */
    visitorsLog () {
      const performance = window.performance || window.msPerformance || window.webkitPerformance;
      const t = performance.timing;
      const navigationStart = t.navigationStart;
      const loadTime = (new Date().getTime() - navigationStart);
      this.log({ name: 'visitors', params: { loadTime: loadTime, mid: this.machineCode } });
    }
  },
  mounted () {
    this.visitorsLog();
    this.$nextTick(() => {
      this.$wow('.wow');
    });
    this.setGuideIconPos();
    window.addEventListener('resize', this.setGuideIconPos);
  },
  destroyed () {
    window.removeEventListener('resize', this.setGuideIconPos);
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/scss/base";
.page-container {
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #FFFFFF;

  .guide-icon {
    @include flex_layout(column, center, center);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .arrow {
      margin-bottom: 5px;
      height: 15px;
      animation: smallBottomToTop 1s linear infinite alternate;
    }

    .mouse {
      height: 38px;
    }
  }

}

</style>
