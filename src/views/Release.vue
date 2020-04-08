<template>
  <div>
    <v-toolbar class="header">
      <v-btn icon @click="handleBackClick">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>发布新内容</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleHomeClick">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="containter">
      <p>标题：</p>
      <v-text-field label="输入标题"></v-text-field>
      <p>内容：</p>
      <v-textarea
          solo
          name="input-7-4"
          label="输入内容"
        ></v-textarea>
        <p>上传图片：</p>
      <input type="file" />
      <v-btn block depressed large color="primary" class="containter-btn">发布</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'release',
  methods: {
    handleBackClick () {
      this.$router.go(-1)
    },
    handleHomeClick () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  .header{
    position: fixed;
    width: 100%
  }
  .containter{
    margin: 56px 20px 0 20px;
    padding-top: 20px;
    p{
      font-weight: bolder;
    }
    .containter-btn{
      margin-top: 40px;
    }
  }
</style>
