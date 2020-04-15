<template>
  <div class="home">
    <div>
      <div class="heads">
        <div class="head">
          <img class="head-img" src="../../assets/imgs/1.jpg" />
        </div>
      </div>
    </div>

    <div class="infos">
      <h3>用户名：</h3>
      <v-text-field
        label="cleanown"
        single-line
        :readonly="readonly"
        clearable
      >
        <template v-slot:append-outer>
          <v-icon @click="readonly = !readonly" v-if="!readonly">mdi-close</v-icon>
          <v-icon @click="readonly = !readonly" v-else>mdi-pencil</v-icon>
        </template>
      </v-text-field>
      <h3>密码：</h3>
      <v-text-field
        label="123456789"
        single-line
        :readonly="readonly"
        clearable
      >
        <template v-slot:append-outer>
          <v-icon @click="readonly = !readonly" v-if="!readonly">mdi-close</v-icon>
          <v-icon @click="readonly = !readonly" v-else>mdi-pencil</v-icon>
        </template>
      </v-text-field>
      <h3>手机号/邮箱：</h3>
      <v-text-field
        label="123456789@qq.com"
        single-line
        :readonly="readonly"
        clearable
      >
        <template v-slot:append-outer>
          <v-icon @click="readonly = !readonly" v-if="!readonly">mdi-close</v-icon>
          <v-icon @click="readonly = !readonly" v-else>mdi-pencil</v-icon>
        </template>
      </v-text-field>
      <h3>性别：</h3>
      <v-radio-group v-model="radios" :mandatory="false">
        <v-radio label="男" value="male"></v-radio>
        <v-radio label="女" value="female"></v-radio>
      </v-radio-group>
      <h3>出生日期</h3>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title scrollable
          :max="dateNow"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">取消</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">确认</v-btn>
        </v-date-picker>
      </v-menu>
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
          确认修改
        </v-btn>
      </p>
      <v-btn
        block
        depressed
        large
        color="primary"
        class="login-btn"
        @click="$router.push({path: '/user'})"
        >
        放弃修改
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userdetail',
  data () {
    return {
      userinfo: {
        username: 'cleanown',
        password: '12345678'
      },
      readonly: true,
      radios: 'male',
      dateNow: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),
      menu: false
    }
  },
  watch: {
    radios (val) {
      console.log(val)
    },
    date (val) {
      console.log(val)
    }
  },
  methods: {
    modifyClick () {},
    giveupClick () {}
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
  }
  .btn{
    width: 100%;
    padding: 20px;
  }
}
</style>
