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
        <template v-slot:append>
          <v-btn icon color="#ccc" @click="handleSearchClick">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </div>
    <v-list
      class="searchlist"
      >
      <v-list-item
        v-for="(item, index) in itemscopy"
        :key="index"
      >
        <v-list-item-icon>
          {{index + 1}}
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar>
          <v-list-item-title v-text="item.avatar"></v-list-item-title>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'searchArea',
  data () {
    return {
      searchvalue: '',
      items: [
        { title: 'Jason Oner', avatar: '江西' },
        { title: 'Travis Howard', avatar: '广州' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Ali Connors', avatar: '深圳' },
        { title: 'Cindy Baker', avatar: '北京' }
      ],
      itemscopy: []
    }
  },
  watch: {
    searchvalue (val, oldVal) {
      if (val) {
        this.itemscopy = this.items.filter((obj) => {
          return obj.title.indexOf(val) !== -1
        })
      } else {
        this.itemscopy = this.items
      }
    }
  },
  mounted () {
    this.itemscopy = this.items
  },
  methods: {
    handleSearchClick () {
      this.items = this.items.filter((obj) => {
        return obj.title.indexOf(this.searchvalue) !== -1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
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
}
.searchlist{
  margin-top: 48px;
}
</style>
