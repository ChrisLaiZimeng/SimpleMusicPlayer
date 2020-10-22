<template>
  <div>
    <div id="navBar">
      <div class="side" @click="login">
        登录
      </div>

      <div class="mid">
        <div :class="{'activeText':mine}" @click="change(0,'/mainPage/mine')">
          我的
        </div>
        <div :class="{'activeText':find}" @click="change(1,'/mainPage/find')">
          发现
        </div>
        <div :class="{'activeText':friend}" @click="change(2,'/mainPage/friend')">
          朋友
        </div>
        <div :class="{'activeText':videos}" @click="change(3,'/mainPage/videos')">
          视频
        </div>
      </div>

      <div class="side" @click="search">
        搜索
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  data() {
    return{
      mine: false,
      find: true,
      friend: false,
      videos: false
    }
  },
  mounted() {
    if(this.$route.query.data){
      // console.log(this.$route.query.data)
      let data = JSON.parse(this.$route.query.data)
      this.mine = data.mine
      this.find = data.find
      this.friend = data.friend
      this.videos = data.videos
    }
  },
  methods: {
    login(){
      this.$router.push('/loginPage')
    },
    search(){
      this.$router.push('/searchPage')
    },
    change(index,route){
      switch(index){
        case 0:
          this.mine = true
          this.find = false
          this.friend = false
          this.videos = false
          break
        case 1:
          this.mine = false
          this.find = true
          this.friend = false
          this.videos = false
          break
        case 2:
          this.mine = false
          this.find = false
          this.friend = true
          this.videos = false
          break
        case 3:
          this.mine = false
          this.find = false
          this.friend = false
          this.videos = true
          break
      }
      let data = JSON.stringify({
        mine: this.mine,
        find: this.find,
        friend: this.friend,
        videos: this.videos
      })
      if(this.nowIndex!=index){
        this.$router.push({
          path: route,
          query: {data}
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #navBar{
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  }
  .side{
    width: 15%;
    display: flex;
    justify-content: center;
  }
  .mid{
    width: 70%;
    display: flex;
    justify-content: space-around;
    color: grey;
  }
  .mid div:hover, .side:hover{
    cursor: pointer;
  }
  .activeText{
    color: #000000;
  }
  a{
    text-decoration: none;
    color: grey;
  }
</style>
