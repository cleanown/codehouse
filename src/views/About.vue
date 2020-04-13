<template>
  <div>
    <v-toolbar class="header">
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>关于</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push({path: '/'})">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="d-flex flex-column align-center justify-center" :style="`height: ${$vuetify.breakpoint.height-100}px`">
      <span class="headline">该项目由陈乐恩个人开发</span>
      <span class="subtitle py-4">愿每个准程序员都能找到合适的工作</span>
      <span class="subtitle">愿世界更美好</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
