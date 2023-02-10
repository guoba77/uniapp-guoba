<template>
  <view>
    <view class="scroll-veiw-container">
      <scroll-view class="scroll-veiw-left" scroll-y="true" :style="{height:windowHeight+'px'}" >
        <block v-for="(item, i) in cateList" :key="i">
          <view @click="changTab(i)" :class="['scroll-veiw-left-item',i===active?'active':'']">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <scroll-view class="scroll-veiw-right" :scroll-top="scrollTop" scroll-y="true" :style="{height:windowHeight+'px'}" >
        <block v-for="(item,index) in cateLevel2" :key="index">
          <view class="scroll-veiw-right-title">
              /{{item.cat_name}}/
            </view>
          <view class="scroll-veiw-right-item">
                <view class="cld"  v-for="(cld,index2) in item.children" :key="index2">
                  <!-- 图片 -->
                    <image :src="cld.cat_icon"></image>
                    <!-- 文本 -->
                    <text>{{cld.cat_name}}</text>
                </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        scrollTop: 0,
        active:0,
        windowHeight:0,
        cateList:[],
        cateLevel2: []
      };
    },
    onLoad(){
      // console.log(uni.getSystemInfoSync().windowHeight);
     this.windowHeight = uni.getSystemInfoSync().windowHeight
     this.getCateList()
    },
    methods:{
      // 改变左边Tab栏
      changTab(i){
        this.active=i
        this.cateLevel2=this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 0.000000001 : 0
      },
     async getCateList(){
        const {data:res}= await uni.$myRequest({
          method:'get',
          url:'/api/public/v1/categories'
        })
        console.log(res);
        this.cateList=res.message
        this.cateLevel2 = res.message[0].children
      }
    }
  }
</script>

<style lang="scss">
.scroll-veiw-container{
  display: flex;
  .scroll-veiw-left{
    width: 120px;
    .scroll-veiw-left-item{
      background-color: #F7F7F7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active{
        background-color: #FFFFFF;
        position: relative;
        &::before{
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .scroll-veiw-right{
    .scroll-veiw-right-title{
        margin-top: 10px;
        text-align: center;
        width: 100%;
        font-size: 12px;
        font-weight: bold;

    }
    .scroll-veiw-right-item{
      display: flex;
      flex-wrap: wrap;
      .cld{
          width: 33.33%;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
              image {
                width: 60px;
                height: 60px;
              }
          
              text {
                font-size: 12px;
              }
      }
    }
  }
}
    
</style>
