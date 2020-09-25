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
      navBgColor: 'none',
      curNav: '0'
    };
  },
  methods: {
    onScroll (e, scrollMap) {
      if (e.target.scrollTop <= 0) {
        this.navBgColor !== 'transparent' && (this.navBgColor = 'transparent');
      } else {
        this.navBgColor !== '#FFFFFF' && (this.navBgColor = '#FFFFFF');
      }

      if (e.target.scrollTop < scrollMap[1]) {
        this.curNav !== '0' && (this.curNav = '0');
      } else if (e.target.scrollTop < scrollMap[2]) {
        this.curNav !== '1' && (this.curNav = '1');
      } else if (e.target.scrollTop < scrollMap[3]) {
        this.curNav !== '2' && (this.curNav = '2');
      } else {
        this.curNav !== '3' && (this.curNav = '3');
      }
    },
    navHandler (index, fn) {
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

}


</style>
