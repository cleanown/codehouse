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
      <v-icon @click="$router.push({path: '/'})">mdi-home</v-icon>
    </v-app-bar>

    <user-detail />
  </div>
</template>

<script>
import UserDetail from '../components/user/userdetail'
export default {
  name: 'userinfo',
  components: {
    UserDetail
  }
}
</script>

<style lang="scss">
.header{
  position: fixed;
  z-index: 3;
}
</style>
