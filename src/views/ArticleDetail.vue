<template>
  <div
    class="home"
  >
    <!-- 头部栏 -->
    <v-toolbar class="header">
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>详情</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="deleteJudgeClick" v-if="userinfo.role > 1">
        <v-icon>mdi-delete-forever-outline</v-icon>
      </v-btn>
      <v-btn icon @click="handleAdoptClick" v-show="company.isverify && userinfo.role > 1">
        <v-icon>mdi-card-bulleted-off</v-icon>
      </v-btn>
      <v-btn icon @click="handleAdoptClick" v-show="!company.isverify && userinfo.role > 1">
        <v-icon>mdi-check-bold</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push({path: '/'})">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- 内容 -->
    <div class="container" :style="{backgroundImage: 'url(' + bgUrl + ')'}">
      <div class="container-detail">
        <p class="container-head">{{company.companyname}}</p>
        <p class="container-desc">{{company.companydetail}}</p>
        <div class="box">
          <div class="box-item" v-for="(item, index) of company.imgs" :key="index" @click="carousel = true">
            <img class="box-item-img" :src="item.imgUrl" alt="图片加载失败"/>
          </div>
        </div>
        <div class="container-time">
          <p class="release-time">作者：{{authname}}</p>
          <p class="release-time">发布时间：{{updateTime}}</p>
        </div>
      </div>
    </div>
    <!-- 底部栏 -->
    <div class="opinion">
      <v-btn
        icon
        class="tips"
        @click="handleCollectClick"
        :style="styleCollect"
        >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <div class="tips">
        <v-btn
          icon
          @click="handleFabulousClick"
          :style="styleFabulous"
          >
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        <div>{{this.$store.state.fabulous}}</div>
      </div>
      <div class="tips" @click="dialogue">
        <v-btn
        icon
        >
        <v-icon>mdi-chat</v-icon>
      </v-btn>
      <div>{{num}}</div>
      </div>
    </div>
    <!-- 提示框 -->
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
    <!-- 弹出提示框 -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">提示！！！</v-card-title>
        <v-card-text class="infors">
          确定删除该文章？
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            取消
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteClick">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 评论区 -->
    <comment :replyshow="replyshow" @replyshowClose="replyshowClose" />
  </div>
</template>

<script>
import config from '../request/config'
import Comment from '../components/comment/comment'
import { mapState } from 'vuex'
export default {
  name: 'detail',
  data () {
    return {
      bgUrl: '',
      company: {},
      dialog: false,
      isverify: '',
      timeout: 1000,
      snackbar: false,
      snackcolor: '#999',
      text: '',
      styleCollect: { color: '#757575' },
      styleFabulous: { color: '#757575' },
      num: '',
      detailimg: [],
      updateTime: '',
      replyshow: false,
      authname: ''
    }
  },
  components: {
    Comment
  },
  computed: {
    ...mapState(['userinfo'])
  },
  mounted () {
    this.apiGetdata()
  },
  watch: {
    isverify (val) {
      if (this.userinfo.role > 1) {
        if (val === true) {
          this.bgUrl = require('../assets/adopt.png')
        } else {
          this.bgUrl = require('../assets/pass.png')
        }
      } else {
        this.bgUrl = ''
      }
    }
  },
  methods: {
    async apiGetdata () {
      const url = `${config.online}/company/companyDetail`
      const obj = {
        params: {
          companyid: this.$route.query.id
        }
      }
      const res = await this.$http.get(url, obj)
      console.log(res)
      if (res.data.code === 200) {
        this.company = res.data.data
        this.updateTime = res.data.data.meta.updateAt
        this.updateTime = this.$moment(this.updateTime).format('lll')
        this.isverify = res.data.data.isverify
        this.authname = res.data.data.userinfo.username
        // console.log(this.company)
      }
    },
    deleteJudgeClick () {
      this.dialog = true
    },
    async deleteClick () {
      const url = `${config.online}/company/admindelete`
      const data = {
        params: {
          companyid: this.company._id
        }
      }
      const res = await this.$http.delete(url, data)
      if (res.data.code === 200) {
        this.snackbar = true
        this.text = res.data.msg
        setTimeout(() => {
          this.$router.go(-1)
        }, 500)
      } else {
        this.snackbar = true
        this.text = res.data.msg
      }
    },
    async handleAdoptClick () {
      const url = `${config.online}/company/verify`
      const data = {
        status: !this.company.isverify,
        companyid: this.company._id
      }
      const res = await this.$http.put(url, data)
      if (res.data.code === 200) {
        if (this.company.isverify) {
          this.snackbar = true
          this.text = '下架成功'
        } else {
          this.snackbar = true
          this.text = '审核通过'
        }
        this.apiGetdata()
      } else {
        this.snackbar = true
        this.text = res.data.msg
      }
    },
    handleCollectClick () {
      this.styleCollect.color = this.styleCollect.color === '#757575' ? '#651FFF' : '#757575'
      this.snackbar = true
      this.text = this.text === '取消收藏' ? '收藏成功' : '取消收藏'
      this.snackcolor = this.snackcolor === '#ccc' ? 'green' : '#ccc'
    },
    handleFabulousClick () {
      this.styleFabulous.color = this.styleFabulous.color === '#757575' ? '#651FFF' : '#757575'
      if (this.styleFabulous.color === '#757575') {
        this.$store.commit('decrement')
      } else {
        this.$store.commit('increment')
      }
    },
    dialogue () {
      this.replyshow = true
    },
    replyshowClose (val) {
      this.replyshow = false
      if (val === 0) {
        this.num = ''
      } else {
        this.num = val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  .adminmg{
    position: fixed;
    margin-top: 56px;
    padding-top: 15px;
    padding-right: 10px;
    .adminmg-item{
      display: flex;
      margin-right: 20px;
      width: 100%;
      justify-content: flex-end;
    }
  }
  .alertshow{
    margin-top: 56px;
  }
  .headline{
    color: rgb(247, 18, 18);
  }
  .infors{
    font-size: 16px;
    line-height: 25px;
    text-indent: 2rem;
  }
  .alert{
    position: fixed;
    width: 95%;
    margin: 0 2.5%;
    top: 56px;
    opacity: 0.9;
  }
  .header{
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 3;
  }
  .container{
    margin-top: 56px;
    padding: 20px;
    background-size: auto;
    background-position: center;
    .container-detail{
      .container-head{
        font-size: 20px;
        font-weight: bolder;
      }
      .container-desc{
        text-indent: 2em;
        margin: 0 5px;
      }
      .box{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .box-item{
          width: 33%;
          padding: 1%;
          .box-item-img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .container-time{
        margin-top: 10px;
        padding-right: 10px;
        width: 100%;
        height: 60px;
        .release-time{
          width: 100%;
          text-align: right;
          line-height: 30px;
        }
      }
    }
  }
  .opinion{
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    background: rgb(245, 245, 245);
    z-index: 2;
    width: 100%;
    height: 56px;
    color: #000;
    align-items: center;
    .tips{
      display: flex;
      margin-right: 15px;
      align-items: center;
    }
  }
}
</style>
