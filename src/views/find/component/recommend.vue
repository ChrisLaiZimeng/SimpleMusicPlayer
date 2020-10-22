<template>
  <div id="recommend">
    <div class="bold">推荐歌单</div>
    <div class="pics">
      <div
      v-for="(item, index) in showList"
      :key="index" class="part">
        <img :src="item.coverImgUrl" />
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../api/index'
export default{
  name:'recommend',
  data (){
    return{
      allList: [],
      showList: [],
      idStart: 0
    }
  },
  methods:{
    _getRecommendList(){
      api.recSongListFn()
        .then(res=>{
          const data = res.data
          if(data.code === 200){
            this.allList = data.playlists
            this.showList = this.allList.splice(0,6)
          }
        })
    },
    changeShowList(){
      // console.log(this.showList)
      this.showList = this.allList.slice(this.idStart,this.idStart+6)
    }
  },
  created() {
    this._getRecommendList()
    this.changeShowList()
  },
  mounted() {
    setInterval(()=>{
      if(this.idStart === (this.allList.length-6)){
        this.idStart = 0
      } else {
        this.idStart+=6
      }
      this.changeShowList()
    },8000)
  }
}
</script>

<style scoped>
#recommend{
  margin: 0 5%;
}
.pics{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.pics .part{
  width: 28%;
  margin: 2% 0;
  border-radius: 8px;
  font-size: 1em;
}
.part img{
  display: block;
  max-width: 100%;
  border-radius: 8px;
}
.part p{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: justify;
}
.bold{
  font-weight: bold;
  font-size: 1.2em;
}
</style>
