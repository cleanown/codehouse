<template>
  <div class="home">
    <v-app-bar
      color="deep-purple"
      dark
      class="header"
    >
      <v-icon style="margin-right: 10px" @click="handleBackClick">mdi-chevron-left</v-icon>
      <v-toolbar-title>发文管理</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click.stop="drawer = !drawer">mdi-sort</v-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      bottom
    >
    </v-navigation-drawer>

    <admin-mg class="detail" @changeValue="changeValue" />

    <div class="footer">
      <v-pagination
        v-model="page"
        :length="1"
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
import config from '../request/config'
import AdminMg from '../components/manage/adminmg'
export default {
  name: 'manage',
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      page: 1,
      snackbar: false,
      text: '',
      timeout: 2000,
      searchValue: ''
    }
  },
  components: {
    AdminMg
  },
  mounted () {
    this.apidataGet()
  },
  methods: {
    handleBackClick () {
      this.$router.go(-1)
    },
    changeValue (val) {
      this.searchValue = val
      this.page = 1
      console.log(this.searchValue)
    },
    async apidataGet () {
      const url = `${config.online}/search/adminCompanyList`
      const data = {
        page: this.page
      }
      const res = await this.$http.post(url, data)
      if (res.data.success) {
        this.$store.commit('adminmg', (res.data.data))
        console.log(res.data.data)
        const page = res.data.data.page
        this.page = page
      } else {
        this.snackbar = true
        this.text = '用户获取数据错误'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
