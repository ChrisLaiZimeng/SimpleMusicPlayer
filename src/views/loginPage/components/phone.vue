<template>
  <div id="phone">
    <div>
      <div class="part">
        <div>手 机 号 :</div>
        <div class="getNumber">
          <input type="text" v-model="number"/>
          <button @click="getCode()" :disabled="canSend">{{sendCode}}</button>
        </div>
        <p class="warning">{{warnNumber}}</p>
      </div>
      <div class="part">
        <div>验 证 码 :</div>
        <input type="text" class="verify" v-model="verifyCode"/>
        <p class="warning">{{wrongCode}}</p>
      </div>
      <div id="login" class="part">
        <button @click="verify()">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../api/index'
export default {
  name: 'phone',
  data () {
    return {
      number: '',
      verifyCode: '',
      wrongCode: '',
      regi: false,
      warnNumber: '',
      sendCode: '获取验证码',
      canSend: false
    }
  },
  mounted () {
    if (sessionStorage.getItem('account')) {
      this.number = sessionStorage.getItem('account')
    }
  },
  watch: {
    number (val) {
      let check = this.checkNumber(val)
      if (check || this.number.length === 0) {
        if (this.number.length === 11) {
          this._registered()
          setTimeout(() => {}, 2000)
          if (!this.regi) {
            this.warnNumber = '账号未注册, 即将注册并登录'
          }
          this.warnNumber = ''
        }
      } else {
        this.warnNumber = '请输入正确的手机号码'
      }
    }
  },
  methods: {
    checkNumber(val){
      let reg = /^1[345678]\d{9}$/
      let check = reg.test(val)
      return check
    },
    getCode () {
      if(this.checkNumber(this.number)){
        api.sendVerifyFn(this.number).then(response => {
            console.log('发送验证码')
        })
        let sec = 59
        this.canSend = true
        let id = setInterval(() => {
          this.sendCode = `${sec}s后重新发送`
          if (sec === 0) {
            clearInterval(id)
            this.canSend = false
            this.sendCode = '获取验证码'
          }
          sec--
        }, 1000)
      }
    },
    verify () {
      api.verifyFn(this.number, this.verifyCode)
        .then(res => {
          console.log(res)
          const data = res.data
          if (data.code === 200) {
            console.log('验证成功')
            this.$store.state.loginState = true
            console.log(data)
            // sessionStorage.setItem('account', this.number)
            // sessionStorage.setItem('nickName', response.profile.nickname)
            this.success()
          } else {
            console.log('验证失败')
          }
        })
    },
    success () {
      this.$store.state.login = true
    },
    _registered () {
      api.phoneRegisteredFn(this.number)
        .then(response => {
          // console.log(response)
          if (response.data.exist === 1) {
            this.regi = true
          } else if (response.data.exist === -1) {
            this.regi = false
          }
        })
    },
    goToRegister () {
      if (this.warnNumber === '账号未注册, 前往使用验证码注册并登录') {
        this.$router.push('phone')
      }
    }
  }
}
</script>

<style scoped>
  input{
    border: none;
    outline: none;
    border-radius: 8px;
  }
  #phone{
    margin: 0;
    padding: 0;
    background-color: #7ed48b;
    height: 100vh;
    font-size: 1.1em;
    display: flex;
    align-items: center;
  }
  #phone>div{
    width: 100%;
  }
  .part{
    margin: 0 15%;
    width: 70%;
  }
  .getNumber{
    background-color: white;
    border-radius: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .getNumber input{
    width: 54%;
    padding: 2% 3%;
  }
  .getNumber button{
    width: 34%;
    margin: 2% 3%;
    font-size: .7em;
    background-color: white;
    border: 1px solid grey;
    border-radius: 5px;
    outline: none;
  }
  .getNumber button:hover{
    cursor: pointer;
  }
  .part .verify{
    width: 94%;
    padding: 2% 3%;
  }
  #login{
    display: flex;
    justify-content: center;
  }
  #login button{
    border: none;
    background-color: white;
    padding: .5em 2em;
    border-radius: 8px;
    outline: none;
  }
  #login button:hover{
    cursor: pointer;
    background-color: coral;
    color: white;
  }
  .warning{
    font-size: .8em;
  }
</style>
