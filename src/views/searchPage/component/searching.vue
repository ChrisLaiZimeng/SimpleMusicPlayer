<template>
  <div id="searching">
    <div class="side" @click="goBack"> &lt;</div>
    <div class="searchInput">
      <div class="content"><input type="text" v-model="searchText" autofocus ref="inp" :placeholder="textHold"/></div>
      <div class="delete" @click="deleteAll" v-show="showDelete"><span>X</span></div>
    </div>
    <div class="side">go</div>
  </div>
</template>

<script>
import api from '../../../../api/index'
export default{
  name: 'searching',
  created() {
    this._getTextHolder()
  },
  data(){
    return{
      searchText:'',
      showDelete: false,
      textHold: ''
    }
  },
  methods:{
    deleteAll(){
      this.searchText = ''
      this.$refs.inp.focus()
    },
    goBack(){
      this.$router.push('/mainPage/find')
    },
    _getTextHolder(){
      api.defaultSearchFn()
        .then(res => {
          const data = res.data
          if(data.code===200){
            this.textHold = data.data.showKeyword
          }
        })
    }
  },
  watch:{
    searchText(value){
      this.showDelete = (value!=='')
    }
  }
}
</script>

<style scoped>
#searching{
  width: 100%;
  display: flex;
  margin: 1em 0;
}
.side{
  width: 10%;
  margin: 0 1%;
  display: flex;
  justify-content: center;
}
.searchInput{
  width: 76%;
  border-bottom: 2px solid grey;
  display: flex;
  justify-content: space-between;
}
.searchInput .content{
  width: 95%;
}
.searchInput .delete{
  width: 5%;
}
.searchInput .content input{
  font-size: 1.2em;
  outline: none;
  height: 1.2em;
  border: none;
  width: 96%;
}
.side:hover{
  cursor: pointer;
}
.delete:hover{
  cursor: pointer;
}
</style>
