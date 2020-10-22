<template>
  <div id="hotSearch">
    <p class="title">热搜榜</p>
    <div class="hot-search-list">
      <div v-for="(item, index) in hotList" :key="index">
        <span class="title" :class="{'topThree':index===0 || index===1 || index === 2}">{{index+1}}</span>
        &nbsp;&nbsp;
        <span class="title">{{item.searchWord}}</span>
        &nbsp;&nbsp;
        <span class="mini topThree" v-if="index===0 || index===1 || index === 2">HOT</span>
        <p>{{item.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../api/index'
export default{
  name: 'hotSearch',
  data(){
    return {
      hotList: []
    }
  },
  methods:{
    _getList(){
      api.hotSearchListFn()
        .then(res => {
          if(res.data.code === 200){
             this.hotList = res.data.data
          }
        })
    }
  },
  created() {
    this._getList()
  }
}
</script>

<style scoped>
 #hotSearch{
   padding: 2em;
 }
.title{
  font-size: 1.2em;
}
.mini{
  font-size: 0.6em;
  font-weight: bold;
}
.topThree{
  color: red;
}
</style>
