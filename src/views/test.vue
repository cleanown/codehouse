<template>
  <div class="home">
    <div class="box">
      <input type="file" class="inputf">
    </div>

    <div class="test">
      <div class="test-item">
        <v-img aspect-ratio="1" src="../assets/a1.png" />
      </div>
      <div class="test-item" v-for="(item, index) in imgList" :key="index">
        <v-img aspect-ratio="1" :src="item.imgUrl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      imgList: [{
        imgUrl: require('../assets/a2.png')
      }, {
        imgUrl: require('../assets/a2.png')
      }, {
        imgUrl: require('../assets/a2.png')
      }, {
        imgUrl: require('../assets/a2.png')
      }, {
        imgUrl: require('../assets/a2.png')
      }, {
        imgUrl: require('../assets/a2.png')
      }, {
        imgUrl: require('../assets/a2.png')
      }, {
        imgUrl: require('../assets/a2.png')
      }, {
        imgUrl: require('../assets/a2.png')
      }]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  padding: 20px;
  .box{
    position: relative;
    width: 100px;
    height: 100px;
    background: url('../assets/add.png');
    background-size: 100% 100%;
    .inputf{
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
    }
  }
  .test{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background: #eee;
    .test-item{
      width: 31%;
      height: 31%;
      margin: 2px;
      background: #eee;
    }
  }
}
</style>
