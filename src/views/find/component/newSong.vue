<template>
  <div id="recommend">
    <div class="types">
      <span :class="{'bold':type===0}" @click="changeType">新碟</span>
      <span> | </span>
      <span :class="{'bold':type===1}" @click="changeType">新歌</span>
    </div>
    <div class="pics" v-if="type===0">
      <div
      v-for="(item, index) in showList"
      :key="index" class="part">
        <img :src="item.picUrl" />
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="pics" v-else>
      <div
      v-for="(item, index) in showList"
      :key="index" class="part">
        <img :src="item.album.picUrl" />
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../api/index'
export default{
  name:'newSong',
  data (){
    return{
      dishList: [],
      songList: [],
      showList: [],
      idStart: 0,
      type: 0,
      timer: ''
    }
  },
  methods:{
    changeType(){
      this.idStart = 0
      if(this.type===0){
        this.type = 1
        this.showList = this.songList.slice(0,3)
      } else{
        this.type = 0
        this.showList = this.dishList.slice(0,3)
      }
    },
    _getNewDish(){
      api.newDishFn().then(res=>{
        const data = res.data
        if(data.code === 200){
          this.dishList = data.albums.slice(0,parseInt(data.albums.length/3)*3)
          this.showList = this.dishList.slice(this.idStart,this.idStart+3)
        }
      })
    },
    _getNewSong(){
      api.newSongsFn().then(res=>{
        const data = res.data
        if(data.code === 200){
          this.songList = data.data.slice(0,parseInt(data.data.length/3)*3)
        }
      })
    },
    changeShowList(){
      this.idStart += 3
      if(this.type === 0){
        if(this.idStart === this.dishList.length){
          this.idStart = 0
        }
        this.showList = this.dishList.slice(this.idStart,this.idStart+3)
      } else {
        if(this.idStart === this.songList.length){
          this.idStart = 0
        }
        this.showList = this.songList.slice(this.idStart,this.idStart+3)
      }
    }
  },
  created() {
    this._getNewDish()
    this._getNewSong()
  },
  mounted() {
    let timer = setInterval(()=>{
      this.changeShowList(timer)
    },8000)
  }
}
</script>

<style scoped>
#recommend{
  margin: 5%;
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
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: center;
}
.types{
  font-size: 1em;
  color: gray;
}
.types:hover{
  cursor: pointer;
}
.bold{
  font-weight: bold;
  font-size: 1.2em;
  color: #000000;
}
</style>
