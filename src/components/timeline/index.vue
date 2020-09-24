<template>
  <div v-slide id="Timeline" class="time-line">
    <slot></slot>
  </div>
</template>

<script>
import flagImg from './img/pic_five_plane_red@2x.png';
import debounce from 'lodash/debounce';
export default {
  name: "Timeline",
  provide () {
    return {
      itemClick: this.itemClick,
      activeItem: this.activeItem
    }
  },
  props: {
    value: {
      type : String,
      default : ''
    }
  },
  data () {
    return {
      activeItem: {
        value: this.value
      }
    }
  },
  directives: {
    slide : (() => {
      let _parent = null;
      let _flag = null;
      let _flagH = 0;
      let _curLabel = '';
      let _yAxisMap = {};

      const reset = debounce(() => {
        _flag.remove();
        _flagH = 0;
        _yAxisMap = {};
        init(_parent)
      }, 1000);

      function init (el) {
        _parent = el;

        let _child = _parent.children
        _child.forEach(item => {
          _yAxisMap[item.dataset.label] = {
            height: item.offsetHeight,
            yAxis: Object.values(_yAxisMap).reduce((s, n) => s + n.height, 0) + item.offsetHeight
          };
        });

        _flag = document.createElement('img');
        _flag.src = flagImg;
        _flag.setAttribute('class', 'active-flag');
        _parent.appendChild(_flag);
        _flagH = _flag.offsetHeight;
        _flag.style.transform = `translateY(${_yAxisMap[_curLabel].yAxis - _flagH}px)`;


        window.addEventListener('resize', reset);
      }
      return {
        inserted : function (el, binding, vnode) {
          _curLabel = vnode.context.value;
          init(el)
        },
        update : function (el, binding, vnode) {
          _curLabel = vnode.context.value;
          _flag.style.transform = `translateY(${_yAxisMap[_curLabel].yAxis - _flagH}px)`;
        },
        unbind: function () {
          reset();
          window.removeEventListener('resize', reset);
        }
      }
    })()
  },
  methods : {
    itemClick (e, label, isInit) {
      if (isInit) {

      } else {
        this.$emit('input', label)
      }
      this.activeItem.value = label;
    },
  }
}
</script>

<style scoped lang="scss">
.time-line {
  position: relative;
  width: 100%;

  /deep/ .active-flag {
    margin-left: 30%;
    position: absolute;
    left: -17px;
    top: 0;
    width: 34px;
    height: 37px;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
  }
}
</style>
