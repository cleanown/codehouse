<template>
  <div class="home">
    <div>{{data1}}</div>
    <div>{{data2}}</div>
    <div>{{data3}}</div>
    <div>{{data4}}</div>
    <div>{{data5}}</div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      data1: new Date().toISOString().substr(0, 10),
      data2: '',
      data3: new Date().getTime(),
      data4: new Date(),
      data5: ''
    }
  },
  mounted () {
    this.datachage()
  },
  methods: {
    datachage () {
      this.data2 = this.$moment(this.data1)
      this.data5 = this.data4.getTime()
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  padding: 20px;
  overflow: hidden;
}
</style>
