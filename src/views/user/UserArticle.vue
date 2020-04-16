<template>
  <div class="home">
    <v-app-bar
      color="deep-purple"
      dark
      class="header"
    >
      <v-icon style="margin-right: 10px" @click="$router.go(-1)">mdi-chevron-left</v-icon>
      <v-toolbar-title>我的文章</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="order" @click="order = false">
        <v-icon>mdi-sort-ascending</v-icon>
      </v-btn>
      <v-btn icon v-else @click="order = true">
        <v-icon>mdi-sort-descending</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push({path: '/'})">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <my-article :order="order" />

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
import MyArticle from '../../components/user/myarticle'
export default {
  name: 'useremanage',
  data () {
    return {
      snackbar: false,
      text: '',
      timeout: 2000,
      order: true
    }
  },
  components: {
    MyArticle
  }
}
</script>
<style lang="scss" scoped>
.tips{
  margin-top: 56px;
}
.header{
  position: fixed;
  z-index: 3;
}
.footer{
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px
}
</style>
