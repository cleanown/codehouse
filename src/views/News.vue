<template>
  <div class="home">
    <div>这是个人新闻页</div>
    <v-bottom-navigation
      v-model="bottomNav"
      class="nav"
      grow
      app
      color="deep-purple"
    >
      <v-btn value="search">
        <span>搜索</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn value="news">
        <span>新闻</span>
        <v-icon>mdi-newspaper</v-icon>
      </v-btn>

      <v-btn value="user">
        <span>个人中心</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>

export default {
  name: 'news',
  data () {
    return {
      bottomNav: 'news'
    }
  },
  watch: {
    bottomNav (val, oldVal) {
      this.$router.push({
        name: val
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.nav{
  align-items: center;
}
</style>
