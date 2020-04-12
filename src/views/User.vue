<template>
  <div class="home">
    <v-app-bar
      color="deep-purple"
      dark
      class="header"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>个人中心</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">cleanown</v-list-item-title>
            <v-list-item-subtitle>cleanown@outlook.com</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <myuser />

    <v-bottom-navigation
      v-model="bottomNav"
      class="nav"
      grow
      app
      color="deep-purple"
    >
      <v-btn value="search">
        <span>搜索</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn value="release">
        <span>发布</span>
        <v-icon>mdi-newspaper</v-icon>
      </v-btn>

      <v-btn value="user">
        <span>个人中心</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import myuser from '../components/user/myuser'
export default {
  name: 'User',
  components: {
    myuser
  },
  data () {
    return {
      bottomNav: 'user',
      drawer: false,
      group: false,
      item: 0,
      items: [
        { text: '我的文件', icon: 'mdi-folder' },
        { text: '分享', icon: 'mdi-account-multiple' },
        { text: '收藏', icon: 'mdi-star' },
        { text: '历史记录', icon: 'mdi-history' },
        { text: '离线文件', icon: 'mdi-check-circle' },
        { text: '上传', icon: 'mdi-upload' },
        { text: '退出登录', icon: 'mdi-cloud-upload' }
      ]
    }
  },
  watch: {
    bottomNav (val, oldVal) {
      this.$router.push({
        name: val
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
  position: fixed;
  z-index: 3;
  opacity: 0.5;
}
.nav{
  align-items: center;
}
</style>
