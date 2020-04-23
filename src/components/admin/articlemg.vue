<template>
  <div class="home">
    <div class="headerArea">
      <v-text-field
        label="输入文章相关信息"
        prepend-inner-icon="mdi-cloud-search-outline"
        solo
        v-model="searchvalue"
        clearable
        hide-details
        icon
      >
      <template v-slot:append>
        <v-btn
          icon
          @click="handleSearchClick"
        >
          <v-icon>mdi-table-search</v-icon>
        </v-btn>
      </template>
      </v-text-field>
    </div>

    <v-list
      class="searchlist"
      v-show="!wait"
      >
      <v-list-item
        v-for="(item, index) in this.$store.state.articlelist.adminlist"
        :key="item._id"
        class="list"
        style="border-bottom: 1px solid #eee"
        @click="handleDetailClick(item._id)"
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
export default {
  name: 'articlemg',
  props: {
    wait: Boolean
  },
  data () {
    return {
      searchvalue: '',
      items: []
    }
  },
  methods: {
    handleSearchClick () {
      this.$emit('changeValue', (this.searchvalue))
    },
    handleDetailClick (id) {
      this.$router.push({
        path: '/articledetail',
        query: {
          id,
          bgUrl: require('../../assets/wait.png')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  margin-top: 112px;
  padding: 0px 10px;
  .headerArea {
    margin-top: 56px;
    position: fixed;
    background: #fff;
    z-index: 2;
    top: 0;
    left: 0;
    height: 75px;
    width: 100%;
    padding: 15px 20px;
  }
  .searchlist{
    margin-top: 56px;
    margin-bottom: 56px;
  }
  .wait{
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 260px;
  }
}
</style>
