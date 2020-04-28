<template>
  <div class="home">
    <div>{{arr}}</div>
    <div>{{arrs}}</div>
    <v-btn @click="testClick">测试</v-btn>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      arr: [5, 6, 1, 3, 9, 4, 2],
      arrs: []
    }
  },
  watch: {
  },
  methods: {
    testClick () {
      this.arrs = this.arr.sort().reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  padding: 20px;
}
</style>
