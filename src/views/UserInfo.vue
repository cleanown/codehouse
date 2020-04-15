<template>
  <div>
    <v-app-bar
      color="deep-purple"
      dark
      class="header"
    >
      <v-icon style="margin-right: 10px" @click="$router.go(-1)">mdi-chevron-left</v-icon>
      <v-toolbar-title>用户信息</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-delete-forever-outline</v-icon>
      </v-btn>
      <v-btn icon @click="User" v-if="admin">
        <v-icon>mdi-account-hard-hat</v-icon>
      </v-btn>
      <v-btn icon @click="Admin" v-else>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <user-detail />

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="snackcolor"
      class="alertshow"
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        <v-icon>mid-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import UserDetail from '../components/user/userdetail'
export default {
  name: 'userinfo',
  data () {
    return {
      admin: true,
      snackbar: false,
      timeout: 2000,
      snackcolor: '#999',
      text: ''
    }
  },
  components: {
    UserDetail
  },
  methods: {
    User () {
      this.admin = false
      this.snackbar = true
      this.text = '降为普通用户'
    },
    Admin () {
      this.admin = true
      this.snackbar = true
      this.text = '升为管理员'
    }
  }
}
</script>

<style lang="scss">
.header{
  position: fixed;
  z-index: 3;
}
.alertshow{
  margin-top: 56px;
}
</style>
