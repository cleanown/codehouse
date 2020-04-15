<template>
  <div class="home">
    <div class="headerArea">
      <v-text-field
        label="输入用户的相关信息"
        prepend-inner-icon="mdi-cloud-search-outline"
        solo
        v-model="searchvalue"
        clearable
        hide-details
        icon
      >
      <template v-slot:append>
        <v-btn
          icon
          @click="handleSearchClick"
        >
          <v-icon>mdi-table-search</v-icon>
        </v-btn>
      </template>
      </v-text-field>
    </div>

    <v-list
      class="searchlist"
      v-show="!wait"
      >
      <v-list-item
        v-for="(item, index) in userlist"
        :key="index"
        class="list"
        style="border-bottom: 1px solid #eee"
        @click="$router.push({path: '/userinfo'})"
      >
        <v-list-item-avatar>
          <v-img src="../../assets/imgs/1.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.username"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action size="80" height="40">
          <span v-if="item.role === 1">普通用户</span>
          <span v-if="item.role === 2">超级管理员</span>
          <!-- <v-list-item-title v-text="item.role"></v-list-item-title> -->
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <div class="wait">
      <v-progress-circular
        class="wait-progress"
        :size="100"
        :width="3"
        indeterminate
        color="deep-purple"
        v-show="wait"
      >
        加载中...
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: 'usermg',
  data () {
    return {
      searchvalue: '',
      wait: false,
      userlist: [{
        username: 'claennasdf',
        role: 1
      }, {
        username: 'aaaa',
        role: 1
      }, {
        username: 'dddd',
        role: 2
      }, {
        username: 'cffff',
        role: 2
      }, {
        username: 'ccccf',
        role: 1
      }]
    }
  },
  methods: {
    handleSearchClick () {
      console.log('111')
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  margin-top: 56px;
  padding: 10px;
  .headerArea {
    margin-top: 56px;
    background: #fff;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    height: 68px;
    width: 100%;
    padding: 10px 20px;
  }
  .searchlist{
    margin-top: 56px;
  }
}
</style>
