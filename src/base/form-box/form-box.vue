<template>
  <div class="form-box">
    <div class="tag">
      <div class="tag-title">
        <span class="title-item">商家管理</span>
        <span class="title-item">/ 商家管理</span>
      </div>
      <div class="tag-choice">
        <div class="tag-time">
          <span class="time-title" v-for="(item, index) in timeList" :key="index" :class="{'time-title-active': TimeIndex === index}" @click="checkTime(index,item.type)">{{item.title}}</span>
        </div>
        <div class="tag-city">
          <span class="city-title">{{cityList[0].title}}</span>
          <div class="city-select" v-for="(item, index) in cityList[0].data" :key="index">
            <div class="city-show">
              {{item.title}}
              <div class="city-tap">
                <span class="city-tap-top"></span>
              </div>
            </div>
            <ul class="city-box"  >
              <li class="city-box-item" v-for="(idx, items) in item.data" :key="idx">湖南省</li>
              <li class="city-box-item">湖北省</li>
              <li class="city-box-item">湖北省</li>
            </ul>
          </div>
        </div>
        <div class="tag-industry">
          <span class="city-title">行业筛选</span>
          <div class="city-select">
            <div class="city-show">
              美业
              <div class="city-tap">
                <span class="city-tap-top"></span>
              </div>
            </div>
            <ul class="city-box" style="display: none">
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="data">
      <div class="data-content">
        <div class="data-detail">
          <slot name="form-list"></slot>
        </div>
        <div class="total">
          <div>每页{{pageDtail[0].per_page}}条，共{{pageDtail[0].total}}条数据</div>
          <div class="page">
            <div class="page-icon" @click="subtract">
            </div>
            <div class="pade-detail">{{page}}/{{pageDtail[0].total_page}}</div>
            <div class="page-icon page-icon-two"  @click="addPage">
            </div>
            <div class="border-page page-total">
              {{page}}/{{pageDtail[0].total_page}}
              <span class="page-tap">
                <i class="page-top"></i>
              </span>
              <ul class="page-list" v-show="pageDetail">
                <li class="page-item">1/20</li>
                <li class="page-item">1/20</li>
                <li class="page-item">1/20</li>
              </ul>
            </div>
            <input type="text" class="border-page"/>
            <div class="border-page">跳转</div>
          </div>
        </div>
      </div>
      <div class="shade-win" @click.stop="hideShade" v-show="isShade">
        <div class="shade-detail" @click.stop>
          <slot name="shade-box"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {businessCircle} from 'api/globals'
