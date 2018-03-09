<template>
  <form-box ref="order" @checkTime="checkTime" @addPage="addPage"
            @showCity="showCity" @showIndustrie="showIndustrie"
            :pageDtail="pageDtail" :isIndustrie="isIndustrie">
    <div slot="tap" class="select">
      <admin-select :select="selectList" @selectType="selectType"
                    @setValue="setValue"></admin-select>
    </div>
    <div slot="form-list" class="form-list" v-show="showContent">
      <div class="list-header">
        <div class="list-item" v-for="(item, index) in titleList" :key="index">
          {{item}}
        </div>
      </div>
      <ul class="list">
        <li class="list-box" v-for="(item,index) in merchanList"
            :class="{'list-box-active': heightIndex === index}" :key="index"
            @mouseenter="showHeight(index)" @mouseleave="hideHeight">
          <div class="list-item list-text">{{item.mobile}}</div>
          <div class="list-item list-text">{{item.shop_name}}</div>
          <div class="list-item list-text">{{item.is_leader ? '盟主' : '普通'}}
          </div>
          <div class="list-item list-text">{{item.industry}}</div>
          <div class="list-item list-text">{{item.user}}</div>
          <div class="list-item list-text">{{item.customer}}</div>
          <div class="list-item list-text">{{item.order}}</div>
          <div class="list-item list-text">{{item.service_version ? '基础' : '试用'}}</div>
          <div class="list-item list-text">{{item.is_disabled ? '已过期' : '使用中'}}</div>
          <div class="list-item list-text">
            {{item.open_type === 0 ? '支付开通' : item.open_type === 1 ? '盟主开通' : item.open_type === 2 ? '后台开通' : ''}}
          </div>
          <div class="list-item">
            <span class="showDetail">
              <span @click="showDetail(item.id)">查看</span>
              <span class="open" @click="openShop(item.merchant_id)">
                | 开通
                <div class="order-block " @click.stop v-show="item.end_time">
                  <el-date-picker
                    type="datetime"
                    v-model="endTime"
                    placeholder="结束日期">
                  </el-date-picker>
                  <span class="time-sure" @click="openServices(index)">确定</span>
                </div>
              </span>
              <span @click="frost(item)"> | {{item.is_disabled ? '解冻' : '冻结'}}</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div slot="shade-box" class="shade-box">
      <div v-show="!freeze">
        <div class="shade-border">商家属性<span class="close" @click="hideShadeBox">&times;</span>
        </div>
        <div class="shade-border shade-tiem" :class="{'shade-input':!disableds}">
          <span class="shade-title">姓名</span>
          <div class="input-box" :class="{'input-height': heightType === 4}">
            <input type="text" :class="{'input-height-item': !disableds}"
                   class="shade-text" v-model="merchantDetail.user_name" name="change"
                   :disabled="disableds" @input="onPhone" @focus="isFocus(4)"
                   @blur="heightType = -1"/>
          </div>
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
            <input type="number" :class="{'input-height-item': !disableds}"
                   class="shade-text" maxlength="11"
                   v-model="merchantDetail.mobile" name="change"
                   :disabled="disableds" @input="onPhone" @focus="isFocus(0)"
                   @blur="heightType = -1"/>
          </div>
        </div>
        <div class="shade-border shade-tiem" :class="{'shade-input':!disableds}">
          <span class="shade-title">所在行业</span>
          <div class="input-box" :class="{'input-height': heightType === 1}">
            <input class="shade-text" :class="{'input-height-item': !disableds}"
                   v-model="merchantDetail.industry_name"
                   name="change" @focus="isFocus(1)" @blur="heightType = -1"
                   :disabled="disableds"/>
          </div>
        </div>
        <div class="shade-border shade-tiem" :class="{'shade-input':!disableds}">

          <span class="shade-title">所在位置</span>
          <div class="input-box" :class="{'input-height': heightType === 2}">
          <textarea :class="{'input-height-item': !disableds}"
                    @focus="isFocus(2)" @blur="heightType = -1"
                    class="shade-text" v-model="merchantDetail.particular_address" :disabled="disableds"></textarea>
          </div>
        </div>
        <div class="shade-border shade-tiem" :class="{'shade-input':!disableds}">
          <span class="shade-title">所在商圈</span>
          <div class="input-box" :class="{'input-height': heightType === 3}">
            <input class="shade-text" :class="{'input-height-item': !disableds}"
                   v-model="merchantDetail.business_circle_name"
                   name="change" :disabled="disableds" @focus="isFocus(3)"
                   @blur="heightType = -1"/>
          </div>
        </div>
        <div class="shade-border shade-tiem">
          <span class="shade-title">开通时间</span>
          <span class="shade-text">{{merchantDetail.open_service_log ? merchantDetail.open_service_log.created_at : ''}}</span>
        </div>
        <div class="shade-border shade-tiem end-time" :class="{'shade-input':!disableds}">
          <span class="shade-title">到期时间</span>
          <!--<div class="input-box" :class="{'input-height': heightType === 5}">-->
          <!--<input class="shade-text" :class="{'input-height-item': !disableds}"-->
          <!--v-model="merchantDetail.open_service_log"-->
          <!--name="change" :disabled="disableds" @focus="isFocus(5)"-->
          <!--@blur="heightType = -1"/>-->
          <!--</div>-->
          <!--<span class="shade-text" v-show="disableds">{{merchantDetail.expiration_time}}</span>-->
          <div class="order-block input-box" :class="{'order-boder': !disableds}">
            <el-date-picker
              v-model="merchantDetail.expiration_time"
              type="datetime"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="shade-border shade-tiem">
          <span class="shade-title">开通方式</span>
          <span class="shade-text" >{{!merchantDetail.open_service_log ? '' : merchantDetail.open_service_log.open_type === 0 ? '支付开通' : merchantDetail.open_service_log.open_type === 1 ? '盟主开通' : merchantDetail.open_service_log.open_type === 2 ? '后台开通' : ''}}</span>
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
        <div class="shade-border shade-tiem activation-code" :class="{'shade-input':!disableds}" v-show="merchantDetail.is_leader">
          <span class="shade-title">生成激活码</span>
          <div class="input-box" :class="{'input-height': heightType === 7}">
            <input class="shade-text" :class="{'input-height-item': !disableds}"
                   v-model="activationCode"
                   name="change" :disabled="disableds" @focus="isFocus(7)"
                   @blur="heightType = -1"/>
            <span class="activation-tip">累计{{merchantDetail.inviter_code_count + (activationCode * 1)}}个</span>
          </div>
        </div>
        <div class="shade-border shade-tiem">
          <span class="shade-title">商家状态</span>
          <span class="shade-text">{{merchantDetail.service_version ? '普通' : '试用'}}</span>
        </div>
        <div class="shade-border shade-tiem">
          <span class="shade-title">商家状态</span>
          <span class="shade-text">{{merchantDetail.is_disabled ? '冻结' : '未冻结'}}</span>
        </div>
        <div class="shade-border shade-tiem">
          <span class="shade-title">账号状态</span>
          <span class="shade-text">{{merchantDetail.is_expiration ? '已过期' : '使用中'}}</span>
        </div>
        <div class="shade-border shade-tiem">
          <span class="shade-title">冻结原因</span>
          <span class="shade-text">{{merchantDetail.note}}</span>
        </div>
        <div class="ok">
          <span class="submit change hand" @click="change">{{cancelTitle}}</span>
          <span class="submit sure hand"
                @click="merchantMessage(merchantDetail.id)">保存</span>
        </div>
      </div>
      <div class="shade-inquiry" v-show="freeze">
        <div class="shade-border shade-tiem">{{freezeText}}<span class="close" @click="hideShadeBox">&times;</span>
        </div>
        <div class="shade-border shade-exprent shade-tiem">
          备注
          <div class="ex-box" :class="{'input-height':focus }">
            <textarea id="exprent" :class="freezeText == '解冻' ? '' : 'input-height-item'" @focus="focus = true" :disabled="freezeText == '解冻'" @blur="focus = false" placeholder="请输入" v-model="reamrk"></textarea>
          </div>
        </div>
        <div class="ok">
          <span class="submit change hand" @click="hideShadeBox">取消</span>
          <span class="submit sure hand" @click="withdrawal">确定</span>
        </div>
      </div>
    </div>
    <toast></toast>
  </form-box>
