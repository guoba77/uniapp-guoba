<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subPkg/goods_details/goods_details?goods_id='+item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
      <view  class="nav_list">
        <view @click="navClickHandle(item.name)" v-for="(item,index) in navList" :key="index">
          <image class="nav_item" :src="item.image_src" mode=""></image>
        </view>
      </view>
      <view  class="floor_list">
     <view class="floor_item" v-for="(item,index) in FloorList" :key="index">
       <image class="floor_title" :src="item.floor_title.image_src" mode=""></image>
       <view class="floor_content">
         <navigator class="left" :url="item.product_list[0].url">
           <image :src=" item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
         </navigator>
         <view class="right" >
           <navigator :url="item2.url" class="imgitem" v-for="(item2,index2) in  item.product_list" :key="index2" v-if="index2!==0">
             <image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}"  mode="widthFix"></image>
           </navigator>
         </view>
       </view>
     </view>
   </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        navList:[],
        FloorList:[]
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods:{
      // 获取楼层列表
     async getFloorList(){
        const {data:res}= await uni.$myRequest({
          method:'get',
          url:'/api/public/v1/home/floordata'
        })
        res.message.forEach((item,index)=>{
          item.product_list.forEach((prod,index)=>{
            prod.url= '/subPkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
          })
        })
        this.FloorList=res.message
        // console.log(res.message);
        
      },
      // 去往导航页面
      navClickHandle(name){
        if(name==='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      // 获取导航数据
        async getNavList(){
        const {data:res}= await uni.$myRequest({
          method:'get',
          url:'/api/public/v1/home/catitems'
        })
         this.navList=res.message
      },
       // 获取轮播图列表
      async getSwiperList(){
       const {data:res} =await uni.$myRequest({
         method:'get',
         url:'/api/public/v1/home/swiperdata'
       })
     
       if(res.meta.status!==200){
        return uni.$showMsg()
       }
       this.swiperList = res.message
       uni.$showMsg('数据请求成功',1500)
       } 
    }
  }
</script>

<style lang="scss">
  .floor_list{
    .floor_title {
      height: 60rpx;
      width: 100%;
      display: flex;
    }
    .floor_content{
          display: flex;
          padding-left: 10rpx;
      .right{
         display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
      }
    }
  }
swiper{
  height: 330rpx;
  .swiper-item,image{
    width: 100%;
    height: 100%;
  }
}
.nav_list{
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav_item{
    width: 128rpx;
    height: 140rpx;
  }
}
</style>
