<template>
  <div>
    <van-overlay :show="loading" @click="loading=false">
      <div class="wrapper_loading" @click.stop>
        <img :src="require('../assets/20200131145508.gif')" alt />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { Overlay } from 'vant';
export default {
  components: {
    [Overlay.name]: Overlay,
  },
  props:{
      loading:Boolean
  }
}
</script>
<style lang="scss">
.van-overlay {
  height: 100vh;
  display: table;
}
.wrapper_loading {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.wrapper_loading img {
  width: 1rem;
  height: 1rem;
}
</style>