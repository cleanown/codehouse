<template>
  <div class="home">
    <search-area />
    <v-bottom-navigation
      v-model="bottomNav"
      class="nav"
      grow
      app
      color="deep-purple"
    >
      <v-btn value="search" icon>
        <span>搜索</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn value="release" icon>
        <span>发布</span>
        <v-icon>mdi-newspaper</v-icon>
      </v-btn>

      <v-btn value="user" icon>
        <span>个人中心</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import SearchArea from '../components/search/search'
export default {
  name: 'Home',
  data () {
    return {
      bottomNav: 'search'
    }
  },
  components: {
    SearchArea
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
