<template>
  <div>
    <v-toolbar class="header">
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>发布新内容</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push({path: '/'})">
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
      <div class="box">
        <div
          class="box-item"
          v-for="(item, index) of detailimg"
          :key="index"
        >
          <v-overlay
            :absolute="absolute"
            :value="overlay"
            width="100%"
            height="100%"
            @click="overlay = false"
          >
            <v-btn
              color="#fff"
              icon
              v-model="item.index"
              @click="ImgDelete(index)"
            >
              <v-icon>
                mdi-delete-forever
              </v-icon>
            </v-btn>
          </v-overlay>
          <v-img
            aspect-ratio="1"
            class="box-item-img"
            :src="item"
            alt="图片加载失败"
            @click="ImgUpdata(index)"
          />
        </div>
        <div class="inp">
          <v-file-input
            class="inp-file"
            full-width
            outlined
            accept="image/png, image/jpeg, image/bmp"
            v-model="file"
            @change="imgPost(file)"
          ></v-file-input>
          <v-img class="inp-img" src="../assets/add.png" />
        </div>
      </div>
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
      file: [],
      options: provinceAndCityData,
      province: '',
      city: '',
      address: '',
      snackbar: false,
      text: '',
      timeout: 2000,
      detailimg: [],
      absolute: true,
      overlay: false
    }
  },
  watch: {
    overlay (val) {
      console.log(val)
      if (val === true) {
        setTimeout(() => {
          this.overlay = false
        }, 2000)
      }
    }
  },
  methods: {
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
    ImgUpdata (index) {
      this.overlay = true
      console.log(index)
    },
    ImgDelete (index) {
      this.overlay = false
      this.detailimg.splice(index, 1)
      console.log(index)
    },
    async handlePostClick () {
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
        const data = {
          companyname: this.companyname,
          companydetail: this.companydetail,
          province: this.province.label,
          city: this.city.label
        }
        const res = await this.$http.post(url, data)
        console.log(res)
        if (res.data.code === 200) {
          this.snackbar = true
          this.text = res.data.msg
          setTimeout(() => {
            console.log('1500')
            this.$router.push('/')
          }, 2000)
        }
      }
    },
    async imgPost (file) {
      if (this.detailimg.length > 6) {
        this.snackbar = true
        this.text = '上传图片不得超过5张'
      } else if (this.file.size > 2000000) {
        this.snackbar = true
        this.text = '图片质量不得大于2M'
      } else {
      // 预览图片
        let imgUrl
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          console.log(e)
          imgUrl = e.target.result
          this.detailimg.unshift(imgUrl)
        }
      }
      // 上传图片
      const formData = new FormData()
      formData.append('file', this.file)
      const url = `${config.online}/upload/img`
      const res = await this.$http.post(url, formData)
      console.log(res)
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
  .box{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .inp{
      position: relative;
      width: 32%;
      height: 32%;
      margin: 2px;
      display: flex;
      .inp-img{
        width: 100%;
        height: 100%;
      }
      .inp-file{
        width: 100%;
        height: 100%;
        // opacity: 0;
        top: 32%;
        z-index: 3;
        position: absolute;
      }
    }
    .box-item{
      position: relative;
      width: 32%;
      height: 32%;
      margin: 2px;
      .box-item-img{
        width: 100%;
        height: 100%;
      }
      .dialog{
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
  .containter-btn{
    margin-bottom: 56px;
  }
}
</style>
