<template>
  <div>
    <v-toolbar class="header">
      <v-btn icon @click="handleBackClick">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleHomeClick" color="deep-purple">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="container">
      <div class="container-detail">
        <p class="container-head">广州顺丰集团有限公司</p>
        <p class="container-desc">块级元素的垂直相邻外边距会合并，而行内元素实际上不占上
          下外边距。行内元素的的左右外边距不会合并。</p>
        <div class="box">
          <div class="box-item" v-for="(item, index) of detailimg" :key="index" @click="carousel = true">
            <img class="box-item-img" :src="item.imgUrl" alt="图片加载失败"/>
          </div>
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
      <div class="tips" @click="handleOpenClick">
        <v-btn
        icon
        >
        <v-icon>mdi-chat</v-icon>
      </v-btn>
      <div>{{num}}</div>
      </div>
      <v-btn
        icon
        class="tips"
        >
        <v-icon>mdi-reply</v-icon>
      </v-btn>
    </div>

    <div class="dialogue" v-show="messageshow">
      <v-btn icon style="margin-right: 7px" @click="handleCloseClick">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-text-field
        v-model="message"
        solo
        dense
        hide-details
        label="说点什么呗~"
        clearable
      ></v-text-field>
      <v-btn
        rounded
        color="deep-purple darken-2"
        style="color: #fff"
        class="dialogue-message"
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

    <v-carousel
      v-if="carousel"
      hide-delimiters
      >
      <v-carousel-item
        v-for="(item,i) in detailimg"
        :key="i"
        :src="item.imgUrl"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>

    <my-detail :sendmessage="sendmessage"></my-detail>
  </div>
</template>

<script>
import MyDetail from '../components/detail/mydetail'
export default {
  name: 'detail',
  data () {
    return {
      title: '详情',
      timeout: 1000,
      messageshow: false,
      snackbar: false,
      snackcolor: '#ccc',
      text: '取消收藏',
      styledialogue: { color: '#757575' },
      styleFabulous: { color: '#757575' },
      message: '',
      sendmessage: [{
        headImgUrl: require('../assets/logo.png'),
        name: 'cleanown',
        desc: '在跳转时页面的样式并没有加载，而是沿用了前一个页面的，或者前面已经加载过页面的样式。要是同样的样式，前面已经加载过了，浏览器在跳到下个页面相同的样式就不会再加载了'
      }, {
        headImgUrl: require('../assets/logo.png'),
        name: 'cleanown',
        desc: '在跳转时页面的样式并没有加载，而是沿用了前一个页面的，或者前面已经加载过页面的样式。要是同样的样式，前面已经加载过了，浏览器在跳到下个页面相同的样式就不会再加载了'
      }],
      num: 5,
      carousel: false,
      detailimg: [
        { imgUrl: require('../assets/a1.png') },
        { imgUrl: require('../assets/a2.png') },
        { imgUrl: require('../assets/a3.png') },
        { imgUrl: require('../assets/a4.png') },
        { imgUrl: require('../assets/a5.png') },
        { imgUrl: require('../assets/a6.png') },
        { imgUrl: require('../assets/a7.png') },
        { imgUrl: require('../assets/2.jpg') },
        { imgUrl: require('../assets/a1.png') },
        { imgUrl: require('../assets/a1.png') }
      ]
    }
  },
  components: {
    MyDetail
  },
  watch: {
    message (val) {
      console.log(val)
    }
  },
  methods: {
    handleBackClick () {
      this.$router.go(-1)
    },
    handleHomeClick () {
      this.$router.push('/')
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
    handleCloseClick () {
      this.messageshow = false
    },
    handleOpenClick () {
      this.messageshow = true
    },
    sendClick () {
      const a = {
        headImgUrl: require('../assets/logo.png'),
        name: 'cleanown',
        desc: this.message
      }
      this.sendmessage.push(a)
      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>
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
  margin-bottom: 56px;
  padding: 20px;
  background: #fff;
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
  }
}
.opinion{
  position: fixed;
  bottom: 0;
  background: #FFF;
  display: flex;
  justify-content: flex-end;
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
  .dialogue-message{
    margin-left: 10px;
  }
}
</style>
