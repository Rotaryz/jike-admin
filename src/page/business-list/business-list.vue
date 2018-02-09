<template>
  <form-box ref="order" @checkTime="checkTime" @addPage="addPage"
            @showCity="showCity" @showIndustrie="showIndustrie"
            :pageDtail="pageDtail" :isIndustrie="isIndustrie">
    <div slot="form-list" class="form-list" v-show="showContent">
      <div class="list-header">
        <div class="list-item" v-for="(item, index) in titleList" :key="index">
          {{item}}
        </div>
      </div>
      <ul class="list">
        <li class="list-box" v-for="(item,index) in merchanList" :class="{'list-box-active': heightIndex === index}" :key="index" @mouseenter="showHeight(index)" @mouseleave="hideHeight">
          <div class="list-item list-text">{{item.mobile}}</div>
          <div class="list-item list-text">{{item.shop_name}}</div>
          <div class="list-item list-text">{{item.industry}}</div>
          <div class="list-item list-text">{{item.user}}</div>
          <div class="list-item list-text">{{item.customer}}</div>
          <div class="list-item list-text">{{item.order}}</div>
          <div class="list-item"><span class="showDetail"
                                       @click="showDetail(item.id)">查看</span>
          </div>
        </li>
      </ul>
    </div>
    <div slot="shade-box" class="shade-box">
      <div class="shade-border">商家属性<span class="close"
                                                     @click="hideShadeBox">&times;</span>
      </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">商家名称</span>
        <span class="shade-text">{{merchantDetail.shop_name}}</span>
      </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">商家账号</span>
        <span class="shade-text">{{merchantDetail.account}}</span>
      </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">注册时间</span>
        <span class="shade-text">{{merchantDetail.register_time}}</span>
      </div>
      <div class="shade-border shade-tiem" :class="{'shade-input':!disableds}">
        <span class="shade-title">联系方式</span>
        <div class="input-box" :class="{'input-height': heightType === 0}">
          <input type="number" :class="{'input-height-item': !disableds}" class="shade-text" maxlength="11" v-model="merchantDetail.mobile" name="change"
               :disabled="disableds" @input="onPhone" @focus="isFocus(0)" @blur="heightType = -1"/>
        </div>
      </div>
      <div class="shade-border shade-tiem" :class="{'shade-input':!disableds}">
        <span class="shade-title">所在行业</span>
        <div class="input-box" :class="{'input-height': heightType === 1}">
          <input class="shade-text" :class="{'input-height-item': !disableds}" v-model="merchantDetail.industry_name"
                 name="change" @focus="isFocus(1)" @blur="heightType = -1"
                 :disabled="disableds"/>
        </div>
      </div>
      <div class="shade-border shade-tiem" :class="{'shade-input':!disableds}">
        <span class="shade-title">所在位置</span>
        <div class="input-box" :class="{'input-height': heightType === 2}">
          <textarea :class="{'input-height-item': !disableds}" @focus="isFocus(2)" @blur="heightType = -1" class="shade-text" v-model="merchantDetail.particular_address" :disabled="disableds"></textarea>
        </div>
      </div>
      <div class="shade-border shade-tiem" :class="{'shade-input':!disableds}">
        <span class="shade-title">所在商圈</span>
        <div class="input-box" :class="{'input-height': heightType === 3}">
          <input class="shade-text" :class="{'input-height-item': !disableds}" v-model="merchantDetail.business_circle_name"
                 name="change" :disabled="disableds" @focus="isFocus(3)" @blur="heightType = -1"/>
        </div>
      </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">商家属性</span>
        <div class="radios" @click="level('single')">
          <span class="icon hand"
                :class="{'icon-active': merchantDetail.reseller_level === 0}"></span>
          <span class="title">单店</span>
        </div>
        <div class="radios" @click="level">
          <span class="icon hand"
                :class="{'icon-active': merchantDetail.reseller_level === 1}"></span>
          <span class="title">连锁门店</span>
        </div>
      </div>
      <div class="shade-border shade-tiem">
        <span class="shade-title">商家角色</span>
        <div class="radios" @click="leader('leader')">
          <span class="icon hand"
                :class="{'icon-active': merchantDetail.is_leader === 0}"></span>
          <span class="title">普通</span>
        </div>
        <div class="radios" @click="leader">
          <span class="icon hand"
                :class="{'icon-active': merchantDetail.is_leader === 1}"></span>
          <span class="title">盟主</span>
        </div>
      </div>
      <div class="ok">
        <span class="submit change hand" @click="change">{{cancelTitle}}</span>
        <span class="submit sure hand"
              @click="merchantMessage(merchantDetail.id)">保存</span>
      </div>
    </div>
    <toast></toast>
  </form-box>
