<template>
  <div class="navigation" @mouseover="hideHover">
    <div class="big-show" :class="{'big-hide': showAnimation}" v-show="isBig">
      <div class="herder">
        <span class="icon"></span>
        {{title}}
      </div>
      <ul class="nav-big">
        <li class="nav-item" v-for="(item , index) in navList" :key="index"
            @click="showChild(index)" :style="{'height':item.showHeight+'px'}">
          <a :href="item.url" class="nav-tap" :class="{'nav-tap-active':bigChild === index,'nav-item-no-border':item.children.length > 1}">
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
                :key="idx" @click.stop="bigChildren(idx)">
              <a :href="items.url" class="nav-tap" :class="item.childrenIndex === idx ? 'nav-big-active' : ''">
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
        <li class="nav-item" :class=" index === smallIndex ? 'nav-small-active' : '' "
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
              <a :href="items.url" class="nav-tap">
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
const height = 60
const navList = [
  {
    title: '首页',
    url: 'javaScript:;',
    icon: require('./icon-home@2x.png'),
    childrenIndex: -1,
    children: [{
      title: '首页',
      url: 'javaScript:;'
    }],
    showHeight: height
  }, {
    title: '数据概况',
    url: '#/container/data',
    icon: require('./icon-data@2x.png'),
    childrenIndex: -1,
    children: [{
      title: '数据概况',
      url: '#/container/data'
    }],
    showHeight: height
  }, {
    title: '商家管理',
    url: '#/container/businessList',
    icon: require('./icon-shop@2x.png'),
    childrenIndex: -1,
    children: [{
      title: '商家列表',
      url: '#/container/businessList'
    }, {
      title: '商圈概况',
      url: '#/container/businessGeneral'
    }],
    showHeight: height
  }, {
    title: '客户管理',
    icon: require('./icon-guest@2x.png'),
    url: '#/container/client',
    childrenIndex: -1,
    children: [{
      title: '客户管理',
      url: '#/container/client'
    }],
    showHeight: height
  }, {
    title: '订单管理',
    icon: require('./icon-indent@2x.png'),
    url: '#/container/order',
    childrenIndex: -1,
    children: [{
      title: '订单管理',
      url: '#/container/order'
    }],
    showHeight: height
  }, {
    title: '账户管理',
    icon: require('./icon-account@2x.png'),
    url: '#/container/account',
    children: [{
      title: '账户管理',
      url: '#/container/account'
    }],
    showHeight: height
  }]
