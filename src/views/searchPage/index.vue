<template>
  <div class="searchPage">
    <searching></searching>
    <hot-search></hot-search>
  </div>
</template>

<script>
import searching from './component/searching.vue'
import hotSearch from './component/hotSearch'
export default {
  name: 'searchPage',
  components:{
    hotSearch,
    searching
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
