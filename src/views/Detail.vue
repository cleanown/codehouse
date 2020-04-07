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
          下外边距。行内元素的的左右外边距不会合并。
          同样地，浮动元素的外边距也不会合并。允许指定负的外边距值，不过使用时要小心
          块级元素的垂直相邻外边距会合并，而行内元素实际上不占上下外边距。行内元素的的
          左右外边距不会合并。同样地，
          下外边距。行内元素的的左右外边距不会合并。
          同样地，浮动元素的外边距也不会合并。允许指定负的外边距值，不过使用时要小心
          块级元素的垂直相邻外边距会合并，而行内元素实际上不占上下外边距。行内元素的的
          左右外边距不会合并。同样地，
          下外边距。行内元素的的左右外边距不会合并。
          同样地，浮动元素的外边距也不会合并。允许指定负的外边距值，不过使用时要小心
          块级元素的垂直相邻外边距会合并，而行内元素实际上不占上下外边距。行内元素的的
          左右外边距不会合并。同样地，
          下外边距。行内元素的的左右外边距不会合并。
          同样地，浮动元素的外边距也不会合并。允许指定负的外边距值，不过使用时要小心
          块级元素的垂直相邻外边距会合并，而行内元素实际上不占上下外边距。行内元素的的
          左右外边距不会合并。同样地，
          浮动元素的外边距也不会合并。允许指定负的外边距值，不过使用时要小心。。</p>
        <div class="box">
          <div class="box-item">
            <img class="box-item-img" src="../assets/2.jpg" />
          </div>
          <div class="box-item">
            <img class="box-item-img" src="../assets/logo.png" />
          </div>
          <div class="box-item">
            <img class="box-item-img" src="../assets/music.png" />
          </div>
          <div class="box-item">
            <img class="box-item-img" src="../assets/music.png" />
          </div>
          <div class="box-item">
            <img class="box-item-img" src="../assets/logo.png" />
          </div>
        </div>
      </div>
      <div class="opinion">
        <v-btn
          icon
          class="tips"
          @click="handleCommentClick"
          :style="stylecomment"
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
    </div>
    <v-alert
      type="success"
      transition="slide-y-reverse-transition"
      dense
      mode
      class="alert"
      v-if="alertcomment"
      >
      收藏成功
    </v-alert>
    <!-- <v-alert
      type="info"
      transition="slide-y-reverse-transition"
      dense
      dismissible
      class="alert"
      v-if="alertpass"
      >
      取消收藏
    </v-alert> -->

    <div class="comment" v-show="messageshow">
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
        class="comment-message"
        >
        发送
      </v-btn>
    </div>

  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      title: '详情',
      messageshow: false,
      alertcomment: false,
      stylecomment: {
        color: '#757575'
      },
      styleFabulous: {
        color: '#757575'
      },
      message: '',
      num: 5
    }
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
    handleCommentClick () {
      this.stylecomment.color = this.stylecomment.color === '#757575' ? '#651FFF' : '#757575'
      this.alertcomment = true
      setTimeout(() => {
        this.alertcomment = false
      }, 2000)
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
  padding: 0 20px;
  .tips{
    display: flex;
    margin-right: 15px;
    align-items: center;
  }
}
.comment{
  position: fixed;
  display: flex;
  width: 100%;
  height: 56px;
  background: #B39DDB;
  bottom: 0;
  align-items: center;
  padding: 0 10px;
  .comment-message{
    margin-left: 10px;
  }
}
</style>
