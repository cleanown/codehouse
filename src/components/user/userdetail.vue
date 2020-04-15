<template>
  <div class="home">
    <div class="header">
      <div class="head">
        <v-img class="head-img" src="../../assets/imgs/1.jpg" />
      </div>
    </div>

    <div class="info">456454
    </div>
  </div>
</template>

<script>
export default {
  name: 'userdetail',
  data () {
    return {
      userinfo: {
        username: 'cleanown',
        password: '12345678'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  margin-top: 56px;
  width: 100%;
  .header{
    display: flex;
    justify-content: center;
    width: 100%;
    background: url('https://cdn.vuetifyjs.com/images/parallax/material.jpg');
    background-size: 100% 100%;
    .head{
      margin: 10px;
      width: 30%;
      .head-img{
        border-radius: 50%;
        box-shadow: 3px 3px 3px #000;
        width: 100%;
      }
    }
  }
  .info{
    padding: 10px;
    width: 100%;
  }
}
</style>
