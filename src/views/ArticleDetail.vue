<template>
  <div
    class="home"
    :style="{backgroundImage: 'url(' + bgUrl + ')',
             backgroundSize: '100% 50%',
             backgroundRepeat: 'no-repeat'}"
  >
    <v-toolbar class="header">
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleDeleteClick" v-if="userinfo.role > 1">
        <v-icon>mdi-delete-forever-outline</v-icon>
      </v-btn>
      <v-btn icon @click="handleAdoptClick" v-show="companydetail.isverify && userinfo.role > 1">
        <v-icon>mdi-card-bulleted-off</v-icon>
      </v-btn>
      <v-btn icon @click="handleAdoptClick" v-show="!companydetail.isverify && userinfo.role > 1">
        <v-icon>mdi-check-bold</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push({path: '/'})">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>

    <div class="container" v-if="'meta' in companydetail">
      <div class="container-detail">
        <p class="container-head">{{companydetail.companyname}}</p>
        <p class="container-desc">{{companydetail.companydetail}}</p>
        <div class="box">
          <div class="box-item" v-for="(item, index) of companydetail.imgs" :key="index" @click="carousel = true">
            <img class="box-item-img" :src="item.imgUrl" alt="图片加载失败"/>
          </div>
        </div>
        <div class="container-time">
          <p class="release-time">作者：{{this.$store.state.userinfo.username}}</p>
          <p class="release-time">发布时间：{{updateTime}}</p>
        </div>
      </div>
    </div>

    <div class="opinion">
      <v-btn
        icon
        class="tips"
        @click="handledialogueClick"
        :style="styledialogue"
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
      <div class="tips" @click="messageshow = true">
        <v-btn
        icon
        >
        <v-icon>mdi-chat</v-icon>
      </v-btn>
      <div>{{num}}</div>
      </div>
    </div>

    <div class="dialogue" v-show="messageshow">
      <v-btn icon style="margin-right: 7px" @click="messageshow = false">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <!-- <v-text-field
        v-model="message"
        solo
        dense
        hide-details
        label="说点什么呗~"
        clearable
      >
      </v-text-field> -->
      <v-textarea
        class="dialogue-message"
        v-model="message"
        background-color="#fff"
        dense
        hide-details
        clearable
        outlined
        rows="1"
        no-resize
      ></v-textarea>
      <v-btn
        rounded
        color="deep-purple darken-2"
        style="color: #fff"
        class="dialogue-btn"
        @click="sendClick"
        >
        发送
      </v-btn>
    </div>

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

    <comment :sendmessage="sendmessage" />
  </div>
</template>

<script>
import config from '../request/config'
import Comment from '../components/detail/comment'
import { mapState } from 'vuex'
export default {
  name: 'detail',
  data () {
    return {
      bgUrl: this.$route.query.bgUrl,
      companydetail: {},
      title: '详情',
      messageshow: false,
      timeout: 1000,
      snackbar: false,
      snackcolor: '#999',
      text: '',
      styledialogue: { color: '#757575' },
      styleFabulous: { color: '#757575' },
      message: '',
      sendmessage: [{
        headImgUrl: require('../assets/logo.png'),
        name: 'cleanown',
        desc: '在跳转时页面的样式并没有加载，而是沿用了前一个页面的，或者前面已经加载过页面的样式。要是同样的样式，前面已经加载过了，浏览器在跳到下个页面相同的样式就不会再加载了',
        momentTime: this.$moment(new Date()).format('lll')
      }],
      num: 5,
      detailimg: [
      ],
      updateTime: ''
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
    message (val) {
      console.log(val)
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
      if (res.data.code === 200) {
        this.companydetail = res.data.data
        this.updateTime = res.data.data.meta.updateAt
        this.updateTime = this.$moment(this.updateTime).format('lll')
        console.log(this.companydetail)
        console.log(this.updateTime)
      }
    },
    async handleDeleteClick () {
      const url = `${config.online}/company/admindelete`
      const data = {
        params: {
          companyid: this.companydetail._id
        }
      }
      const res = await this.$http.delete(url, data)
      console.log(res)
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
        status: !this.companydetail.isverify,
        companyid: this.companydetail._id
      }
      const res = await this.$http.put(url, data)
      if (res.data.code === 200) {
        if (this.companydetail.isverify) {
          this.bgUrl = require('../assets/pass.png')
          this.snackbar = true
          this.text = '下架成功'
        } else {
          this.snackbar = true
          this.text = '审核通过'
          this.bgUrl = require('../assets/adopt.png')
        }
        this.apiGetdata()
      } else {
        this.snackbar = true
        this.text = res.data.msg
      }
    },
    handledialogueClick () {
      this.styledialogue.color = this.styledialogue.color === '#757575' ? '#651FFF' : '#757575'
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
    sendClick () {
      if (this.message === '') {
        this.snackbar = true
        this.text = '内容不得为空'
      } else {
        const a = {
          headImgUrl: this.$store.state.userinfo.headimg,
          name: this.$store.state.userinfo.username,
          desc: this.message,
          momentTime: this.$moment(new Date()).format('lll')
        }
        this.sendmessage.unshift(a)
        this.message = ''
        this.snackbar = true
        this.text = '评论成功'
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
    width: 100%;
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
  .alert{
    position: fixed;
    width: 95%;
    margin: 0 2.5%;
    top: 56px;
    opacity: 0.9;
  }
  .header{
    position: fixed;
    width: 100%
  }
  .container{
    margin-top: 56px;
    padding: 20px;
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
    background: #fff;
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
  .dialogue{
    position: fixed;
    display: flex;
    width: 100%;
    height: 56px;
    background: #B39DDB;
    bottom: 0;
    align-items: center;
    padding: 0 10px;
    .dialogue-btn{
      margin-left: 10px;
    }
  }
}
</style>
