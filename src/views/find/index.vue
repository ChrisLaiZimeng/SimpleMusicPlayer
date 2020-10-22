<template>
  <div id="find">
    <swiper></swiper>
    <icons></icons>
    <recommend></recommend>
    <newSong></newSong>
  </div>
</template>

<script>
import swiper from './component/swiper'
import icons from './component/icons'
import recommend from './component/recommend'
import newSong from './component/newSong'
export default {
  name: 'find',
  components: {
    swiper,
    icons,
    recommend,
    newSong
  }
}
</script>

<style scoped>
#find{
  position: relative;
}
</style>
