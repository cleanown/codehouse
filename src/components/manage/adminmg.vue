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
      >
      <v-list-item
        v-for="(item, index) in this.$store.state.adminmg.adminlist"
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
  </div>
</template>

<script>
export default {
  name: 'adminmg',
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
        path: '/detail',
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
  padding: 10px;
  .headerArea {
    margin-top: 56px;
    position: fixed;
    background: #fff;
    z-index: 2;
    top: 0;
    left: 0;
    height: 78px;
    width: 100%;
    padding: 15px 20px;
  }
  .searchlist{
    margin-top: 56px;
  }
}
</style>
