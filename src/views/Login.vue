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
      <p class="login-desc">账号：<v-text-field label="用户名/邮箱/手机号" hide-details="auto"></v-text-field></p>
      <p class="login-desc">密码: <v-text-field label="输入6-16位数字/字母/符号" type="password"></v-text-field></p>
      <v-btn block depressed large color="primary" class="login-btn">登录</v-btn>
    </div>
    <div class="register">
      <div>忘记密码</div>|<div @click="handleRegisterClick">无账号？</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    handleRegisterClick () {
      this.$router.push('register')
    },
    handleBackClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
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
