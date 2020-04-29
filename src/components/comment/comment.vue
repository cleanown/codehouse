<template>
  <div class="home">
    <div class="comment">
      <div class="comment-header"></div>
      <p class="comment-title">评论:</p>
      <div v-show="comments">
        <div class="comment-list" v-for="(item, index) in news" :key="index">
          <div class="comment-user">
            <div class="comment-user-head">
              <img class="comment-user-head-img" :src="item.userinfo.headimg"/>
            </div>
            <div>{{item.userinfo.username}}</div>
          </div>
          <p class="comment-desc">{{item.commentdetail}}</p>
          <div class="comment-footer">
            <div class="comment-footer-reply" @click="replyClick()">回复</div>
            <div class="comment-footer-delete">删除</div>
            <div class="comment-time">评论时间：{{$moment(item.meta.updateAt).format('lll')}}</div>
          </div>
        </div>
      </div>
      <div style="text-align: center;opacity: 0.5;" v-show="!comments">暂无评论！</div>
    </div>
    <!-- 评论框 -->
    <div class="reply" v-show="replyshow">
      <v-btn icon style="margin-right: 7px" @click="replyshowClose">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-textarea
        label="评论"
        solo
        class="reply-message"
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
        class="reply-btn"
        @click="commentClick"
        >
        发送
      </v-btn>
    </div>
    <!-- 回复 -->
    <div class="reply" v-show="cReplyShow">
      <v-btn icon style="margin-right: 7px" @click="cReplyShow = false">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-textarea
        label="回复"
        solo
        class="reply-message"
        v-model="replyComment"
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
        class="reply-btn"
        @click="cReplyClick"
        >
        发送
      </v-btn>
    </div>
    <!-- 提示框 -->
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="snackcolor"
      style="margin-top: 56px"
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
  </div>
</template>

<script>
import config from '../../request/config'
export default {
  name: 'comment',
  props: {
    replyshow: Boolean
  },
  data () {
    return {
      comments: null,
      reply: '',
      replyComment: '',
      cReplyShow: false,
      news: {},
      timeout: 1000,
      snackbar: false,
      snackcolor: '#999',
      text: '',
      companyid: this.$route.query.id,
      userid: this.$store.state.userinfo._id
    }
  },
  mounted () {
    this.commentGet()
  },
  methods: {
    async commentGet () {
      const id = this.companyid
      const url = `${config.online}/comment/get/${id}`
      const res = await this.$http.get(url)
      this.$emit('replyshowClose', (res.data.data.length))
      if (res.data.code === 200) {
        this.news = res.data.data
        if (this.news === '') {
          this.comments = false
        } else {
          this.comments = true
        }
      } else {
        this.snackbar = true
        this.text = res.data.msg
      }
    },
    async commentClick () {
      const url = `${config.online}/comment/add`
      const data = {
        commentdetail: this.reply,
        companyid: this.companyid,
        userid: this.userid
      }
      const res = await this.$http.post(url, data)
      if (res.data.code === 200) {
        this.snackbar = true
        this.text = res.data.msg
        this.replyshowClose()
        this.commentGet()
        this.reply = ''
      } else {
        this.snackbar = true
        this.text = res.data.msg
      }
    },
    replyshowClose () {
      this.$emit('replyshowClose', (this.news.length))
    },
    replyClick () {
      this.cReplyShow = true
    },
    cReplyClick () {
      console.log('111')
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
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px dashed #999;
  }
  .comment-list{
    margin: 10px;
    border-bottom: 1px solid #999;
    .comment-user{
      display: flex;
      overflow: hidden;
      height: 40px;
      align-items: center;
      margin-bottom: 5px;
      .comment-user-head{
        width: 40px;
        height: 40px;
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
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 5px;
      text-indent: 2em;
      word-break:break-all;
    }
    .comment-footer{
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      justify-content: space-between;
      align-items: center;
      .comment-footer-reply{
        color: #311B92;
        text-indent: 1em;
      }
      .comment-footer-delete{
        color: red;
        text-indent: 1em;
      }
      .comment-time{
        flex: 1;
        color: #999;
        font-size: 12px;
        text-align: right;
      }
    }
  }
}
.reply{
  position: fixed;
  display: flex;
  width: 100%;
  height: 56px;
  background: #B39DDB;
  bottom: 0;
  align-items: center;
  padding: 0 10px;
  .reply-btn{
    margin-left: 10px;
  }
}
</style>
