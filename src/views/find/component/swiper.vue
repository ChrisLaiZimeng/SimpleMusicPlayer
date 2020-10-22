<template>
  <div class="container">
    <div class="imgContainer"
    v-for="(item, index) in swiperList"
    :key="index" :style="{'right':pos}">
      <img :src="item.pic">
    </div>
  </div>
</template>

<script>
import api from '../../../../api/index'
export default{
  name: 'swiper',
  data() {
    return{
      swiperList:[],
      nowBanner:0,
      op:[],
      pos:'100%'
    }
  },
  methods: {
    _getFindInfo () {
      api.bannerSwiperFn()
        .then(this.getFindInfoSuc)
    },
    getFindInfoSuc (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        res = res.data.banners
        this.swiperList = res
        this.swiperList.unshift(res[res.length-1])
      }
    },
    changeBanner(){
      let timer = setInterval(()=>{
        let num = parseFloat(this.pos.substring(0,this.pos.length-1))
        if(num%100 === 0){
          if(num===(this.swiperList.length-1)*100){
            this.pos = '0%'
          }
          clearInterval(timer)
          return
        }
        let now = num+5
        this.pos = now+'%'
      },20)
    }
  },
  created () {
    this._getFindInfo()
  },
  mounted() {
    setInterval(()=>{
      let num = parseFloat(this.pos.substring(0,this.pos.length-1))
      this.pos = (num+5)+'%'
      this.changeBanner()
    },5000)
  }
}
</script>

<style scoped>
.container{
  width: 90%;
  margin: 0 5%;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
}
.imgContainer{
  width: 100%;
  flex-shrink: 0;
  position: relative;
  right: 100%;
  border-radius: 8px;
}
img{
  max-width: 100%;
  display: block;
  border-radius: 8px;
}
</style>
