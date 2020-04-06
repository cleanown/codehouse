<template>
  <div>
    <v-toolbar class="header">
      <v-btn icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>发布新内容</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="containter"></div>
  </div>
</template>

<script>
export default {
  name: 'release'
}
</script>

<style lang="scss">
  .header{
    position: fixed;
    width: 100%;
  }
  .containter{
    margin-top: 56px;
  }
</style>
