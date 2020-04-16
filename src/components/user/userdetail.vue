<template>
  <div class="home">
    <div>
      <div class="heads">
        <div class="head">
          <img class="head-img" :src="userinfo.headimg" />
        </div>
      </div>
    </div>

    <div class="infos">
      <h3>用户名：</h3>
      <v-text-field
        single-line
        v-model="username"
        :rules="[rules.min, rules.max]"
        :placeholder="userinfo.username"
        :disabled="disabled"
        clearable
        counter
      ></v-text-field>
      <!-- <h3>密码：</h3>
      <v-text-field
        label="123456789"
        single-line
        :readonly="readonly"
        clearable
      >
      </v-text-field> -->
      <h3>
        用户级别:
        (
          <span v-if="roleJudge" class="role">普通用户</span>
          <span v-else class="role">管理员</span>
        )
      </h3>
      <v-radio-group
        v-model="radios"
        :readonly="disabled"
        :mandatory="false"
      >
        <v-radio label="普通用户" value="1"></v-radio>
        <v-radio label="管理员" value="2"></v-radio>
      </v-radio-group>
    </div>

    <div class="btn">
      <p>
        <v-btn
          block
          depressed
          large
          color="primary"
          class="login-btn"
          @click="modifyClick"
          >
          {{change}}
        </v-btn>
      </p>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">提示！！！</v-card-title>

        <v-card-text class="infors">
          确定将该用户提升为管理员？
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
            @click="adoptClick"
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
export default {
  name: 'userdetail',
  props: {
    userinfo: Object
  },
  data () {
    return {
      disabled: true,
      radios: '',
      change: '修改',
      username: this.userinfo.username,
      rules: {
        min: v => v.length >= 2 || '用户名少于2位',
        max: v => v.length <= 10 || '用户名长度超过限制'
      },
      roleJudge: true,
      dialog: false,
      snackbar: false,
      timeout: 2000,
      snackcolor: '#999',
      text: ''
    }
  },
  watch: {
    username (val) {
      console.log(val)
    }
  },
  mounted () {
    this.roleJudges()
  },
  methods: {
    roleJudges () {
      if (this.userinfo.role === 1) {
        this.roleJudge = true
      } else {
        this.roleJudge = false
      }
    },
    modifyClick () {
      if (this.change === '修改') {
        this.radios = '1'
        this.disabled = false
        this.change = '确认修改'
        // console.log(this.userinfo)
        // console.log(this.radios)
      } else if (!this.username) {
        this.snackbar = true
        this.text = '用户名不能为空'
      } else if (this.radios === '2') {
        this.dialog = true
      } else {
        this.adoptClick()
      }
    },
    adoptClick () {
      this.dialog = false
      this.snackbar = true
      this.text = '修改成功'
      const url = `${config.online}/user/changerole`
      const datas = {
        newUsername: this.username,
        newRole: this.radios,
        userId: this.userinfo._id
      }
      const res = this.$http.put(url, datas)
      console.log(res)
      setTimeout(() => {
        this.$router.go(-1)
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  margin-top: 56px;
  width: 100%;
  .heads{
    display: flex;
    justify-content: center;
    width: 100%;
    background: url('https://cdn.vuetifyjs.com/images/parallax/material.jpg');
    background-size: 100% 100%;
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    .head{
      margin: 10px;
      width: 30%;
      .head-img{
        border-radius: 50%;
        box-shadow: 3px 3px 3px #000;
        width: 100%;
      }
    }
  }
  .infos{
    padding: 20px;
    width: 100%;
    .role{
      font-size: 16px;
      color: red;
    }
  }
  .btn{
    width: 100%;
    padding: 20px;
  }
  .headline{
    color: rgb(247, 18, 18);
  }
  .infors{
    font-size: 25px;
    line-height: 25px;
    text-indent: 2rem;
  }
}
</style>
