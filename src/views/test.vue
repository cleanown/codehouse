<template>
  <div class="home">
    <h3>本地时间：</h3>
    <div>{{data1}}</div>
    <h3>本地时间getTime()：</h3>
    <div>{{data2}}</div>
    <h3>toISOString时间：</h3>
    <div>{{data3}}</div>
    <h3>toISOString时间 -> 本地时间：</h3>
    <div>{{data4}}</div>
    <h3>toISOString时间 -> 本地时间 -> getTime：</h3>
    <div>{{data5}}</div>
    <v-btn
      color="success"
      @click="datachage"
    >
      测试
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      data1: new Date(),
      data2: new Date().getTime(),
      data3: new Date().toISOString().substr(0, 10),
      data4: '',
      data5: ''
    }
  },
  methods: {
    datachage () {
      this.data4 = this.$moment(this.data3)
      this.data5 = new Date(new Date().toISOString().substr(0, 10)).getTime()
      console.log(this.data4)
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  padding: 20px;
  overflow: hidden;
  h3{
    color: blue;
  }
}
</style>
