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
      <v-text-field
        label="输入公司全称"
        v-model="companyname"
        @mouseout="companynameReg"
      >
      </v-text-field>
      <p>内容：</p>
      <v-textarea
          solo
          name="input-7-4"
          label="输入相关描述"
          v-model="companydetail"
          @mouseout="companydetailReg"
        ></v-textarea>
        <p>上传图片：</p>
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          v-model="imgs"
        ></v-file-input>
      <div class="city">
        <p>地址：</p>
        <div class="d-flex">
          <v-autocomplete
            :items="options"
            item-text="label"
            v-model="province"
            label="省份"
            @change="handleChange"
            return-object
            style="margin-right: 20px"
          ></v-autocomplete>
          <v-autocomplete
            :items="this.province.children"
            item-text="label"
            v-model="city"
            @change="handleChange"
            label="城市"
            no-data-text="请先选择省"
            return-object
          ></v-autocomplete>
        </div>
        <p>详细地址:</p>
        <v-text-field
          label="请尽量详细"
          v-model="address"
          outlined
          dense
          style="opacity: 0.8"
          @mouseout="addressReg"
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
import config from '../request/config'
import { provinceAndCityData } from 'element-china-area-data'
// provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode
export default {
  name: 'release',
  data () {
    return {
      companyname: '',
      companydetail: '',
      imgs: [],
      province: '',
      city: '',
      address: '',
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      options: provinceAndCityData,
      snackbar: false,
      text: '',
      timeout: 2000
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
      console.log(val.label)
    },
    companynameReg () {
      const cnReg = /^.{2,15}$/
      if (!cnReg.test(this.companyname)) {
        this.snackbar = true
        this.text = '请输入2-15位公司名'
      }
    },
    addressReg () {
      const adReg = /^.{2,}$/
      if (!adReg.test(this.companyname)) {
        this.snackbar = true
        this.text = '请输入2位以上'
      }
    },
    companydetailReg () {
      const dtlength = this.companydetail.length
      if (dtlength < 2) {
        this.snackbar = true
        this.text = '请输入2位以上'
      } else if (dtlength > 4000) {
        this.snackbar = true
        this.text = '输入长度过长'
      }
    },
    handlePostClick () {
      console.log(this.companyname)
      console.log(this.companydetail)
      console.log(this.imgs)
      console.log(this.province.label)
      console.log(this.city.label)
      console.log(this.address)
      if (!this.companyname) {
        this.snackbar = true
        this.text = '请输入公司名称'
      } else if (!this.companydetail) {
        this.snackbar = true
        this.text = '请输入相关内容'
      } else if (!this.province || !this.city) {
        this.snackbar = true
        this.text = '请输入城市地址'
      } else if (!this.address) {
        this.snackbar = true
        this.text = '请输入详细地址'
      } else {
        const url = `${config.online}/company/add`
        this.$http.post(url, {
          companyname: this.companyname,
          companydetail: this.companydetail,
          province: this.province.label,
          city: this.city.label
        }).then((res) => {
          res = res.data
          console.log(res)
          if (res.success || res.data) {
            this.snackbar = true
            this.text = '发布成功，等待审核'
            this.$router.push('/user')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tips{
  margin-top: 56px;
}
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
