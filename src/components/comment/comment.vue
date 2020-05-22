<template>
  <div class="home">
    <div class="comment">
      <div class="comment-header"></div>
      <p class="comment-title">评论:</p>
      <div v-show="comments">
        <div class="comment-list" v-for="(item, index) in news" :key="index">
          <!-- 主评论 -->
          <div>
            <div class="comment-user">
              <div class="comment-user-head">
                <img class="comment-user-head-img" :src="item.userinfo.headimg"/>
              </div>
              <div>{{item.userinfo.username}}</div>
            </div>
            <div class="comment-desc">
              <div style="text-indent: 1em">
                {{item.commentdetail}}
              </div>
            </div>
            <div class="comment-footer">
              <div class="comment-footer-reply" @click="replyClick(item)">回复</div>
              <div class="comment-footer-delete">删除</div>
              <div class="comment-time">评论时间：{{$moment(item.meta.updateAt).format('lll')}}</div>
            </div>
          </div>
          <!-- 子评论 -->
          <div v-for="(children, index) in item.children" :key="index" class="comment-children">
            <div class="comment-user">
              <div class="comment-user-head">
                <img class="comment-user-head-img" :src="children.userinfo.headimg"/>
              </div>
              <div>{{children.userinfo.username}}</div>
            </div>
            <div class="comment-desc">
              <div style="float: left;color: #B388FF;font-weight: normal" v-if="children.linkid !== item.userid">
                @{{children.linkname}}
              </div>
              <div style="text-indent: 1em">
                {{children.commentdetail}}
              </div>
            </div>
            <div class="comment-footer">
              <div class="comment-footer-reply" @click="cildrenReplyClick(children,item)">回复</div>
              <div class="comment-footer-delete">删除</div>
              <div class="comment-time">评论时间：{{$moment(children.meta.updateAt).format('lll')}}</div>
            </div>
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
        :label="replyComment"
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
      cReplyShow: false,
      news: {},
      timeout: 1000,
      snackbar: false,
      snackcolor: '#999',
      text: '',
      companyid: this.$route.query.id,
      userid: this.$store.state.userinfo._id,
      commentid: '',
      linkid: '',
      linkname: '',
      replyComment: ''
    }
  },
  mounted () {
    this.commentGet()
  },
  methods: {
    // 评论获取
    async commentGet () {
      const id = this.companyid
      const url = `${config.online}/comment/get/${id}`
      const res = await this.$http.get(url)
      console.log('%c评论列表', 'color: blue')
      console.log(res.data.data)
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
    // 发表评论
    async commentClick () {
      const url = `${config.online}/comment/add`
      const data = {
        commentdetail: this.reply,
        companyid: this.companyid,
        commentid: this.commentid,
        userid: this.userid,
        linkid: this.linkid,
        linkname: this.linkname
      }
      const res = await this.$http.post(url, data)
      console.log(res.data)
      if (res.data.code === 200) {
        this.snackbar = true
        this.text = res.data.msg
        this.replyshowClose()
        this.commentGet()
        this.reply = ''
        this.commentid = ''
        this.linkid = ''
        this.linkname = ''
        this.cReplyShow = false
      } else {
        this.snackbar = true
        this.text = res.data.msg
      }
    },
    replyshowClose () {
      this.$emit('replyshowClose', (this.news.length))
    },
    // 回复评论
    replyClick (val) {
      this.cReplyShow = true
      console.log(val)
      this.commentid = val._id
      this.linkid = val.userid
      this.linkname = val.userinfo.username
      this.replyComment = `回复: ${val.userinfo.username}`
      console.log(`%c该公司ID： ${this.companyid}`, 'color: red')
      console.log(`该条评论ID： ${this.commentid}`)
      console.log(`@人的ID: ${this.linkid}`)
      console.log(`@人的username：${this.linkname}`)
      console.log(`我的ID：${this.userid}`)
      console.log(`我的username：${this.$store.state.userinfo.username}`)
    },
    cildrenReplyClick (val, item) {
      this.cReplyShow = true
      console.log(val)
      console.log(item)
      this.commentid = item._id
      this.linkid = val.userid
      this.linkname = val.userinfo.username
      this.replyComment = `回复: ${val.userinfo.username}`
      console.log(`%c该公司ID： ${this.companyid}`, 'color: red')
      console.log(`该条评论ID： ${this.commentid}`)
      console.log(`@人的ID: ${this.linkid}`)
      console.log(`@人的username：${this.linkname}`)
      console.log(`我的ID：${this.userid}`)
      console.log(`我的username：${this.$store.state.userinfo.username}`)
    },
    cReplyClick () {
      this.commentClick()
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
    border-bottom: 1px solid #999;
    margin-bottom: 1px;
    .comment-user{
      display: flex;
      overflow: hidden;
      height: 40px;
      align-items: center;
      margin-bottom: 5px;
      margin-top: 5px;
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
      margin-bottom: 10px;
      word-break:break-all;
    }
    .comment-footer{
      width: 100%;
      display: flex;
      padding-bottom: 10px;
      justify-content: space-between;
      align-items: center;
      .comment-footer-reply{
        color: #311B92;
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
  .comment-children{
    opacity: 0.9;
    margin-left: 10px;
    margin-right: 10px;
  }
}
.reply{
  position: fixed;
  display: flex;
  width: 100%;
  height: 56px;
  z-index: 3;
  background: #B39DDB;
  bottom: 0;
  align-items: center;
  padding: 0 10px;
  .reply-btn{
    margin-left: 10px;
  }
}
</style>
