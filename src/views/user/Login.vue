<template>
  <div>
    <v-toolbar>
      <v-btn icon @click="handleBackClick">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>登录</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-update</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="login">
      <p class="login-title">Code House</p>
      <p class="login-desc">
        用户名：
      <v-text-field
        clearable
        label="输入昵称"
        hide-details="auto"
        v-model="username"
        >
      </v-text-field></p>
      <p class="login-desc">
        密码:
        <!-- <v-text-field
        clearable
        label="输入6-16位数字/字母/符号"
        type="password"
        v-model="password"
        counter="16"
        @mouseout="pwdOutActive"
        @keyup.enter="handleLoginClick"
        >
        </v-text-field> -->
        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min, rules.max]"
          :type="show ? 'text' : 'password'"
          label="输入6-16位数字/字母/符号"
          counter
          @keyup.enter="handleLoginClick"
          @click:append="show = !show"
        ></v-text-field>
      </p>
      <v-btn
        block
        depressed
        large
        color="primary"
        class="login-btn"
        @click="handleLoginClick"
        >
        登录
      </v-btn>
    </div>
    <div class="register">
      <div>忘记密码</div>|<div @click="handleRegisterClick">无账号？</div>
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
import config from '../../request/config'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      show: false,
      rules: {
        required: value => !!value || '密码不能为空',
        min: v => v.length >= 6 || '密码少于6位',
        max: v => v.length <= 16 || '密码长度超过限制'
      },
      snackbar: false,
      text: '',
      timeout: 2000
    }
  },
  methods: {
    handleRegisterClick () {
      this.$router.push('register')
    },
    handleBackClick () {
      this.$router.go(-1)
    },
    // pwdOutActive () {
    //   const countsReg = /^.{4,16}$/
    //   const letterReg = /^(?![A-Za-z]+$)*(?![0-9]+$)*/
    //   if (!countsReg.test(this.password)) {
    //     this.snackbar = true
    //     this.text = '请输入4-16位密码'
    //   } else if (!letterReg.test(this.password)) {
    //     this.snackbar = true
    //     this.text = '密码需有字母和数字组合'
    //   }
    //   return true
    // },
    handleLoginClick () {
      const url = `${config.online}/user/login`
      this.$http.post(url, {
        username: this.username,
        password: this.password
      }).then(({ data }) => {
        console.log(data)
        if (data.code === 200) {
          localStorage.setItem('token', data.data.id)
          this.$router.push({
            path: '/'
          })
        } else {
          this.snackbar = true
          this.text = data.msg
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tips{
    margin-top: 56px;
  }
  .login{
    margin: 20px;
    .login-title{
      text-align: center;
      top: 0;
      font-size: 45px;
      margin: 40px auto;
      color: rgb(25, 159, 248);
    }
    .login-desc{
      font-size: 20px;
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