export default {
  props: {
    timeList: {
      type: Array,
      default: () => [{title: '今天', type: '1'}, {title: '昨天', type: '-1'}, {title: '7天', type: '7'}, {title: '30天', type: '30'}, {title: '自定义', type: ''}]
    },
    cityList: {
      type: Array,
      default: () => [{title: '地域筛选', data: [{title: '请选择', type: 'province', data: []}, {title: '请选择', type: 'city', data: []}, {title: '请选择', type: 'city', data: []}, {title: '请选择', data: []}]}]
    },
    pageDtail: {
      type: Array,
      default: () => [{total: 1, per_page: 10, total_page: 1}]
    }
  },
  data() {
    return {
      TimeIndex: 0,
      isShade: false,
      page: 1,
      pageDetail: false,
      cityType: 'province'
    }
  },
  created() {
    this.showCity()
  },
  methods: {
    showCity() {
      businessCircle().then((res) => {
        if (this.cityType === 'province') {
          this.cityList[0].data[0] = res.data.filter.province
        }
        console.log(this.cityList[0].data[0])
      })
    },
    checkCity(type) {
      console.log(type)
    },
    checkTime(index, type) {
      this.TimeIndex = index
      this.page = 1
      this.$emit('checkTime', type, this.page)
    },
    showShade() {
      this.isShade = true
    },
    hideShade() {
      this.isShade = false
    },
    addPage() {
      if (this.page < this.pageDtail[0].total_page) {
        this.page++
        this.$emit('addPage', this.page)
      }
    },
    subtract() {
      if (this.page > 1) {
        this.page--
        this.$emit('addPage', this.page)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .form-box
    height: 100%
    display: flex
    flex-direction: column
    .tag
      background: $color-white
      flex: 1.7
      .tag-title
        line-height: 88px
        font-size: $font-size-large
        color: $color-text-little
        text-indent: 41px
        position: relative
        &:before
          content: ''
          col-center()
          background: $color-nomal
          height: 20px
          width: 6px
          left: 25px
        .title-item
          margin-left: 7px
          &:last-child
            color: $color-text
      .tag-choice
        display: flex
        .tag-time
          padding-left: 10px
          .time-title
            cursor: pointer
            display: inline-block
            position: relative
            margin-left :30px
            padding-bottom :10px
            font-size: $font-size-medium
            color: $color-text
            &:before
              row-center()
              bottom: 0px
              content: ''
              height: 3px
              width: 32px
              background: $color-white
          .time-title-active
            &:before
              background: $color-nomal
      .tag-city, .tag-industry
        display: flex
        margin-left: 80px
        font-size: $font-size-medium
        color: $color-text
        .city-title
          no-wrap()
        .city-select
          cursor: pointer
          height: 30px
          margin-left: 10px
          border: 1px solid $color-icon-line
          border-radius: 3px
          font-size: $font-size-medium
          color: $color-text-little
          transform: translateY(-25%)
          .city-show
            padding: 8px 49px 8px 10px
            no-wrap()
            .city-tap
              position: absolute
              right: 0
              top: 0
              height: 100%
              width: 24px
              border-left: 1px solid $color-icon-line
              .city-tap-top
                height: 0
                border: 6px solid $color-text-little
                border-bottom: 6px solid transparent
                border-left: 6px solid transparent
                border-right: 6px solid transparent
                row-center()
                top: 42%
              .city-tap-top-two
                height: 0
                border: 6px solid $color-text
                border-bottom: 6px solid transparent
                border-left: 6px solid transparent
                border-right: 6px solid transparent
                row-center()
                top: 42%
              .city-tap-bottom
                height: 0
                border: 6px solid $color-text
                border-top: 6px solid transparent
                border-left: 6px solid transparent
                border-right: 6px solid transparent
                row-center()
                top: 24%
          .city-box
            width: 100%
            border-radius: 3px
            box-shadow: 0 1px 5px 0 rgba(12, 6, 14, 0.20)
            background: $color-white
            position: relative
            z-index: 100
            margin-top: 4px
            padding: 13px 0
            .city-box-item
              text-align: center
              height: 26px
              line-height: 26px
              font-size: $font-size-medium
            .city-box-item-active
              background: $color-big-background
        .city-select-active
          color: $color-text
    .data
      flex: 9
      min-height :600px
      padding: 25px
      position: relative
      z-index :1
      .data-content
        height: 100%
        width: 100%
        background: $color-white
        display: flex
        flex-direction: column
        .data-detail
          height :92.4%
        .total
          width: 100%
          height: 7.6%
          display: flex
          align-items: center
          justify-content :space-between
          padding:0 15px 0 30px
          color: $color-text
          font-size: $font-size-medium
          .page
            display :flex
            align-items :center
            .pade-detail
              margin-right :10px
            .page-icon
              cursor: pointer
              bg-image('icon-before')
              background-size :cover
              margin-right :10px
              height :25px
              width :25px
            .page-icon-two
              bg-image('icon-later')
            .border-page
              display :flex
              align-items :center
              border-radius :3px
              margin-right :10px
              border :1px solid $color-icon-line
              font-size :$font-size-medium
            div.border-page
              padding : 0 15px
              height :25px
              line-height: 25px
            div.page-total
              padding-right :33px
              position: relative
              .page-tap
                position: absolute
                right: 0
                top: 0
                height :23px
                display :inline-block
                width :18px
                border-left :1px solid $color-icon-line
                .page-top
                  row-center()
                  top: 42%
                  display :inline-block
                  height :0
                  border :5px solid $color-text
                  border-bottom :5px solid transparent
                  border-left :5px solid transparent
                  border-right :5px solid transparent
                .page-bottom
                  row-center()
                  top: 11%
                  display :inline-block
                  height :0
                  border :5px solid $color-text
                  border-top :5px solid transparent
                  border-left :5px solid transparent
                  border-right :5px solid transparent
              .page-list
                position: absolute
                width :100%
                left: 0
                box-shadow: 0 1px 5px 0 rgba(12,6,14,0.20)
                text-align :center
                background :$color-white
                border-radius :3px
                bottom: 30px
                font-size :$font-size-medium
                color : $color-text-little
                .page-item
                  height: 29px
                  line-height: 29px
                .page-item-active
                  background: $color-big-background
            input.border-page
              height :25px
              width :39px
              text-align :center
      .shade-win
        height :100%
        width :100%
        background: rgba(50,50,58,0.60)
        position: absolute
        top: 0
        left: 0
        .shade-detail
          all-center()
          box-shadow: 0 0 5px 0 rgba(12,6,14,0.60)
          border-radius :3px
          background :$color-white
          width :33.25%
          min-height :50px
</style>
