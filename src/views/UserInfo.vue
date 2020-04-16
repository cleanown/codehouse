<template>
  <div>
    <v-app-bar
      color="deep-purple"
      dark
      class="headers"
    >
      <v-icon style="margin-right: 10px" @click="$router.go(-1)">mdi-chevron-left</v-icon>
      <v-toolbar-title>用户信息</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-delete-forever-outline</v-icon>
      </v-btn>
      <v-btn icon @click="User" v-if="admin">
        <v-icon>mdi-account-hard-hat</v-icon>
      </v-btn>
      <v-btn icon @click="Admin" v-else>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <user-detail />

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">提示！！！</v-card-title>

        <v-card-text class="infors">
          {{ adminuser }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            取消
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      :color="snackcolor"
      class="alertshow"
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
import UserDetail from '../components/user/userdetail'
export default {
  name: 'userinfo',
  data () {
    return {
      admin: true,
      snackbar: false,
      timeout: 2000,
      snackcolor: '#999',
      text: '',
      dialog: '',
      adminuser: ''
    }
  },
  components: {
    UserDetail
  },
  mounted: {
    dialog () {
      this.dialogJudge()
    }
  },
  methods: {
    dialogJudge () {
      if (this.$store.state.userinfo.role === 1) {
        console.log(this.$store.state.userinfo)
        this.dialog = false
      }
    },
    User () {
      this.admin = false
      this.dialog = true
      this.adminuser = '将该用户降为普通用户？'
    },
    Admin () {
      this.admin = true
      this.dialog = true
      this.adminuser = '将该用户升为超级管理员？'
    }
  }
}
</script>

<style lang="scss">
.headers{
  position: fixed;
  z-index: 3;
}
.alertshow{
  margin-top: 56px;
}
.headline{
  color: rgb(226, 33, 33);
}
.infors{
  font-size: 16px;
  line-height: 16px;
  text-indent: 2rem;
}
</style>
