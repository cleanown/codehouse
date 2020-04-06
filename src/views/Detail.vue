<template>
  <div>
    <v-toolbar class="header">
      <v-btn icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleHomeClick">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="container"></div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      title: '详情'
    }
  },
  methods: {
    handleHomeClick () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  width: 100%
}
.containter{
  margin: 56px 20px 0 20px;
  padding-top: 20px;
}
</style>
