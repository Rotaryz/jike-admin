<template>
  <div class="container">
    <navigation ref="nav"></navigation>
    <div class="left-side">
      <div class="herder-peo">
        <img src="./icon-menu@2x.png" class="guide" :class="{'guide-rotate':navStatus}" @click="checkStatus">
        <div class="user">
          <img src="./header.jpeg" class="user-header">
          <span class="nick-name">秦淘淘</span>
          <i class="icons-top"></i>
        </div>
      </div>
      <div class="content" @mouseover="hideNav">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Navigation from 'base/navigation/navigation'
export default {
  data() {
    return {
      navStatus: true
    }
  },
  methods: {
    checkStatus() {
      this.$refs.nav.isShowBig()
      this.navStatus = !this.navStatus
    },
    hideNav() {
      this.$refs.nav.hideHover()
    }
  },
  components: {
    'navigation': Navigation
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .container
    height: 100vh
    display: flex
    .left-side
      flex: 1
      display :flex
      flex-direction :column
      .herder-peo
        background: $color-white
        padding-left: 24px
        height: 80px
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid $color-icon-line
        .guide
          cursor: pointer
          height: 26px
          width: 26px
          transform :rotateY(180deg)
          transition : all 0.3s
        .guide-rotate
          transform :rotateY(0deg)
        .user
          height: 100%
          display: flex
          align-items: center
          padding: 0 41px 0 33px
          position: relative
          .user-header
            height: 43px
            border-radius: 100%
          .nick-name
            font-size: $font-size-medium-x
            color: $color-text-icon
            margin: 0 20px 0 10px
          .icons-top
            height: 0px
            border: 8px solid $color-text-icon
            border-bottom: 8px solid transparent
            border-left: 8px solid transparent
            border-right: 8px solid transparent
            position: absolute
            right: 28px
            tcol-center()
        .user-active
          background: $color-background
      .content
        flex: 1
</style>