</template>

<script type="text/ecmascript-6">
import FormBox from 'base/form-box/form-box'
import {merchanList, merchantDetail, merchantMessage, openService, disable} from 'api/merchant'
import {ERR_OK} from 'api/config'
import Toast from 'base/toast/toast'
import AdminSelect from 'base/admin-select/admin-select'
const titleList = ['商家账号', '商家名称', '商家角色', '商家类型', '用户数', '客户数', '订单数', '版本', '商家状态', '开通方式', '操作']
const select = [{
  title: '开通方式',
  type: 'open',
  select: false,
  show: false,
  children: [{
    content: '全部',
    data: [{title: '全部', status: ''}, {
      title: '支付开通',
      status: 0
    }, {title: '盟主开通', status: 1}, {title: '后台开通', status: 2}]
  }]
}, {
  title: '版本',
  type: 'version',
  select: false,
  show: false,
  children: [{
    content: '全部',
    data: [{title: '全部', status: ''}, {title: '试用', status: 0}, {
      title: '基础',
      status: 1
    }]
  }]
}, {
  title: '商家角色',
  type: 'role',
  select: false,
  show: false,
  children: [{
    content: '全部',
    data: [{title: '全部', status: ''}, {title: '普通', status: 0}, {
      title: '盟主',
      status: 1
    }]
  }]
}, {
  title: '商家状态',
  type: 'account',
  select: false,
  show: false,
  children: [{
    content: '全部',
    data: [{title: '全部', status: ''}, {
      title: '使用中',
      status: 0
    }, {title: '已过期', status: 1}]
  }]
}, {
  title: '账号状态',
  type: 'merchant',
  select: false,
  show: false,
  children: [{
    content: '全部',
    data: [{title: '全部', status: ''}, {title: '未冻结', status: 0}, {
      title: '冻结',
      status: 1
    }]
  }]
}]
export default {
  data() {
    return {
      freezeText: '冻结',
      focus: false,
      reamrk: '',
      freeze: false,
      endTime: '',
      activationCode: 0,
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
      cancelTitle: '修改',
      selectList: select,
      type: '',
      openType: '',
      role: '',
      serviceVersion: '',
      isExpiration: '',
      isDisabled: '',
      merchantId: 0,
      isDisabledCode: 0
    }
  },
  created() {
    this.showList()
  },
  methods: {
    selectType(type, res) {
      this.selectList = res
      this.type = type
    },
    setValue(res) {
      switch (this.type) {
      case 'open':
        this.openType = res.status
        break
      case 'version':
        this.serviceVersion = res.status
        break
      case 'role':
        this.role = res.status
        break
      case 'account':
        this.isExpiration = res.status
        break
      case 'merchant':
        this.isDisabled = res.status
        break
      }
      this.showList()
    },
    onPhone() {
      if (this.merchantDetail.mobile.length > 11) {
        this.merchantDetail.mobile = this.merchantDetail.mobile.slice(0, 11)
        return false
      }
    },
    RiQi(time) {
      let now = new Date(time)
      let year = now.getFullYear()
      let month = now.getMonth() + 1
      let date = now.getDate()
      let hour = now.getHours()
      let minute = now.getMinutes()
      let second = now.getSeconds()
      return year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second
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
    },
    merchantMessage(id) {
      let date = this.RiQi(this.merchantDetail.expiration_time)
      let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
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
        is_leader: this.merchantDetail.is_leader,
        inviter_code_count: this.activationCode,
        service_version: this.merchantDetail.service_version,
        expiration_time: date,
        user_name: this.merchantDetail.user_name
      }
      merchantMessage(id, data).then((res) => {
        if (res.error === ERR_OK) {
          this.$refs.order.hideShade()
        }
        this.$refs.order.showContent(res.message)
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
    version(type) {
      if (type === 'version') {
        if (this.merchantDetail.service_version !== 0) {
          this.merchantDetail.service_version = 0
        }
      } else {
        if (this.merchantDetail.service_version !== 1) {
          this.merchantDetail.service_version = 1
        }
      }
    },
    frost(res) {
      res.is_disabled ? this.freezeText = '解冻' : this.freezeText = '冻结'
      this.merchantId = res.merchant_id
      this.isDisabledCode = res.is_disabled
      res.is_disabled ? this.reamrk = '' : this.reamrk = res.note
        this.merchanList.map((item) => {
        item.end_time = false
        return item
      })
      this.$refs.order.showShade()
      this.freeze = true
    },
    withdrawal() {
      let data = {note: this.reamrk, merchant_id: this.merchantId}
      disable(data).then((res) => {
        if (res.error === ERR_OK) {
          let connent = ''
          this.isDisabledCode ? connent = '解冻' : connent = '冻结'
          this.$refs.order.showContent(connent + '开通')
          this.$refs.order.hideShade()
          this.showList()
          return
        }
        this.$refs.order.showContent(res.message)
      })
    },
    hideShadeBox() {
      this.$refs.order.hideShade()
    },
    showList() {
      let data = {}
      data = Object.assign({}, {
        time: this.time,
        page: this.page,
        open_type: this.openType,
        role: this.role,
        service_version: this.serviceVersion,
        is_expiration: this.isExpiration,
        is_disabled: this.isDisabled
      }, this.address, this.shopId)
      merchanList(data).then((res) => {
        this.showContent = true
        if (res.error === ERR_OK) {
          res.data.map((item) => {
            item.end_time = false
          })
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
      this.freeze = false
      merchantDetail(id).then((res) => {
        if (res.error === ERR_OK) {
          this.merchantDetail = res.data
          this.merchantDetail.expiration_time = new Date(this.merchantDetail.expiration_time * 1000)
        }
      })
    },
    openShop(merchantId) {
      this.merchantId = merchantId
      this.merchanList.map((item) => {
        if (item.merchant_id === merchantId) {
          item.end_time = !item.end_time
        } else {
          item.end_time = false
        }
        return item
      })
    },
    openServices(index) {
      let endTime = this.RiQi(this.endTime)
      let data = {expiration_time: endTime, merchant_id: this.merchantId}
      openService(data).then((res) => {
        if (res.error === ERR_OK) {
          this.merchanList[index].end_time = false
          this.$refs.order.showContent('成功开通')
          return
        }
        this.$refs.order.showContent(res.message)
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
    'toast': Toast,
    'admin-select': AdminSelect
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
      background: $color-big-background
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
        padding: 4% 7%
        color: $color-nomal
        border-radius: 3px
        border: 1px solid $color-nomal
        .open
          position: relative
          .order-block
            z-index: 1000
            position: absolute
            bottom: -47px
            row-center()
            .time-sure
              position: absolute
              col-center()
              right: 15px
      &:nth-child(1), &:nth-child(2)
        flex: 1.2
      &:last-child
        flex: 1.5
    .list-box-active
      background: $color-background

  .list-header
    .list-item:last-child
      transform: translateX(8%)

  .shade-box
    max-height: 540px
    overflow-y: auto
    .shade-border
      font-size: $font-size-medium
      padding-left: 30px
      display: flex
      height: 5.01vh
      align-items: center
      color: $color-text
      white-space :nowrap
      overflow:hidden
      position: relative
      border-bottom :0.5px solid $color-icon-line
      .shade-text:disabled
        background: $color-white
      input.shade-text, textarea.shade-text
        height: 100%
        width: 100%
        padding-left: 10px
        border: 0.5px solid $color-white
      textarea.shade-text
        padding-top: 2px
        font-size: $font-size-medium
        box-sizing: border-box
        outline: none
      .shade-text
        border :0.5px solid transparent
        width: 65%

      .input-box
        width: 65%
        height: 75%
        border: 2px solid $color-white
        border-radius: 5px
        transform: translateX(-10px)
        position: relative
      .shade-title
        min-width: 112px
        no-wrap()
      &:first-child
        font-size: $font-size-medium-x
        height: 7.01vh
        position: relative
        .close
          cursor: pointer
          position: absolute
          col-center()
          right: 30px
          color: #979797
          font-size: 24px
          transform: translateY(-50%) rotate(0deg)
          &:hover
            transform: translateY(-50%) rotate(90deg)
            transform-origin: 50%
            transition: transform 0.5s
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
    .shade-inquiry
      .shade-exprent
        height: 19vh
        display: block
        padding-top: 10px
        .ex-box
          transform :translateY(12px)
          border: 2px solid $color-white
          height: 75%
          width: 95.6%
        #exprent
          transform :translateY(0px)
          height: 100%
          width: 100%
          padding: 8px
          display: inline-block
          box-sizing: border-box
          border: 1px solid $color-icon-line
        &:hover
          background: $color-background
          .ex-box
            border: 2px solid $color-background
          .input-height-item
            border : 1px solid #999 !important
            background: $color-white
    .shade-input
      input.shade-text, textarea.shade-text
        background: $color-white
        border: 1px solid $color-line
        border-radius: 3px
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
          color: $color-nomal
          border: 1px solid $color-nomal
      .sure
        &:hover
          background: $color-hover
        &:active
          background: $color-active

    .shade-tiem:hover
      background: $color-background
      .input-box
        border: 2px solid $color-background
      input.shade-text:disabled, textarea.shade-text:disabled
        background: $color-background
        border: 0.5px solid $color-background
    .activation-code
      position: relative
      .input-box
        width :40%
      .activation-tip
        right: -80%
        col-center()
        font-size: $font-size-small
        color :$color-text-little
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

  .select
    padding-left: 1.8vw
</style>
