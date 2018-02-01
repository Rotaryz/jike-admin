<template>
  <form-box ref="order" @addPage="addPage" :pageDtail="pageDtail" :chioce="chioce" :isIndustrie="isIndustrie">
    <div slot="form-list" class="form-box">
      <div class="money">
        <div class="monry-item">
          <div class="monty-title">累计充值<span class="unit">单位：元</span></div>
          <div class="money-detail">8888,8888,000.00</div>
        </div>
        <div class="monry-item">
          <div class="monty-title">累计充值<span class="unit">单位：元</span></div>
          <div class="money-detail">8888,8888,000.00</div>
        </div>
      </div>
      <div class="check-tip">
        <div class="tap-first">
          <div class="tap-item" v-for="(item, index) in timeList"
               :key="index" >{{item.title}}</div>
        </div>
        <div class="selects">
          <div class="select-title">交易类型</div>
          <div class="select-box">
            <span class="select-item" :class="{'select-item-active':tapIndex === index,'select-item-none':index - 1 === tapIndex}" v-for="(item,index) in tapList" :key="index" @click="checkTap(index)">{{item.title}}</span>
          </div>
        </div>
        <div class="search">
          <input type="text" class="search-input" placeholder="商家ID">
          <span class="search-title">搜索</span>
        </div>
        <div class="down-excel">下载Excel</div>
      </div>
      <div class="form-list">
        <div class="list-header">
          <div class="list-item" v-for="(item, index) in titleListSec" :key="index">
            {{item}}
          </div>
        </div>
        <ul class="list">
          <li class="list-box">
            <div class="list-item list-text"></div>
            <div class="list-item list-text"></div>
            <div class="list-item list-text"></div>
            <div class="list-item list-text"></div>
          </li>
        </ul>
      </div>
    </div>
    <div slot="shade-box" class="shade-box">
      <div class="shade-border shade-tiem">新增商圈<span class="close" @click="hideShadeBox">&times;</span>
      </div>
      <div class="tag-city">
        <div class="city-se-box">
          <span class="tip">{{shadeTitle}}</span>
          <input class="city-select" placeholder="请输入" v-model="name">
        </div>
      </div>
      <div class="tag-city">
        <div class="city-se-box" v-for="(item, index) in cityList"
             :key="index" @click="checkCity(index)">
          <span class="tip">{{item.tip}}</span>
          <div class="city-select">
            <div class="city-show">
              {{item.title}}
              <div class="city-tap">
                <span class="city-tap-top"></span>
              </div>
            </div>
            <ul class="city-box" v-show="item.show">
              <li class="city-box-item" v-for="(items, idx) in item.data"
                  :class="{'city-box-item-active':item.index === idx}"
                  :key="idx" @click.stop="showCityList(idx,index,items)">{{items.name || items}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="ok">
        <span class="submit" @click="setData">保存</span>
      </div>
    </div>
  </form-box>
</template>

<script type="text/ecmascript-6">
import FormBox from 'base/form-box/form-box'
import {circlesDetail, industryDetail, addCircle, indestryAdd} from 'api/merchant'
import {businessCircle, industrie} from 'api/globals'
import {ERR_OK} from 'api/config'
const titleList = ['交易时间', '交易类型', '交易金额', '余额(元)']
const cityInfo = [{tip: '省', title: '请选择省份', type: 'province', data: [], show: false, index: -1}, {tip: '市', title: '请选择城市', type: 'city', data: [], show: false, index: -1}, {tip: '区', title: '请选择市区', type: 'district', data: [], show: false, index: -1}]
const isIndustrieInfo = [{tip: '所属行业', title: '请选择行业', type: '', data: [], show: false, index: -1}]
const titleListSec = ['行业类型名称', '所属行业', '操作']
export default {
  data() {
    return {
      chioce: false,
      isDate: false,
      tapList: [{title: '新增', type: ''}, {title: '充值', type: ''}, {title: '提现', type: ''}, {title: '授权', type: ''}],
      shadeTitle: '商家名称',
      timeList: [{title: '今天', type: '1'}, {
        title: '昨天',
        type: '-1'
      }, {title: '7天', type: '7'}, {title: '30天', type: '30'}, {
        title: '自定义',
        type: ''
      }],
      tapIndex: 0,
      cityList: [{
        tip: '省',
        title: '请选择省份',
        type: 'province',
        data: [],
        show: false,
        index: -1
      }, {
        tip: '市',
        title: '请选择城市',
        type: 'city',
        data: [],
        show: false,
        index: -1
      }, {
        tip: '区',
        title: '请选择市区',
        type: 'district',
        data: [],
        show: false,
        index: -1
      }],
      titleList: titleListSec,
      titleListSec: titleList,
      merchanList: [],
      industryList: [],
      type: 'circles',
      pageDtail: [{total: 1, per_page: 10, total_page: 1}],
      page: 1,
      isIndustrie: false,
      isCity: false,
      address: {},
      cityIndex: 0,
      prams: ['', '', ''],
      name: '',
      insId: 0,
      heightIndex: -1
    }
  },
  created() {
    this.showList()
  },
  methods: {
    showHeight(index) {
      this.heightIndex = index
    },
    hideHeight() {
      this.heightIndex = -1
    },
    checkCity(index) {
      this.cityIndex = index
      for (let i = 0; i < this.prams.length; i++) {
        if (i >= index) {
          this.prams[i] = ''
        }
      }
      this.cityList[index].show = !this.cityList[index].show
      this.showCity()
    },
    showCity() {
      let data = this.infoData(this.prams)
      if (this.type === 'circles') {
        businessCircle(data).then((res) => {
          if (res.error === ERR_OK) {
            this.cityList[this.cityIndex].data = res.data.filter[this.cityList[this.cityIndex].type]
          }
        })
        return false
      }
      industrie(data).then((res) => {
        if (res.error === ERR_OK) {
          this.cityList[0].data = res.data
        }
      })
    },
    showCityList(idx, index, title) {
      this.cityList[index].index = idx
      setTimeout(() => {
        this.cityList[index].show = false
        this.cityList[index].title = title.name || title
        if (this.type === 'circles') {
          this.prams[index] = title
          this.prams.forEach((item, idx) => {
            if (idx > index) {
              if (idx === 1) {
                this.cityList[idx].title = '请选择城市'
              } else if (idx === 2) {
                this.cityList[idx].title = '请选择市区'
              } else if (idx === 3) {
                this.cityList[idx].title = '请选择商圈'
              }
            }
          })
        } else {
          this.insId = title.id
        }
        this.page = 1
      }, 100)
    },
    infoData(res) {
      let data = {province: res[0], city: res[1], district: res[2], business_circle: res[3]}
      return data
    },
    setData() {
      let tip = ''
      this.type === 'circles' ? tip = '行业' : tip = '商家'
      if (this.name === '') {
        this.$refs.order.showContent(`${tip}名称不能为空`)
        return false
      }
      if (this.type === 'circles') {
        for (let i = 0; i < this.prams.length; i++) {
          if (this.prams[i] === '') {
            this.$refs.order.showContent(`${this.cityList[i].title}`)
            return false
          }
        }
        let data = this.infoData(this.prams)
        data = Object.assign({}, data, {name: this.name})
        addCircle(data).then((res) => {
          if (res.error === ERR_OK) {
            this.showList()
            this.hideShadeBox()
          } else {
            this.$refs.order.showContent(res.message)
          }
        })
        return false
      }
      if (this.insId === 0) {
        this.$refs.order.showContent('请选择所属行业')
        return false
      }
      let data = {parent_id: this.insId, name: this.name}
      indestryAdd(data).then((res) => {
        if (res.error === ERR_OK) {
          this.showList()
          this.hideShadeBox()
        }
      })
    },
    hideShadeBox() {
      this.$refs.order.hideShade()
    },
    showList() {
      let data = {page: this.page}
      if (this.type === 'circles') {
        circlesDetail(data).then((res) => {
          if (res.error === ERR_OK) {
            this.merchanList = res.data
          }
        })
        return false
      }
      industryDetail(data).then((res) => {
        if (res.error === ERR_OK) {
          this.industryList = res.data
        }
      })
    },
    showDetail() {
      this.name = ''
      for (let i = 0; i < this.prams.length; i++) {
        this.prams[i] = ''
      }
      this.insId = 0
      this.$refs.order.showShade()
      if (this.type === 'industry') {
        this.shadeTitle = '行业名称'
        this.cityList = JSON.parse(JSON.stringify(isIndustrieInfo))
        return false
      }
      this.shadeTitle = '商家名称'
      this.cityList = JSON.parse(JSON.stringify(cityInfo))
    },
    checkTap(index, value) {
      this.tapIndex = index
      this.type = value
      this.page = 1
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
  .form-box
    display :flex
    height: 100%
    flex-direction :column
    background :$color-background
    .money
      background :$color-white
      margin-bottom :24px
      height :170px
      display :flex
      position: relative
      &:before
        content: ''
        width :1px
        height :134px
        background: $color-icon-line
        all-center()
      .monry-item
        flex :1
        padding:0 60px 0 30px
        .monty-title
          color: $color-text
          font-size: $font-size-medium-x
          display :flex
          justify-content :space-between
          margin :33px 0 21px 0
          .unit
            color :$color-text-icon
        .money-detail
          color :$color-text-icon
          font-size: $font-money-size
          line-height: 60px
          font-weight :600
          font-family :'ZegoeUI-Bold'
    .form-list
      flex :1
      background :$color-white
      .list-header, .list-box
        display: flex
        align-items: center
        padding-left: 43px
      .list-header
        height: 14.5%
        border-bottom: 1px solid #979797
      .list
        height: 85.5%
        display: flex
        flex-direction: column
        .list-box
          height: 14.2857%
          border-bottom: 1px solid $color-icon-line
          .list-item
            line-height: 16px
            font-size: $font-size-medium
      .list-text
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
      .list-item
        color: $color-text
        flex: 2
        .showDetail
          cursor: pointer
          height: 25px
          font-size: $font-size-medium
          padding: 8px 18px
          color: $color-nomal
          border-radius: 3px
          border: 1px solid $color-nomal
        &:last-child
          flex :1.2

  .shade-box
    .shade-border
      border-bottom: 1px solid #DADADA
      font-size: $font-size-medium
      padding-left: 30px
      height: 50px
      line-height: 50px
      display: flex
      color: $color-text
      position: relative
      .shade-text:disabled
        background: $color-white
      .shade-text
        width: 52%
      .shade-title
        width: 112px
        no-wrap()
      &:first-child
        font-size: $font-size-medium-x
        height: 60px
        line-height: 60px
        position: relative
        .close
          cursor: pointer
          position: absolute
          col-center()
          right: 30px
          color: #979797
          font-size: 24px
    .ok
      height: 100px
      display: flex
      justify-content: center
      align-items: center
      .submit
        height: 40px
        width: 220px
        border-radius: 3px
        color: $color-white
        text-align: center
        line-height: 40px
        background: $color-nomal
.check-tip
  display :flex
  background :$color-white
  margin-bottom :24px
  height :90px
  align-items :center
  .tap-first
    margin-left :37.5px
    display :flex
    width:300px
    .tap-item
      font-size :$font-size-medium
      color:$color-text
      cursor: pointer
      line-height :20px
      margin-right :30px
      position: relative
      &:before
        row-center()
        bottom: -8px
        content: ''
        height: 3px
        width: 32px
        background: $color-white
    .tap-item-active
      &:before
        background: $color-nomal
  .selects
    display: flex
    font-size: $font-size-medium
    color: $color-text
    line-height: 30px
    transform: translateY(-1%)
    margin-left :50px
    .select-title
      no-wrap()
      font-size :$font-size-medium
      color :$color-text
    .select-box
      display: flex
      margin-left: 10px
      .select-item
        box-sizing: border-box
        width: 76px
        height: 30px
        line-height: 30px
        text-align center
        color: $color-text-icon
        border :1px solid $color-icon-line
        border-right: none
        &:first-child
          border-top-left-radius: 3px
          border-bottom-left-radius: 3px
        &:last-child
          border-top-right-radius: 3px
          border-bottom-right-radius: 3px
          border-right: 1px solid $color-icon-line
      .select-item-none
        border-left :none
      .select-item-active
        border: none
        background: $color-nomal
        color: $color-white
  .search
    height :30px
    margin-left :80px
    display :flex
    font-size :$font-size-medium
    .search-input
      height :100%
      border :1px solid $color-icon-line
      border-top-left-radius: 3px
      border-bottom-left-radius: 3px
      border-right:none
      width :154px
      padding-left :10px
      &::-webkit-input-placeholder
        color :$color-text-little
    .search-title
      width :60px
      height :100%
      text-align :center
      background :$color-nomal
      color :$color-white
      line-height: 30px
      border-top-right-radius: 3px
      border-bottom-right-radius: 3px
  .down-excel
    font-size :$font-size-medium
    height :30px
    line-height: 30px
    text-align :center
    margin-left :80px
    border-radius :3px
    background :$color-nomal
    color :$color-white
    width :108px
</style>
