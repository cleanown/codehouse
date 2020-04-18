<template>
  <div class="home">
    <div class="timeline">
      <v-timeline
        dense
      >
        <v-timeline-item
          small
          v-for="(item, i) in article"
          :key="i"
        >
          <v-card @click="goDetail(item._id)">
            <div class="heads">
              <span class="titles">{{item.companyname}}</span><br>
              <span class="datas">发布时间：{{$moment(item.meta.createAt).format('lll')}}</span>
            </div>
            <v-card-text>
              {{item.companydetail}}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>
  </div>
</template>

<script>
import config from '../../request/config'
export default {
  name: 'myarticle',
  data () {
    return {
      article: {}
    }
  },
  mounted () {
    this.apiGetClick()
  },
  methods: {
    async apiGetClick () {
      const url = `${config.online}/search/companylist`
      const res = await this.$http.get(url)
      this.article = res.data.data
      console.log(this.article)
    },
    goDetail (id) {
      this.$router.push({
        path: '/articledetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  margin-top: 56px;
  padding-right: 20px;
  width: 100%;
  .timeline{
    width: 100%;
    .heads{
      background: #eee;
      padding: 15px;
      .titles{
        line-height: 18px;
        font-size: 18px;
        font-weight: bolder;
      }
      .datas{
        font-size: 12px;
      }
    }
  }
}
</style>
