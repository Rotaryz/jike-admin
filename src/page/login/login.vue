<template>
  <div class="login">
    <div class="bk"></div>
    <div class="login-box">
      <img src="./pic-logo_login@2x.png" class="logo">
      <h2 class="title">赞播管理后台信息系统</h2>
      <div class="user input-box">
        <span class="input-icon"></span>
        <input class="inputs" type="text" placeholder="请输入用户名" v-model="user">
      </div>
      <div class="passward input-box">
        <span class="input-icon"></span>
        <input class="inputs" type="text" placeholder="请输入密码" v-model="password">
      </div>
      <div class="remenber" @click="remenberPassWord">
        <i class="check" :class="{'check-yes' : remenber}"></i>
        <span class="tip">记住密码</span>
      </div>
      <div class="submit-no input-box">
        登录
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      user: '',
      password: '',
      remenber: true
    }
  },
  methods: {
    remenberPassWord() {
      this.remenber = !this.remenber
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .login
    .bk
      height: 66.389vh
      width: 100%
      position: absolute
      bottom: 0
      left: 0
      background-size: cover
      bg-image('pic-bg')
    .login-box
      box-shadow: 0 0 10px 0 rgba(12, 6, 14, 0.10)
      border-radius: 3px
      height: 28.22vw
      width: 26.45vw
      min-width :386px
      min-height :416px
      background: $color-white
      all-center()
      text-align: center
      .logo
        margin-top: 8.118%
        width: 17.98%
      .title
        color: #000
        font-size: 1.875vw
        margin-top: 4.428%
      .input-box
        margin: 4.59% auto
        height: 9.225%
        width: 72.47%
        font-size: 2.853%
        position: relative
        .inputs
          text-indent: 8.856%
          height: 100%
          width: 100%
          border-radius: 3px
          border: 1px solid #D1D1D1
        .input-icon
          height: 44%
          width: 6.01%
          bg-image('icon-user')
          background-size: cover
          col-center()
          left: 2.5%
      .passward
        .input-icon
          bg-image('icon-password')
      .remenber
        display: flex
        justify-content: right
        margin-left: 13.7795%
        height: 1.0416vw
        .check
          cursor: pointer
          height: 100%
          width: 1.0416vw
          border: 1px solid #979797
          border-radius: 4px
        .check-yes
          border: none
          bg-image('icon-select')
          background-size: cover
        .tip
          line-height: 1.0416vw
          margin-left: 2.853%
          font-size: 2.853%
          color: #9B9B9B
      .submit-no
        background: $color-nomal
        color: $color-white
        display: flex
        align-items: center
        justify-content: center
        border-radius: 4px
        &:hover
          background: $color-hover
        &:active
          background: $color-nomal
          border: 1px solid rgba(239, 112, 93, 0.30)
</style>
