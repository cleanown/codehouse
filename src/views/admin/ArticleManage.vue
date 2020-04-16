<template>
  <div class="home">
    <v-app-bar
      color="deep-purple"
      dark
      class="header"
    >
      <v-icon style="margin-right: 10px" @click="$router.go(-1)">mdi-chevron-left</v-icon>
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
      <p class="drawer-title">筛选</p>
      <div class="drawer-switch">
        <v-switch v-model="isverify" class="mx-2" label="待审核"></v-switch>
        <v-switch v-model="isdelete" class="mx-2" label="已删除"></v-switch>
      </div>
      <div class="drawer-time">
        <div>发布时间 :</div>
        <div class="d-flex drawer-time-select">
          <v-menu
            ref="beginmenu"
            v-model="beginmenu"
            :close-on-content-click="false"
            :return-value.sync="begindate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="begindate"
                label="开始日期"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="begindate"
              no-title scrollable
              min="2020-03-01"
              :max="date"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="beginmenu = false">取消</v-btn>
              <v-btn text color="primary" @click="$refs.beginmenu.save(begindate)">确认</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-menu
            ref="endmenu"
            v-model="endmenu"
            :close-on-content-click="false"
            :return-value.sync="enddate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="enddate"
                label="结束日期"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="enddate"
              no-title scrollable
              min="2020-03-01"
              :max="date"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endmenu = false">取消</v-btn>
              <v-btn text color="primary" @click="$refs.endmenu.save(enddate)">确认</v-btn>
            </v-date-picker>
          </v-menu>
        </div>
      </div>
      <div class="drawer-btn">
        <v-btn
          width="100%"
          color="primary"
          @click="handleSelectClick"
        >
          确认
        </v-btn>
      </div>
    </v-navigation-drawer>

    <article-mg class="detail" @changeValue="changeValue" :wait="wait" />

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
      :color="snackcolor"
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
import ArticleMg from '../../components/admin/articlemg'
export default {
  name: 'articlemanage',
  data () {
    return {
      wait: true,
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      page: 1,
      pagetotal: 1,
      isverify: false,
      isdelete: false,
      snackbar: false,
      snackcolor: '#999',
      text: '',
      timeout: 2000,
      searchValue: '',
      date: new Date().toISOString().substr(0, 10),
      begindate: new Date().toISOString().substr(0, 10),
      beginmenu: false,
      enddate: new Date().toISOString().substr(0, 10),
      endmenu: false,
      beginTime: '',
      endtime: ''
    }
  },
  components: {
    ArticleMg
  },
  mounted () {
    this.apidataGet()
  },
  methods: {
    changeValue (val) {
      this.searchValue = val
      this.page = 1
      this.apidataGet()
    },
    handleSelectClick () {
      this.beginTime = (this.begindate.slice(5, 7)) * 2592000000 + this.begindate.slice(8, 10) * 86400000
      this.endTime = (this.enddate.slice(5, 7)) * 2592000000 + this.enddate.slice(8, 10) * 86400000
      if (this.beginTime > this.endTime) {
        this.snackbar = true
        this.text = '开始时间应小于结束时间'
      } else {
        this.apidataGet()
        this.drawer = false
      }
    },
    async apidataGet () {
      const url = `${config.online}/search/adminCompanyList`
      const data = {
        page: this.page,
        isverify: this.isverify,
        isdelete: this.isdelete,
        hotkey: this.searchValue,
        beginTime: this.beginTime,
        endTime: this.endTime
      }
      const res = await this.$http.post(url, data)
      if (res.data.code === 200) {
        this.wait = false
        this.$store.commit('adminmg', (res.data.data))
        console.log(res.data.data)
        this.page = res.data.data.page
        this.pagetotal = res.data.data.pageTotle
      } else {
        this.snackbar = true
        this.text = res.msg
      }
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
.drawer-title{
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
  margin: 10px;;
}
.drawer-switch{
  display: flex;
  justify-content: space-around;
}
.drawer-time{
  padding: 0 20px;
  .drawer-time-select{
    margin-top: 20px;
  }
}
.drawer-btn{
  position: fixed;
  width: 100%;
  padding: 0 50px;
  margin-bottom: 40px;
  bottom: 0;
}
.footer{
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px
}
</style>
