<template>
  <div class="home">
    <div class="headerArea">
      <v-text-field
        label="输入你想查询的公司"
        prepend-inner-icon="mdi-cloud-search-outline"
        solo
        v-model="searchvalue"
        clearable
        hide-details
      >
      </v-text-field>
    </div>
    <v-list
      class="searchlist"
      v-show="!wait"
      >
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        class="list"
        @click="goDetail(item._id)"
        style="border-bottom: 1px solid #eee"
      >
        <v-list-item-icon>
          {{index + 1}}
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.companyname"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar size="80" height="40">
          <v-list-item-title v-text="item.city"></v-list-item-title>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>

    <div class="wait">
      <v-progress-circular
        class="wait-progress"
        :size="100"
        :width="3"
        indeterminate
        color="deep-purple"
        v-show="wait"
      >
        加载中...
      </v-progress-circular>
    </div>

  </div>
</template>

<script>
import config from '../../request/config'
export default {
  name: 'articlesearch',
  data () {
    return {
      searchvalue: '',
      items: [],
      wait: true
    }
  },
  watch: {
    searchvalue (val, oldVal) {
      this.searchItem()
    }
  },
  mounted () {
    this.searchItem()
  },
  methods: {
    handleSearchClick () {
      this.items = this.items.filter((obj) => {
        return obj.title.indexOf(this.searchvalue) !== -1
      })
    },
    searchItem () {
      const url = `${config.online}/search/companylist`
      this.$http.get(url, {
        params: {
          key: this.searchvalue
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.items = res.data.data
          this.wait = false
          console.log(res.data)
        }
      })
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
.v-progress-circular {
  margin: 1rem;
}
.home{
  margin-bottom: 56px;
  padding: 10px;
  .headerArea {
    background: #fff;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    height: 68px;
    width: 100%;
    padding: 10px 20px;
  }
  .wait{
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 260px;
  }
}
.searchlist{
  margin-top: 48px;
}
</style>
