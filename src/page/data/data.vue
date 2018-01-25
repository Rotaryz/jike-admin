<template>
  <form-box>
    <div slot="form-list" class="form-list">
      <div class="list-header">
        <div class="list-item" v-for="(item, index) in titleList" :key="index">{{item}}</div>
      </div>
      <ul class="list">
        <li class="list-box">
          <div class="list-item">10-10</div>
          <div class="list-item">10000</div>
          <div class="list-item">10000</div>
          <div class="list-item">10000</div>
          <div class="list-item">10000</div>
          <div class="list-item">10000</div>
        </li>
        <li class="list-box">
          <div class="list-item">10-10</div>
          <div class="list-item">10000</div>
          <div class="list-item">10000</div>
          <div class="list-item">10000</div>
          <div class="list-item">10000</div>
          <div class="list-item">10000</div>
        </li>
      </ul>
    </div>
  </form-box>
</template>

<script type="text/ecmascript-6">
import FormBox from 'base/form-box/form-box'
const titleList = ['日期', '商家数', '用户数', '客户数', '订单数', '交易金额']
export default {
  components: {
    'form-box': FormBox
  },
  data() {
    return {
      titleList: titleList
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .form-list
    height: 100%
    .list-header,.list-box
      display :flex
      align-items :center
      padding-left :43px
    .list-header
      height: 9.5%
      border-bottom: 1px solid #979797
    .list
      height :90.5%
      display :flex
      flex-direction :column
      .list-box
        height :10%
        border-bottom: 1px solid $color-icon-line
        .list-item
          font-size :$font-size-medium
    .list-item
      color: $color-text
      flex: 1
</style>
