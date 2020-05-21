<template>
  <div class="home">
    <v-app-bar
      color="deep-purple"
      dark
      class="header"
    >
      <v-icon style="margin-right: 10px" @click="$router.go(-1)">mdi-chevron-left</v-icon>
      <v-toolbar-title>用户管理</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push({path: '/'})">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <user-mg :userlist="userlist" :wait="wait" @changeValue="changeValue" />

    <div class="footer">
      <v-pagination
        v-model="page"
        :length="pagetotal"
      ></v-pagination>
    </div>

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
import config from '../../request/config'
import UserMg from '../../components/admin/usermg'
export default {
  name: 'useremanage',
  data () {
    return {
      page: 1,
      pagetotal: 1,
      snackbar: false,
      text: '',
      timeout: 2000,
      searchValue: '',
      userlist: [],
      wait: ''
    }
  },
  components: {
    UserMg
  },
  mounted () {
    this.UsermgDataGet()
  },
  watch: {
    page (val) {
      console.log(val)
      this.UsermgDataGet()
    }
  },
  methods: {
    async UsermgDataGet () {
      const url = `${config.online}/user/getalluser`
      const data = {
        params: {
          hotkey: this.searchValue,
          page: this.page
        }
      }
      const res = await this.$http.get(url, data)
      console.log(res)
      if (res.data.code === 200) {
        this.userlist = res.data.data.users
        this.wait = false
        this.page = Number(res.data.data.page)
        this.pagetotal = res.data.data.pageTotle
      } else {
        this.snackbar = true
        this.text = res.data.msg
      }
    },
    changeValue (val) {
      this.searchValue = val
      this.UsermgDataGet()
      // console.log(this.searchValue)
    }
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
  bottom: -3px;
  width: 100%;
}
</style>
