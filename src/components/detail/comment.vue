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
          <p class="comment-desc">{{item.desc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    sendmessage: Array
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
    background: #999;
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
      margin: 5px;
      font-size: 14px;
    }
  }
}
</style>
