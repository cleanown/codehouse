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
      <input type="file" :v-model="imgUrl" />
      <div class="city">
        <p>地址：</p>
        <el-cascader
          class="cascader"
          :options="options"
          clearable
          v-model="selectedOptions"
          @change="handleChange"
          >
        </el-cascader>
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
import { regionDataPlus, CodeToText } from 'element-china-area-data'
// provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode
export default {
  name: 'release',
  data () {
    return {
      options: regionDataPlus,
      selectedOptions: [],
      companyname: '',
      companydetail: '',
      imgUrl: [],
      province: '',
      city: '',
      county: '',
      address: ''
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
    }
  },
  methods: {
    handleBackClick () {
      this.$router.go(-1)
    },
    handleHomeClick () {
      this.$router.push('/')
    },
    handleChange (val) {
      this.province = CodeToText[this.selectedOptions[0]]
      this.city = CodeToText[this.selectedOptions[1]]
      this.county = CodeToText[this.selectedOptions[2]]
    },
    handlePostClick () {
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
