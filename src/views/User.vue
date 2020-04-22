<template>
  <div class="home">
    <v-app-bar
      color="deep-purple"
      dark
      class="header"
    >
      <v-icon style="margin-right: 10px">mdi-account</v-icon>
      <v-toolbar-title>个人中心</v-toolbar-title>
    </v-app-bar>

    <myuser />

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
        <v-icon>mdi-clipboard-plus-outline</v-icon>
      </v-btn>

      <v-btn value="user" icon>
        <span>个人中心</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-snackbar
      v-model="snackbar"
      top
      :timeout="timeout"
      class='tips'
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import config from '../request/config'
import myuser from '../components/user/myuser'
export default {
  name: 'User',
  components: {
    myuser
  },
  data () {
    return {
      bottomNav: 'user',
      username: '',
      headimg: '',
      snackbar: false,
      text: '',
      timeout: 2000
    }
  },
  watch: {
    bottomNav (val, oldVal) {
      this.$router.push({
        name: val
      })
    }
  },
  async created () {
    // const url = 'http://127.0.0.1:3000/user/userinfo'
    const url = `${config.online}/user/userinfo`
    const res = await this.$http.get(url)
    if (res.data.code === 200) {
      this.$store.commit('userinfo', (res.data.data))
      console.log(res.data.msg)
    } else {
      this.snackbar = true
      this.text = res.data.msg
      this.login = true
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
  position: fixed;
  z-index: 3;
}
.nav{
  align-items: center;
}
</style>
