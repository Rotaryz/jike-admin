<template>
  <form-box ref="order" @checkTime="checkTime" @addPage="addPage"  :pageDtail="pageDtail">
    <div slot="form-list" class="form-list">
      <div class="list-header">
        <div class="list-item" v-for="(item, index) in titleList" :key="index">
          {{item}}
        </div>
      </div>
      <ul class="list">
        <li class="list-box" v-for="(item,index) in orderList" :key="index" @mouseenter="showHeight">
          <div class="list-item list-text">{{item.order_sn}}</div>
          <div class="list-item list-text">{{item.shop_name}}</div>
          <div class="list-item list-text">{{item.nickname}}</div>
          <div class="list-item list-text">{{item.total}}</div>
          <div class="list-item list-text">{{item.created_at}}</div>
          <div class="list-item list-text">{{item.status}}</div>
          <div class="list-item"><span class="showDetail" @click="showDetail(item.id)">查看</span></div>
        </li>
      </ul>
    </div>
    <div slot="shade-box" class="shade-box">
      <div class="shade-border shade-tiem">订单信息<span class="close" @click="hideShadeBox">&times;</span></div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">订单号</span>
        <span class="shade-text">{{orderDetail.order_sn}}</span>
      </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">归属商家</span>
        <span class="shade-text">{{orderDetail.shop_name}}</span>
        </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">归属客户</span>
        <span class="shade-text">{{orderDetail.nickname}}</span>
       </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">订单金额</span>
        <span class="shade-text">{{orderDetail.total}}</span>
      </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">下单时间</span>
        <span class="shade-text">{{orderDetail.created_at}}</span>
        </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">订单状态</span>
        <span class="shade-text">{{orderDetail.status}}</span>
        </div>
      <div class="shade-border shade-exprent">
        备注
        <textarea id="exprent" placeholder="请输入" v-model="orderDetail.reamrk"></textarea>
      </div>
      <div class="ok">
        <span class="submit">保存</span>
      </div>
    </div>
  </form-box>
</template>

<script type="text/ecmascript-6">
import FormBox from 'base/form-box/form-box'
import {orderList, orderDetail} from 'api/order'
import {ERR_OK} from 'api/config'
const titleList = ['订单号', '商家名称', '客户名称', '订单金额', '下单时间', '订单状态', '订单详情']
export default {
  data() {
    return {
      titleList: titleList,
      orderList: [],
      time: 1,
      pageDtail: [{total: 1, per_page: 10, total_page: 1}],
      page: 1,
      orderDetail: []
    }
  },
  created() {
    this.showList()
  },
  methods: {
    hideShadeBox() {
      this.$refs.order.hideShade()
    },
    showList() {
      let data = {time: this.time, page: this.page}
      orderList(data).then((res) => {
        if (res.error === ERR_OK) {
          this.orderList = res.data
          let pages = res.meta
          this.pageDtail = [{total: pages.total, per_page: pages.per_page, total_page: pages.last_page}]
        }
      })
    },
    showDetail(id) {
      this.$refs.order.showShade()
      orderDetail(id).then((res) => {
        if (res.error === ERR_OK) {
          this.orderDetail = res.data
        }
      })
    },
    showHeight() {

    },
    checkTime(value, page) {
      this.time = value
      this.page = page
      this.showList()
      console.log(value)
    },
    addPage(page) {
      this.page = page
      this.showList()
    }
  },
  components: {
    'form-box': FormBox
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .form-list
    height: 100%
    .list-header, .list-box
      display: flex
      align-items: center
      padding-left: 43px
    .list-header
      height: 9.5%
      border-bottom: 1px solid #979797
    .list
      height: 90.5%
      display: flex
      flex-direction: column
      .list-box
        height: 10%
        border-bottom: 1px solid $color-icon-line
        .list-item
          font-size: $font-size-medium
    .list-text
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
    .list-item
      color: $color-text
      flex: 1
      .showDetail
        cursor: pointer
        height: 25px
        font-size: $font-size-medium
        padding: 8px 18px
        color: $color-nomal
        border-radius: 3px
        border: 1px solid $color-nomal
      &:nth-child(1), &:nth-child(2)
        flex: 1.2
    .list-box-active
      background: #C9D1D8
  .shade-box
    .shade-border
      border-bottom :1px solid #DADADA
      font-size :$font-size-medium
      padding-left :30px
      height :50px
      line-height: 50px
      display :flex
      color :$color-text
      .shade-title
        width :112px
        no-wrap()
      &:first-child
        font-size :$font-size-medium-x
        height :60px
        line-height: 60px
        position: relative
        .close
          cursor: pointer
          position: absolute
          col-center()
          right: 30px
          color: #979797
          font-size :24px
    .shade-exprent
      height : 144px
      display: block
      #exprent
        padding : 8px
        transform :translateY(-12px)
        display :block
        height :74px
        width :88.764%
        border :0.5px solid $color-icon-line
    .ok
      height :100px
      display :flex
      justify-content :center
      align-items :center
      .submit
        height :40px
        width :220px
        border-radius :3px
        color :$color-white
        text-align :center
        line-height:40px
        background :$color-nomal
</style>
