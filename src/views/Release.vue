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
      <p>公司：</p>
      <v-text-field label="输入公司全称" v-model="companyname"></v-text-field>
      <p>内容：</p>
      <v-textarea
          solo
          name="input-7-4"
          label="输入相关描述"
          v-model="companydetail"
        ></v-textarea>
        <p>上传图片：</p>
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
        ></v-file-input>
      <div class="city">
        <p>地址：</p>
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="What state are you from?"
          solo-inverted
        ></v-autocomplete>
        <p>详细地址:</p>
        <v-text-field
          label="详细地址：如道路、门牌号、小区等"
          v-model="address"
          outlined
          dense
          style="opacity: 0.8"
          >
        </v-text-field>
      </div>
      <v-btn
        block
        depressed
        large
        color="primary"
        class="containter-btn"
        @click="handlePostClick"
        >
        发布
      </v-btn>
    </div>
  </div>
</template>

<script>
import { provinceAndCityData } from 'element-china-area-data'
// provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode
export default {
  name: 'release',
  data () {
    return {
      companyname: '',
      companydetail: '',
      imgUrl: [],
      province: '',
      city: '',
      county: '',
      address: '',
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      loading: false,
      items: provinceAndCityData,
      search: null,
      select: null,
      states: provinceAndCityData
    }
  },
  watch: {
    companyname (val) {
      // console.log(val)
    },
    companydetail (val) {
      // console.log(val)
    },
    imgUrl (val) {
      console.log(val)
    },
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
    states (val) {
      console.log(val)
    }
  },
  methods: {
    handleBackClick () {
      this.$router.go(-1)
    },
    handleHomeClick () {
      this.$router.push('/')
    },
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
    handlePostClick () {
      this.lays = true
      console.log(this.companyname)
      console.log(this.companydetail)
      console.log(this.province)
      console.log(this.city)
      console.log(this.county)
      console.log(this.address)
      // const url = 'http://api.cleanown.cn/user/company'
      // this.$http.post(url, {
      //   images: this.images,
      //   companyname: this.companyname,
      //   companydetail: this.companydetail
      // }).then((res) => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  width: 100%;
  z-index: 3;
}
.containter{
  margin: 56px 20px 0 20px;
  padding-top: 20px;
  p{
    font-weight: bolder;
  }
  .city{
    margin-top: 20px;
    .cascader{
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .containter-btn{
    margin-bottom: 56px;
  }
}
</style>
