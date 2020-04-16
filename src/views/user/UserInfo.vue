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
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-delete-forever-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <user-detail :userinfo="userinfo"/>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">提示！！！</v-card-title>

        <v-card-text class="infors">
          确定删除该用户？
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
            @click="deleteUserClick"
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
import config from '../../request/config'
import UserDetail from '../../components/user/userdetail'
export default {
  name: 'userinfo',
  data () {
    return {
      userinfo: this.$route.query.userinfo,
      snackbar: false,
      timeout: 2000,
      snackcolor: '#999',
      text: '',
      dialog: ''
    }
  },
  components: {
    UserDetail
  },
  methods: {
    async deleteUserClick () {
      const url = `${config.online}/user/deleteuser`
      const data = {
        params: {
          userid: this.$route.query.userinfo._id
        }
      }
      const res = await this.$http.delete(url, data)
      console.log(res)
      if (res.data.code === 200) {
        this.dialog = false
        this.snackbar = true
        this.text = res.data.msg
        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)
      } else {
        this.snackbar = true
        this.text = res.data.msg
      }
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
  color: rgb(247, 18, 18);
}
.infors{
  font-size: 25px;
  line-height: 25px;
  text-indent: 2rem;
}
</style>
