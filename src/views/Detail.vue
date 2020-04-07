<template>
  <div>
    <v-toolbar class="header">
      <v-btn icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleHomeClick">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="container">
      <div class="container-detail">
        <p class="container-head">广州顺丰集团有限公司</p>
        <p class="container-desc">块级元素的垂直相邻外边距会合并，而行内元素实际上不占上下外边距。行内元素的的左右外边距不会合并。同样地，浮动元素的外边距也不会合并。允许指定负的外边距值，不过使用时要小心。</p>
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
    </div>

    <div></div>

    <div class="comment" v-show="messageshow">
      <v-btn
        icon
        class="comment-collect"
        @click="handleCommentClick"
        :style="styleObj"
        >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-text-field
        v-model="message"
        solo
        dense
        hide-details
        clearable
      ></v-text-field>
      <v-btn color="#9C27B0" style="color: #fff"  class="comment-message">评论</v-btn>
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
      styleObj: {
        color: '#fff'
      },
      message: ''
    }
  },
  watch: {
    message (val) {
      console.log(val)
    }
  },
  methods: {
    handleHomeClick () {
      this.$router.push('/')
    },
    handleCommentClick () {
      this.styleObj.color = this.styleObj.color === '#fff' ? 'red' : '#fff'
    }
  }
}
</script>

<style lang="scss" scoped>
.activated{
  color: red;
}
.header{
  position: fixed;
  width: 100%
}
.container{
  margin: 56px 0;
  padding: 20px;
  .container-detail{
    .container-head{
      font-weight: bolder;
    }
    .container-desc{
      text-indent: 2em;
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
.comment{
  position: fixed;
  display: flex;
  width: 100%;
  height: 56px;
  background: #9575CD;
  bottom: 0;
  align-items: center;
  padding: 0 10px;
  .comment-collect{
    margin-right: 10px;
  }
  // .comment-text{
  //   height: 56px;
  // }
  .comment-message{
    margin-left: 10px;
  }
}
</style>
