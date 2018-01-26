<template>
  <div class="navigation" @mouseover="hideHover">
    <div class="big-show" :class="{'big-hide': showAnimation}" v-show="isBig">
      <div class="herder">
        <span class="icon"></span>
        {{title}}
      </div>
      <ul class="nav-big">
        <li class="nav-item"
            :class="{'nav-tap-active':bigChild === index,'nav-item-no-border':item.children.length > 1}"
            v-for="(item , index) in navList" :key="index"
            @click="showChild(index)" :style="{'height':item.showHeight+'px'}">
          <a href="javaScript:;" class="nav-tap">
            <span class="nav-icon"><img :src="item.icon" class="nav-pic"></span>
            <div class="nav-title" v-show="!showAnimation">
            <span v-for="(items , index) in item.title" :key="index">{{items}}
            </span>
            </div>
            <i class="nav" v-show="!showAnimation"></i>
          </a>
          <ul class="nav-big-child" v-if="item.children"
              v-show="item.children.length > 1">
            <li class="nav-item" v-for="(items , idx) in item.children"
                :class="clickChild === idx ? 'nav-big-active' : ''"
                :key="idx" @click.stop="bigChildren(idx)">
              <a href="javaScript:;" class="nav-tap">
                <span class="nav-icon"><img src=""></span>
                <div class="nav-title">
                 <span v-for="(child , index) in items.title" :key="index">{{
                   child}}
            </span>
                </div>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="small-show" v-show="!isBig"
         :class="{'small-hide': !showAnimation}">
      <div class="herder">
        <span class="icon"></span>
      </div>
      <ul class="nav-small" @mouseover.stop>
        <li class="nav-item"
            :class=" index === hoverIndex ? 'nav-small-active' : '' "
            v-for="(item ,  index) in navList" :key="index"
            @mouseover="hoverChild(index)">
          <a href="javaScript:;" class="nav-tap">
            <span class="nav-icon"><img :src="item.icon" class="nav-pic"></span>
          </a>
          <ul class="nav-small-child" v-if="item.children"
              v-show="index === hoverIndex">
            <li class="nav-item" v-for="(items , idx) in item.children"
                :class="hoverChildIndex === idx ? 'nav-item-active' : ''"
                :key="idx" @click.stop="hoverDetail(idx,index)">
              <a href="javaScript:;" class="nav-tap">
                <div class="small-title">{{items.title}}</div>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const navList = [
  {
    title: '首页',
    url: 'javaScript:;',
    icon: require('./icon-home@2x.png'),
    children: [{
      title: '首页',
      url: 'javaScript:;'
    }],
    showHeight: 70
  }, {
    title: '数据概况',
    url: 'javaScript:;',
    icon: require('./icon-data@2x.png'),
    children: [{
      title: '数据概况',
      url: 'javaScript:;'
    }],
    showHeight: 70
  }, {
    title: '商家管理',
    url: 'javaScript:;',
    icon: require('./icon-shop@2x.png'),
    children: [{
      title: '商家列表',
      url: 'javaScript:;'
    }, {
      title: '商家概况',
      url: 'javaScript:;'
    }],
    showHeight: 70
  }, {
    title: '客户管理',
    icon: require('./icon-guest@2x.png'),
    url: 'javaScript:;',
    children: [{
      title: '客户管理',
      url: 'javaScript:;'
    }],
    showHeight: 70
  }, {
    title: '订单管理',
    icon: require('./icon-indent@2x.png'),
    url: 'javaScript:;',
    children: [{
      title: '订单管理',
      url: 'javaScript:;'
    }],
    showHeight: 70
  }, {
    title: '账户管理',
    icon: require('./icon-account@2x.png'),
    url: 'javaScript:;',
    children: [{
      title: '账户管理',
      url: 'javaScript:;'
    }],
    showHeight: 70
  }]