export default {
  data() {
    return {
      smallIndex: 0,
      title: '赞播管理后台',
      navList: navList,
      hoverIndex: -1,
      hoverChildIndex: 0,
      isBig: true,
      bigChild: 1,
      showHeight: height,
      timer: null,
      clickChild: 0,
      recodIndex: 2,
      showAnimation: false
    }
  },
  created() {
    let rootType = (location.hash.slice(2)).split('/')
    let type = rootType[rootType.length - 1]
    this.navList.forEach((item, idx) => {
      if (item.children.length > 1) {
        item.children.forEach((items, index) => {
          if (items.url.includes(type)) {
            this.showChild(idx)
            this.bigChildren(index)
          }
        })
        return false
      }
      if (item.url.includes(type)) {
        this.showChild(idx)
        return false
      }
    })
  },
  methods: {
    showChild(index, status = true) {
      this.smallIndex = index
      clearInterval(this.timer)
      if (this.navList[index].children.length === 1) {
        this.timer = setInterval(() => {
          if (this.navList[this.recodIndex].showHeight <= height) {
            this.navList[this.recodIndex].showHeight = height
            clearInterval(this.timer)
            return false
          }
          this.navList[this.recodIndex].showHeight -= 20
        }, 30)
        this.bigChild = index
        sessionStorage.setItem('title', [this.navList[index].title])
      } else if (this.navList[index].children.length > 1) {
        let childCode = this.navList[index].childrenIndex === -1 ? 0 : this.navList[index].childrenIndex
        this.navList[this.recodIndex].childrenIndex = childCode
        sessionStorage.setItem('title', [this.navList[index].title, this.navList[index].children[childCode].title])
        this.bigChild = -1
        this.recodIndex = index
        let num = this.navList[index].children.length
        if (this.navList[index].showHeight === height) {
          let target = (num + 1) * height
          this.timer = setInterval(() => {
            if (this.navList[index].showHeight >= target) {
              this.navList[index].showHeight = target
              clearInterval(this.timer)
              return false
            }
            this.navList[index].showHeight += 20
          }, 30)
        } else {
          if (status) {
            this.timer = setInterval(() => {
              if (this.navList[index].showHeight <= height) {
                this.navList[index].showHeight = height
                clearInterval(this.timer)
                return false
              }
              this.navList[index].showHeight -= 20
            }, 30)
          }
        }
      }
    },
    bigChildren(index) {
      this.navList[this.recodIndex].childrenIndex = index
      let num = this.recodIndex
      this.navList[num].url = this.navList[num].children[this.navList[num].childrenIndex].url
      let arr = [this.navList[this.recodIndex].title, this.navList[this.recodIndex].children[index].title]
      sessionStorage.setItem('title', arr)
    },
    hoverChild(index) {
      this.hoverIndex = index
      this.hoverChildIndex = this.navList[index].childrenIndex
    },
    hideHover() {
      this.hoverIndex = -1
    },
    hoverDetail(index, parent) {
      this.smallIndex = parent
      this.hoverChildIndex = index
      this.hoverIndex = parent
      this.navList[parent].childrenIndex = index
      this.navList.forEach((item, idx) => {
        if (idx !== parent) {
          item.childrenIndex = -1
        }
      })
      if (this.navList[parent].children.length > 1) {
        this.showChild(parent, false)
        this.navList[parent].childrenIndex = index
        return false
      }
      this.showChild(parent)
    },
    isShowBig() {
      this.showAnimation = !this.showAnimation
      let marWidth = 0
      this.showAnimation ? marWidth = 79 : marWidth = 200
      this.title = '' || '赞播管理后台'
      setTimeout(() => {
        this.isBig = !this.isBig
        if (!this.isBig) {
          if (this.navList[this.recodIndex].showHeight > height) {
            let target = height
            this.timer = setInterval(() => {
              if (this.navList[this.recodIndex].showHeight >= target) {
                this.navList[this.recodIndex].showHeight = height
                clearInterval(this.timer)
                return false
              }
              this.navList[this.recodIndex].showHeight -= 20
            }, 30)
          }
        } else {
          let num = 0
          this.bigChild === -1 ? num = this.recodIndex : num = this.bigChild

          this.showChild(num, false)
        }
      }, 200)
      return marWidth
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .navigation
    position: fixed
    left: 0
    top: 0
    z-index :1000
    background: $color-menu-background
    color: $color-white
    min-height: 717px
    height :100vh
    overflow-y ：scroll
    .big-show
      width: 200px
      .herder
        padding-left: 57px
        height: 65px
        overflow: hidden
        line-height: 67px
        font-size: 20px
        background: $color-menu-select
        position: relative
        .icon
          col-center()
          icon-image('pic-logo_menu')
          height: 32px
          width: 30px
          left: 22px
          transform: translateY(-55%)
      .nav-big
        .nav-item
          background : $color-menu-background
          overflow: hidden
          border-bottom: 1px solid #3B3B43
          .nav-tap
            transition :all 0.2s
            border-left: 4px solid $color-menu-background
            align-items: center
            color: $color-white
            display: flex
            height: 60px
            width: 100%
            position: relative
            .nav-icon
              height: 100%
              width: 58px
              position: relative
              .nav-pic
                height: 20px
                col-center()
                left: 20px
            .nav-title
              width: 64px
              display: flex
              font-family: 'PingFangSC-Light'
              font-size: $font-size-medium-x
              justify-content: space-between
            .nav
              col-center()
              height: 18px
              width: 18px
              right: 23px
              icon-image('icon-pressed')
            &:hover
              background: $color-menu-select
              border-left: 4px solid $color-menu-select
              transition :all 0.2s
          .nav-tap-active
            background: $color-menu-select
            border-left: 4px solid $color-nomal !important
          .nav-item-no-border
            border-left: 4px solid $color-menu-background
        .nav-big-child
          .nav-tap
            .nav-icon
              width :46px
          .nav-title
            margin-left: 20px
          .nav-big-active
            background: $color-menu-select
            border-left: 4px solid $color-nomal !important
    .big-hide
      width: 79px
      transition: all .2s

    .small-show
      width: 79px
      .herder
        height: 65px
        background: $color-menu-select
        position: relative
        .icon
          icon-image('pic-logo_menu')
          height: 32px
          width: 30px
          col-center()
          transform: translateY(-55%)
          left: 22px
      .nav-small
        .nav-item
          height: 60px
          border-bottom: 1px solid #3B3B43
          position: relative
          border-left: 4px solid $color-menu-background
          .nav-tap
            display: block
            height: 100%
            width: 100%
            color: $color-white
            line-height: 46px
          .nav-pic
            height: 20px
            col-center()
            left: 20px
          .nav-small-child
            position: absolute
            right: -177px
            top: 5px
            background: $color-menu-background
            border-radius: 4px
            z-index :300
            .nav-item
              height: 46px
              border: none
              &:first-child
                border-top-right-radius :3px
                border-top-left-radius :3px
              &:last-child
                border-bottom-right-radius :3px
                border-bottom-left-radius :3px
              .nav-tap
                font-size: $font-size-medium-x
                padding: 0 70px 0 20px
                .small-title
                  min-width: 84px
            .nav-item-active
              background: $color-menu-select
          &:hover
            background: $color-menu-select
            border-left: 4px solid $color-nomal
        .nav-small-active
          background: $color-menu-select
          border-left: 4px solid $color-nomal
    .small-hide
      width: 200px
      transition: all .2s

</style>
