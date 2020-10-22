<template>
  <div id="icons">
    <div class="part" v-for="(item, index) in findIcons" :key="index">
      <div class="circle"></div>
      <p>{{item.text}}</p>
    </div>
  </div>
</template>

<script>
import api from '../../../../api/index'
import { mapState } from 'vuex'
export default{
  name:'icons',
  data(){
    return {
      findIcons: []
    }
  },
  methods:{
  },
  created() {
    this.findIcons = this.$store.state.findIcons
  }
}
</script>

<style scoped>
  #icons{
    position: relative;
    margin: 2em 5%;
    width: 90%;
    display: flex;
    justify-content: space-around;
  }
  .part{
    width: 15%;
    text-align: center;
    font-size: 1em;
  }
  @media (max-width:480px) {
    .part{
      font-size: 0.6em;
    }
  }
  .circle{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 50%;
    background-color: #e22738;
  }
  .part p{
    margin: .5em 0;
  }
</style>
