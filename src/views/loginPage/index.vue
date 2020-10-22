<template>
  <div>
    <div class="top" @click="goBack">&lt;</div>
    <div id="loginPage">
      <div>
        <div id="btn" @click="goPhone">验证码登录</div>
        <div id="btn" @click="goPwd">账号密码登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginPage',
  methods: {
    goBack () {
      this.$router.push('/mainPage/find')
    },
    goPhone () {
      this.$router.push('/phone')
    },
    goPwd () {
      this.$router.push('/pwd')
    }
  }
}
</script>

<style scoped>
  .top{
    background-color: #7ed48b;
    font-size: 1.8em;
    color: white;
    padding: 3% 5% 0 5%;
    height: 1vh;
  }
  .top:hover{
    cursor: pointer;
  }
  #loginPage{
    margin: 0;
    padding: 0;
    background-color: #7ed48b;
    height: 99vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #btn{
    background-color: white;
    border: 1px solid #1B6D85;
    border-radius: 8px;
    font-size: 1em;
    margin: 2em;
    padding: 1em;
    text-align: center;
  }
  #btn:hover{
    cursor: pointer;
  }
</style>
