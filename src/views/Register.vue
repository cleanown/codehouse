<template>
  <div>
    <v-toolbar>
      <v-btn icon>
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
      <p>账号：<v-text-field label="用户名/邮箱/手机号" hide-details="auto"></v-text-field></p>
      <p>密码: <v-text-field label="输入6-16位数字/字母/符号" type="password"></v-text-field></p>
      <p>确认密码: <v-text-field label="重复输入密码" type="password"></v-text-field></p>
      <p>邮箱：<v-text-field label="输入有效的邮箱" hide-details="auto"></v-text-field></p>
      <v-btn block depressed large color="primary" class="login-btn">注册</v-btn>
    </div>
    <div class="register">
      <div>登录</div>|<div>无账号？</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register'
}
</script>

<style lang="scss">
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
