<template>
  <div>
    <div class="comment">
      <div class="comment-header"></div>
      <p class="comment-title">评论:</p>
      <div>
        <div class="comment-list" v-for="(item, i) in sendmessage" :key="i">
          <div class="comment-user">
            <div class="comment-user-head">
              <img class="comment-user-head-img" :src="item.headImgUrl"/>
            </div>
            <div>{{item.name}}</div>
          </div>
          <p class="comment-desc" @click="replyMessage">{{item.desc}}</p>
          <p class="comment-time">评论时间：{{item.momentTime}}</p>
          <div style="font-size: 12px; background: #eee; padding: 5px">
            <span style="color: blue">{{$store.state.userinfo.username}} 回复 adminn:</span>
            <p style="text-indent: 2rem">{{item.reply.replydesc}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="dialogue" v-show="replyshow">
      <v-btn icon style="margin-right: 7px" @click="messageshow = false">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-textarea
        label="回复"
        solo
        class="dialogue-message"
        v-model="reply"
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
        @click="replySendClick"
        >
        发送
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    sendmessage: Array
  },
  data () {
    return {
      reply: '',
      replyshow: false
    }
  },
  methods: {
    replyMessage () {
      this.replyshow = true
    },
    replySendClick () {
      console.log(this.reply)
      const a = {
        title: 'solace 回复 admin',
        replydesc: this.reply
      }
      this.sendmessage.reply.push(a)
      console.log(this.sendmessage)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment{
  width: 100%;
  padding: 20px;
  margin-bottom: 56px;
  .comment-header{
    width: 100%;
    height: 1px;
    border-top: 1px dashed #999;
  }
  .comment-title{
    margin-top: 10px;
    margin-left: 10px;
    font-size: 18px;
    font-weight: 500;
  }
  .comment-list{
    margin: 10px;
    border-bottom: 1px solid #999;
    .comment-user{
      display: flex;
      overflow: hidden;
      height: 36px;
      align-items: center;
      margin-bottom: 5px;
      .comment-user-head{
        width: 36px;
        height: 36px;
        padding: 3px;
        margin-right: 5px;
        .comment-user-head-img{
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
    }
    .comment-desc{
      text-indent: 2em;
      word-break:break-all;
    }
    .comment-time{
      width: 100%;
      text-align: right;
    }
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
</style>
