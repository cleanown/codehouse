<template>
  <div class="home">
    <div>{{imgList}}</div>
    <v-text-field
      v-model="test"
    ></v-text-field>
    <v-btn color="success" @click="ck">提交</v-btn>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      imgList: [1, 2, 3, 4, 5, 6],
      test: null
    }
  },
  watch: {
    test (val) {
      console.log(val)
    }
  },
  methods: {
    ck () {
      this.test = this.test.replace(/[^\d]/g, '')
      this.imgList.push(this.test)
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
