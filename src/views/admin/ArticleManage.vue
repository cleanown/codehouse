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
      <div class="drawer-title">筛选</div>
      <div class="drawer-switch">
        <v-switch v-model="all" dense hide-details label="全部"></v-switch>
      </div>
      <div class="drawer-switch">
        <v-switch v-model="isverifyAdopt" dense hide-details label="审核已通过"></v-switch>
        <v-switch v-model="isdeleteAdopt" dense hide-details label="已删除"></v-switch>
      </div>
      <div class="drawer-switch">
        <v-switch v-model="isverifyPass" dense hide-details label="审核未通过"></v-switch>
        <v-switch v-model="isdeletePass" dense hide-details label="未删除"></v-switch>
      </div>
      <div class="drawer-time">
        <div>发布时间 :</div>
        <div class="d-flex drawer-time-select">
          <v-menu
            ref="beginmenu"
            v-model="beginmenu"
            :close-on-content-click="false"
            :return-value.sync="beginDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="beginDate"
                label="开始日期"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="beginDate"
              no-title scrollable
              min="2020-03-01"
              :max="date"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="beginmenu = false">取消</v-btn>
              <v-btn text color="primary" @click="$refs.beginmenu.save(beginDate)">确认</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-menu
            ref="endmenu"
            v-model="endmenu"
            :close-on-content-click="false"
            :return-value.sync="endDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="结束日期"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              no-title scrollable
              min="2020-03-01"
              :max="date"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endmenu = false">取消</v-btn>
              <v-btn text color="primary" @click="$refs.endmenu.save(endDate)">确认</v-btn>
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
      all: true,
      isverifyAdopt: false,
      isverifyPass: false,
      isverify: '',
      isdelete: '',
      isdeleteAdopt: '',
      isdeletePass: '',
      snackbar: false,
      snackcolor: '#999',
      text: '',
      timeout: 2000,
      searchValue: '',
      date: new Date().toISOString().substr(0, 10),
      beginDate: '',
      beginmenu: false,
      endDate: '',
      endmenu: false,
      beginTime: '',
      endtime: ''
    }
  },
  watch: {
    all (val) {
      console.log(val)
    },
    isverify (val) {
      console.log(`isverify:${val}`)
    },
    isdelete (val) {
      console.log(`isdelete:${val}`)
    },
    isverifyAdopt (val) {
      // console.log(val)
      this.isverifyJudge()
    },
    isverifyPass (val) {
      // console.log(val)
      this.isverifyJudge()
    },
    isdeleteAdopt (val) {
      // console.log(val)
      this.isdeleteJudge()
    },
    isdeletePass (val) {
      // console.log(val)
      this.isdeleteJudge()
    },
    page (val) {
      console.log(val)
      this.apidataGet()
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
    isverifyJudge () {
      if (this.isverifyAdopt === this.isverifyPass) {
        this.isverify = ''
      } else if (this.isverifyAdopt === true) {
        this.isverify = true
      } else {
        this.isverify = false
      }
    },
    isdeleteJudge () {
      if (this.isdeleteAdopt === this.isdeletePass) {
        this.isdelete = ''
      } else if (this.isdeleteAdopt === true) {
        this.isdelete = true
      } else {
        this.isdelete = false
      }
    },
    handleSelectClick () {
      this.beginTime = new Date(this.beginDate).getTime()
      console.log(this.beginTime)
      this.endTime = new Date(this.endDate).getTime() + 24 * 60 * 60 * 1000
      console.log(this.endTime)
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
        this.$store.commit('articlelist', (res.data.data))
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
  margin-top: 10px;
}
.drawer-switch{
  display: flex;
  justify-content: space-around;
}
.drawer-time{
  padding: 0 20px;
  .drawer-time-select{
    margin-bottom: 10px;
  }
}
.drawer-btn{
  width: 100%;
  padding: 0 50px;
  margin-bottom: 56px;
}
.footer{
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px
}
</style>