</template>

<script type="text/ecmascript-6">
import FormBox from 'base/form-box/form-box'
import {merchanList, merchantDetail, merchantMessage} from 'api/merchant'
import {ERR_OK} from 'api/config'
import Toast from 'base/toast/toast'
const titleList = ['商家账号', '商家名称', '商家类型', '用户数', '客户数', '订单数', '操作']
export default {
  data() {
    return {
      heightType: -1,
      disableds: true,
      titleList: titleList,
      merchanList: [],
      time: 1,
      pageDtail: [{total: 1, per_page: 10, total_page: 1}],
      page: 1,
      merchantDetail: [],
      isIndustrie: true,
      address: {},
      status: 1,
      shopId: {},
      heightIndex: -1,
      showContent: false,
      cancelTitle: '修改'
    }
  },
  created() {
    this.showList()
  },
  methods: {
    onPhone() {
      if (this.merchantDetail.mobile.length > 11) {
        this.merchantDetail.mobile = this.merchantDetail.mobile.slice(0, 11)
        return false
      }
    },
    change() {
      this.disableds = !this.disableds
      this.disableds ? this.cancelTitle = '修改' : this.cancelTitle = '取消修改'
    },
    showIndustrie(res) {
      this.shopId = res
      this.showList()
    },
    isFocus(num) {
      this.heightType = num
      console.log(num)
    },
    merchantMessage(id) {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!reg.test(this.merchantDetail.mobile)) {
        this.$refs.order.showContent('请输入正确的手机号码')
        return false
      }
      let data = {
        mobile: this.merchantDetail.mobile,
        industry_id: this.merchantDetail.industry_id,
        particular_address: this.merchantDetail.particular_address,
        business_circle_id: this.merchantDetail.business_circle_id,
        reseller_level: this.merchantDetail.reseller_level,
        is_leader: this.merchantDetail.is_leader
      }
      merchantMessage(id, data).then((res) => {
        if (res.error === ERR_OK) {
          this.$refs.order.hideShade()
        } else {
          this.$refs.order.showContent(res.message)
        }
      })
    },
    level(type) {
      if (type === 'single') {
        if (this.merchantDetail.reseller_level !== 0) {
          this.merchantDetail.reseller_level = 0
        }
      } else {
        if (this.merchantDetail.reseller_level !== 1) {
          this.merchantDetail.reseller_level = 1
        }
      }
    },
    leader(type) {
      if (type === 'leader') {
        if (this.merchantDetail.is_leader !== 0) {
          this.merchantDetail.is_leader = 0
        }
      } else {
        if (this.merchantDetail.is_leader !== 1) {
          this.merchantDetail.is_leader = 1
        }
      }
    },
    hideShadeBox() {
      this.$refs.order.hideShade()
    },
    showList() {
      let data = {}
      data = Object.assign({}, {
        time: this.time,
        page: this.page
      }, this.address, this.shopId)
      merchanList(data).then((res) => {
        this.showContent = true
        if (res.error === ERR_OK) {
          this.merchanList = res.data
          this.$refs.order.isBlank(res.data)
          let pages = res.meta
          this.pageDtail = [{
            total: pages.total,
            per_page: pages.per_page,
            total_page: pages.last_page
          }]
        }
      })
    },
    showDetail(id) {
      this.disableds = true
      this.$refs.order.showShade()
      merchantDetail(id).then((res) => {
        if (res.error === ERR_OK) {
          this.merchantDetail = res.data
        }
      })
    },
    showHeight(index) {
      this.heightIndex = index
    },
    hideHeight() {
      this.heightIndex = -1
    },
    checkTime(value, page) {
      if (Array.isArray(value)) {
        this.time = value.join(',')
      } else {
        this.time = value
      }
      this.page = page
      this.showList()
    },
    addPage(page) {
      this.page = page
      this.showList()
    },
    showCity(prams, page) {
      this.address = this.$refs.order.infoData(prams)
      this.page = page
      this.showList()
    }
  },
  components: {
    'form-box': FormBox,
    'toast': Toast
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
      border-bottom: 1px solid $color-big-background
      background :$color-big-background
    .list
      height: 90.5%
      display: flex
      flex-direction: column
      .list-box
        height: 10%
        border-bottom: 1px solid $color-big-background
        .list-item
          line-height: 16px
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
        font-size: $font-size-medium
        padding: 4% 11%
        color: $color-nomal
        border-radius: 3px
        border: 1px solid $color-nomal
      &:nth-child(1), &:nth-child(2)
        flex: 1.2
    .list-box-active
      background: $color-background
  .list-header
    .list-item:last-child
      transform :translateX(8%)

  .shade-box
    .shade-border
      font-size: $font-size-medium
      padding-left: 30px
      display :flex
      height :5.01vh
      align-items :center
      color: $color-text
      position: relative
      no-wrap()
      &:before
        content: ''
        background: $color-icon-line
        height: 1px
        width: 100%
        position: absolute
        left: 0
        bottom: 0
      .shade-text:disabled
        background: $color-white
      input.shade-text,textarea.shade-text
        height :100%
        width :100%
        padding-left :10px
        border: 0.5px solid $color-white
      textarea.shade-text
        padding-top :2px
        font-size :$font-size-medium
        box-sizing :border-box
        outline :none
      .shade-text
        width: 65%
      .input-box
        position: relative
        width: 65%
        height: 75%
        border:2px solid $color-white
        border-radius :5px
        transform :translateX(-10px)
      .shade-title
        min-width: 112px
        no-wrap()
      &:first-child
        font-size: $font-size-medium-x
        height :7.01vh
        position: relative
        .close
          cursor: pointer
          position: absolute
          col-center()
          right: 30px
          color: #979797
          font-size: 24px
          transform :translateY(-50%) rotate(0deg)
          &:hover
            transform :translateY(-50%) rotate(90deg)
            transform-origin :50%
            transition : transform 0.5s
      /*修改*/
      .amend
        position: absolute
        right: 30px
        font-size: $font-size-medium
        padding: 8px 18px
        line-height: 1
        col-center()
        color: $color-nomal
        border: 1px solid $color-nomal
        border-radius: 3px
      /*单选*/
      .radios
        display: flex
        align-items: center
        margin-right: 60px
        .icon
          display: inline-block
          height: 16px
          width: 16px
          border: 1px solid #ccc
          border-radius: 100%
          margin-right: 6px
        .icon-active
          border: none
          icon-image('icon-rignt')
    .shade-exprent
      height: 144px
      display: block
      #exprent
        padding: 8px
        transform: translateY(-12px)
        display: block
        height: 74px
        width: 88.764%
        border: 0.5px solid $color-icon-line
    .shade-input
      input.shade-text,textarea.shade-text
        background :$color-white
        border: 1px solid $color-line
        border-radius :3px
    .ok
      height: 9.26vh
      display: flex
      justify-content: center
      align-items: center
      .submit
        height: 40px
        width: 41.19%
        border-radius: 3px
        color: $color-white
        text-align: center
        line-height: 40px
        background: $color-nomal
      .change
        margin-right: 20px
        background: $color-white
        border: 1px solid $color-line
        color: $color-text
        &:hover
          color :$color-nomal
          border: 1px solid $color-nomal
      .sure
        &:hover
          background :$color-hover
        &:active
          background :$color-active

    .shade-tiem:hover
      background :$color-background
      .input-box
        border: 2px solid $color-background
      input.shade-text:disabled,textarea.shade-text:disabled
        background: $color-background
        border: 0.5px solid $color-background
  .selects
    display: flex
    font-size: $font-size-medium
    color: $color-text
    line-height: 30px
    transform: translateY(-25%)
    .select-box
      display: flex
      margin-left: 10px
      .select-item
        box-sizing: border-box
        width: 76px
        height: 30px
        line-height: 32px
        text-align center
        border: 1px solid $color-icon-line
        color: $color-text-icon
        &:nth-child(1)
          border-right: none
          border-bottom-left-radius: 3px
          border-top-left-radius: 3px
        &:nth-child(2)
          border-bottom-right-radius: 3px
          border-top-right-radius: 3px
          border-left: none
      .select-item-active
        border: none
        background: $color-nomal
        color: $color-white
</style>
