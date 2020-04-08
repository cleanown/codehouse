<template>
  <div>
    <v-toolbar>
      <v-btn icon @click="handleBackClick">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title @click="handleLoginClick">注册</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-update</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="login">
      <p class="login-title">Code House</p>
      <p>
        用户名：
        <v-text-field
          label="输入4-10位用户名"
          hide-details="auto"
          v-model="username"
          @mouseout="nameOutActive"
          >
        </v-text-field>
      </p>
      <p>
        密码:
        <v-text-field
          label="输入6-16位数字/字母/符号"
          type="password"
          @mouseout="pwdOutActive"
          counter="16"
          v-model="password"
          >
        </v-text-field>
      </p>
      <p>
        确认密码:
        <v-text-field
          label="重复输入密码"
          type="password"
          v-model="repwd"
          @mouseout="repwdOutActive"
          >
        </v-text-field>
      </p>
      <p>
        <v-btn
          block
          depressed
          large
          color="primary"
          class="login-btn"
          @click="handleRestartClick"
          >
          重置
        </v-btn>
      </p>
      <v-btn
        block
        depressed
        large
        color="primary"
        class="login-btn"
        @click="handleRegisterClick"
        >
        注册
      </v-btn>
    </div>
    <div class="register">
      <div>登录</div>|<div>无账号？</div>
    </div>
    <v-snackbar
      v-model="snackbar"
      top
      :timeout="timeout"
      class='tips'
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      repwd: '',
      snackbar: false,
      text: '',
      timeout: 2000
    }
  },
  watch: {
    username (val) {
      console.log(val)
    },
    password (val) {
      console.log(val)
    },
    repwd (val) {
      console.log(val)
    }
  },
  methods: {
    handleBackClick () {
      this.$router.go(-1)
    },
    handleLoginClick () {
      this.$router.push('/login')
    },
    nameOutActive () {
      const countsReg = /^.{4,10}$/
      if (!countsReg.test(this.username)) {
        this.snackbar = true
        this.text = '请输入4-10位用户名'
      }
    },
    pwdOutActive () {
      const countsReg = /^.{4,16}$/
      const letterReg = /^(?![A-Za-z]+$)*(?![0-9]+$)*/
      if (!countsReg.test(this.password)) {
        this.snackbar = true
        this.text = '请输入4-16位密码'
      } else if (!letterReg.test(this.password)) {
        this.snackbar = true
        this.text = '密码需有字母和数字组合'
      }
      return true
    },
    repwdOutActive () {
      if (!(this.repwd === this.password)) {
        console.log('repwd')
        this.snackbar = true
        this.text = '输入密码不一致'
        this.repwd = ''
      }
    },
    handleRestartClick () {
      this.username = ''
      this.password = ''
      this.repwd = ''
    },
    handleRegisterClick () {
      const url = 'http://cleanown.cn:3000/user/sign'
      const registerdata = {
        username: this.username,
        password: this.password
      }
      this.$http.post(url, registerdata).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
.tips{
    margin-top: 56px;
  }
.login{
  margin: 20px;
  .login-title{
    text-align: center;
    top: 0;
    font-size: 35px;
    margin: 25px auto;
    color: rgb(25, 159, 248);
  }
  .login-btn{
    margin-top: 30px;
  }
}
.register{
  padding-top: 20px;
  color: blue;
  display: flex;
  justify-content: center;
  :nth-child(1){
    margin-right: 10px;
  }
  :nth-child(2){
    margin-left: 10px;
  }
}
</style>
