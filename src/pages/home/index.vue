<template>
  <div class="page-container">
    <navBar ref="navBar"
            :cur-nav.sync="curNav"
            :bg-color="navBgColor"
            @navClick="navHandler"/>

    <ScrollList ref="List"
                @scroll="onScroll">
      <home id="home" class="hash" />
      <production class="hash"/>
      <about class="hash"/>
      <contact class="hash"/>
    </ScrollList>

    <div v-if="navBgColor === 'transparent'" class="guide-icon">
      <img class="arrow" src="../../assets/img/icon_arrow_up@2x.png" alt="">
      <img class="mouse" src="../../assets/img/icon_mouse@2x.png" alt="">
    </div>
  </div>
</template>

<script>
import navBar from '../../components/navBar';
import ScrollList from '../../components/ScrollList';
import home from './components/home';
import about from './components/about';
import production from './components/production';
import contact from './components/contact';
export default {
  components: {
    navBar,
    ScrollList,
    home,
    about,
    production,
    contact
  },
  data () {
    return {
      navBgColor: 'transparent',
      curNav: '0',
      inControl: false
    };
  },
  methods: {
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
        } else {
          this.curNav !== '3' && (this.curNav = '3');
        }
      } else {
        switch (this.curNav) {
          case "0":
            (e.target.scrollTop === scrollMap[0]) && (this.inControl = false);
            break;
          case "1":
            (e.target.scrollTop === scrollMap[1]) && (this.inControl = false);
            break;
          case "2":
            (e.target.scrollTop === scrollMap[2]) && (this.inControl = false);
            break;
          case "3":
            (e.target.scrollTop === scrollMap[3]) && (this.inControl = false);
            break;
        }
      }
    },
    navHandler (index, fn) {
      this.inControl = true;
      this.$refs.List.scrollTo(index, fn);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$wow('.wow')
    })
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

  &::-webkit-scrollbar {
    z-index: 11;
    width: 0;
  }

  &::-webkit-scrollbar {
    z-index: 11;
    width: 2px;
    &-thumb {
      border-radius: 5px;
      width: 2px;
      background: rgba(0,0,0, .6);
    }
  }


  .guide-icon {
    @include flex_layout(column, center, center);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 600px;
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
