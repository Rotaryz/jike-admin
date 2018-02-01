<template>
  <div class="container">
    <navigation ref="nav"></navigation>
    <div class="left-side">
      <div class="herder-peo">
        <img src="./icon-menu@2x.png" class="guide"
             :class="{'guide-rotate':navStatus}" @click="checkStatus">
        <div class="user" :class="{'user-active': logout}" @click="showlogout">
          <img src="./header.jpeg" class="user-header">
          <span class="nick-name">{{userName}}</span>
          <i :class="logout ? 'icons-bottom': 'icons-top' "></i>
          <div class="logout" v-show="logout" @click.stop="isLogout">
            <span class="logout-icons"></span>
            退出登录
          </div>
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
import {datasList} from 'api/datas'
import {initAxios} from 'common/js/config'
export default {
  data() {
    return {
      navStatus: true,
      userName: localStorage.getItem('userName') || sessionStorage.getItem('userName'),
      logout: false,
      showOut: false,
      dataStatus: ''
    }
  },
  created() {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) {
      location.href = '#/login'
      localStorage.clear()
      sessionStorage.clear()
    } else {
      initAxios()
      datasList().then((res) => {
        this.dataStatus = res.message
        if (this.dataStatus === '凭证已失效') {
          location.href = '#/login'
          localStorage.clear()
          sessionStorage.clear()
        }
      })
    }
  },
  methods: {
    showlogout() {
      this.logout = !this.logout
    },
    checkStatus() {
      this.$refs.nav.isShowBig()
      this.navStatus = !this.navStatus
    },
    hideNav() {
      this.$refs.nav.hideHover()
    },
    isLogout() {
      localStorage.clear()
      sessionStorage.clear()
      location.href = '#/login'
    },
    showHeight() {
      this.showOut = true
    },
    hideHeight() {
      this.showOut = false
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
      display: flex
      flex-direction: column
      .herder-peo
        background: $color-white
        display: flex
        padding: 20px 0 20px 24px
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid $color-icon-line
        .guide
          cursor: pointer
          height: 26px
          width: 26px
          transform: rotateY(180deg)
          transition: all 0.3s
        .guide-rotate
          transform: rotateY(0deg)
        .user
          height: 100%
          display: flex
          align-items: center
          padding: 0 41px 0 33px
          position: relative
          .logout
            border-radius: 3px
            position: absolute
            width: 90%
            text-indent: 64px
            height: 50px
            box-shadow: 0 1px 5px 0 rgba(12, 6, 14, 0.20)
            line-height: 50px
            bottom: -58px
            right: 9px
            z-index: 200
            .logout-icons
              position: absolute
              left: 30px
              height: 22px
              width: 22px
              icon-image('icon-exit')
              col-center()
          .logout:active
            background: $color-background
          .user-header
            height: 40px
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
            top: 50%
          .icons-bottom
            height: 0px
            border: 8px solid $color-text-icon
            border-top: 8px solid transparent
            border-left: 8px solid transparent
            border-right: 8px solid transparent
            position: absolute
            right: 28px
            col-center()
        .user-active
          background: $color-background
      .content
        flex: 1
</style>
