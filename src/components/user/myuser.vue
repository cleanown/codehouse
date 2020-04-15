<template>
  <div class="home">

    <div class="navtop">
      <div class="header">
        <div class="head">
          <v-img class="head-img"
            :src="this.$store.state.userinfo.headimg"
            >
          </v-img>
        </div>
        <div>
          <div class="username">{{this.$store.state.userinfo.username}}</div>
          <div>邮箱：cleanown@outlook.com</div>
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
      <v-subheader class="list-title">我的</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          v-show="item.role <= $store.state.userinfo.role"
          class="userlist"
          @click="handleListClick(item.id)"
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
    <div class="logout">
      <v-btn
        color="deep-purple lighten-3"
        width="100%"
        large
        @click="handlelogOut"
      >
        退出登录
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      item: false,
      items: [
        { id: 0, text: '发文管理', icon: 'mdi-text-box-multiple', role: 2 },
        { id: 1, text: '用户管理', icon: 'mdi-account-circle', role: 2 },
        { id: 2, text: '收藏', icon: 'mdi-star', role: 1 },
        { id: 3, text: '设置', icon: 'mdi-cog', role: 1 },
        { id: 4, text: '关于', icon: 'mdi-information-outline', role: 1 }
      ],
      manage: false
    }
  },
  methods: {
    handleListClick (id) {
      switch (id) {
        case 0:
          this.$router.push({
            path: '/articlemanage'
          })
          break
        case 1:
          this.$router.push({
            path: '/usermanage'
          })
          break
        case 4:
          this.$router.push({
            path: '/about'
          })
          break
      }
    },
    handlelogOut () {
      window.localStorage.removeItem('token')
      this.$router.push({
        path: '/login'
      })
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
        font-size: 30px;
        line-height: 68px;
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
  .list-title{
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    font-weight: bolder;
  }
  .userlist{
    border-bottom: 1px solid #eee;
    margin: 5px;
  }
  .logout{
    width: 100%;
    padding: 10px;
    color: #fff
  }
}
</style>
