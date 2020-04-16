<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import config from './request/config'
export default {
  name: 'App',

  data: () => ({
    //
  }),

  mounted () {
    if (window.localStorage.getItem('token')) {
      this.getUserInfo()
    }
  },
  methods: {
    async getUserInfo () {
      const url = `${config.online}/user/userinfo`
      const res = await this.$http.get(url)
      if (res.data.code === 200) {
        this.$store.commit('userinfo', (res.data.data))
      } else {
        this.snackbar = true
        this.text = res.data.msg
        this.login = true
      }
    }
  }
}
</script>