export default {
  data() {
    return {
      title: '赞播管理后台',
      navList: navList,
      hoverIndex: -1,
      hoverChildIndex: 0,
      isBig: true,
      bigChild: 1,
      showHeight: 70,
      timer: null,
      clickChild: 0,
      recodIndex: -1,
      showAnimation: false
    }
  },
  methods: {
    showChild(index) {
      clearInterval(this.timer)
      if (this.navList[index].children.length === 1) {
        this.timer = setInterval(() => {
          if (this.navList[this.recodIndex].showHeight <= 70) {
            this.navList[this.recodIndex].showHeight = 70
            clearInterval(this.timer)
            return false
          }
          this.navList[this.recodIndex].showHeight -= 20
        }, 30)
        this.bigChild = index
      } else if (this.navList[index].children.length > 1) {
        this.bigChild = -1
        this.recodIndex = index
        let num = this.navList[index].children.length
        if (this.navList[index].showHeight === 70) {
          let target = (num + 1) * 70
          this.timer = setInterval(() => {
            if (this.navList[index].showHeight >= target) {
              this.navList[index].showHeight = target
              clearInterval(this.timer)
              return false
            }
            this.navList[index].showHeight += 20
          }, 30)
        } else {
          this.timer = setInterval(() => {
            if (this.navList[index].showHeight <= 70) {
              this.navList[index].showHeight = 70
              clearInterval(this.timer)
              return false
            }
            this.navList[index].showHeight -= 20
          }, 30)
        }
      }
    },
    bigChildren(index) {
      this.clickChild = index
    },
    hoverChild(index) {
      this.hoverIndex = index
    },
    hideHover() {
      this.hoverIndex = -1
    },
    hoverDetail(index, parent) {
      this.hoverIndex = parent
      this.hoverChildIndex = index
    },
    isShowBig() {
      this.showAnimation = !this.showAnimation
      this.title = '' || '赞播管理后台'
      setTimeout(() => {
        this.isBig = !this.isBig
      }, 300)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .navigation
    background: $color-menu-background
    color: $color-white
    min-height: 717px
    height :100vh
    overflow-y ：scroll
    .big-show
      width: 314px
      .herder
        padding-left: 83px
        height: 80px
        overflow: hidden
        line-height: 80px
        font-size: 30px
        background: $color-menu-select
        position: relative
        .icon
          col-center()
          bg-image('pic-logo_menu')
          background-size: cover
          height: 39px
          width: 36px
          left: 37px
          transform: translateY(-55%)
      .nav-big
        .nav-item
          background : $color-menu-background
          border-left: 8px solid $color-menu-background
          overflow-y: hidden
          border-bottom: 1px solid #3B3B43
          .nav-tap
            align-items: center
            color: $color-white
            display: flex
            height: 70px
            width: 100%
            position: relative
            .nav-icon
              height: 100%
              width: 87px
              position: relative
              .nav-pic
                height: 22px
                col-center()
                left: 37px
            .nav-title
              width: 64px
              display: flex
              font-family: 'PingFangSC-Light'
              font-size: $font-size-medium-x
              justify-content: space-between
            .nav
              position: absolute
              height: 18px
              width: 18px
              right: 23px
              bg-image('icon-pressed')
              background-size: cover
        .nav-tap-active
          background: $color-menu-select
          border-left: 8px solid $color-nomal
        .nav-item-no-border
          border-left: 8px solid $color-menu-background
        .nav-big-child
          .nav-title
            margin-left: 20px
          .nav-big-active
            background: $color-menu-select
            border-left: 8px solid $color-nomal
    .big-hide
      width: 99px
      transition: all .3s

    .small-show
      width: 99px
      .herder
        height: 80px
        background: $color-menu-select
        position: relative
        .icon
          bg-image('pic-logo_menu')
          background-size: cover
          height: 39px
          width: 36px
          col-center()
          left: 31.5px
      .nav-small
        .nav-item
          height: 68px
          border-bottom: 1px solid #3B3B43
          position: relative
          border-left: 8px solid $color-menu-background
          .nav-tap
            display: block
            height: 100%
            width: 100%
            color: $color-white
            line-height: 46px
          .nav-pic
            height: 20px
            col-center()
            left: 31.5px
          .nav-small-child
            position: absolute
            right: -177px
            top: 5px
            padding: 10px 0
            background: $color-menu-background
            border-radius: 4px
            z-index :300
            .nav-item
              height: 46px
              border: none
              .nav-tap
                font-size: $font-size-large-s
                padding: 0 70px 0 20px
                .small-title
                  min-width: 84px
            .nav-item-active
              background: $color-menu-select
        .nav-small-active
          background: $color-menu-select
          border-left: 8px solid $color-nomal
    .small-hide
      width: 314px
      transition: all .3s

</style>
