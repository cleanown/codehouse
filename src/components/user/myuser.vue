<template>
  <div class="home">
    <div class="navtop">
      <div class="header">
        <div class="head">
          <v-img class="head-img"
            src="https://cdn.vuetifyjs.com/images/john.png"
            @click="this.login = !this.login"
            >
          </v-img>
        </div>
        <div v-if="login">
          <div class="username">cleanown</div>
          <div>邮箱：cleanown@outlook.com</div>
        </div>
        <div v-else class="nologin" @click="handleLoginClick">
          未登录...
        </div>
      </div>
      <div class="box">
        <div class="boxitem">
          <div class="boxitem-num">424</div>
          <div class="boxitem-desc">获赞</div>
        </div>|
        <div class="boxitem">
          <div class="boxitem-num">22</div>
          <div class="boxitem-desc">评论</div>
        </div>|
        <div class="boxitem">
          <div class="boxitem-num">3</div>
          <div class="boxitem-desc">@我的</div>
        </div>
      </div>
    </div>

    <v-list
      dense
      >
      <v-subheader style="border-bottom: 1px solid #ccc">我的</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          class="userlist"
        >
          <v-list-item-icon style="height: 42px">
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      item: false,
      items: [
        { text: '发布记录', icon: 'mdi-clock' },
        { text: '查询记录', icon: 'mdi-magnify' },
        { text: '我的收藏', icon: 'mdi-star' },
        { text: '人工服务', icon: 'mdi-account-circle' },
        { text: '设置', icon: 'mdi-wrench' }
      ],
      login: false
    }
  },
  methods: {
    handleLoginClick () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  margin-top: 56px;
  margin-bottom: 56px;
  .navtop{
    background: rgb(225, 239, 252);
    .header{
      display: flex;
      padding: 20px;
      .head{
        margin-right: 30px;
        width: 68px;
        height: 68px;
      }
      .head-img{
        border-radius: 34px;
      }
      .username{
        line-height: 40px;
        font-size: 22px;
        font-weight: bolder;;
      }
      .nologin{
        margin-top: 30px;
        font-size: 30px;
        line-height: 30px;
      }
    }
  }
  .box{
    position: relative;
    display: flex;
    height: 96px;
    margin: 10px;
    bottom: 10px;
    background: rgb(203, 219, 243);
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    box-shadow: 1px 1px 1px rgb(185, 182, 182);
    .boxitem{
      // background: chocolate;
      height: 86px;
      border-radius: 5px;
      width: 86px;
      text-align: center;
      .boxitem-num{
        margin-top: 17px;
        // margin-bottom: 15px;
        font-size: 20px;
        color: #000;
      }
      .boxitem-desc{
        margin-top: 2px;
        font-size: 13px;
        color: rgb(6, 15, 141);
      }
    }
  }
  .userlist{
    border-bottom: 1px solid #eee;
    margin: 5px;
  }
}
</style>
