<template>
  <div class="home">
    <div class="box">
      <input type="file" class="inputf">
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
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
    background: burlywood;
    .inputf{
      width: 100%;
      height: 100%;
      display: none;
      position: absolute;
    }
  }
}
</style>
