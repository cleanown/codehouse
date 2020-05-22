<template>
  <v-carousel
    :cycle="cycle"
    height="400"
    continuous
    hide-delimiter-background
    v-model="model"
    show-arrows-on-hover
    :show-arrows="false"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      @click="carouselClose"
    >
      <v-img :src="slide"/>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'carousels',
  props: {
    company: Object,
    index: Number
  },
  data () {
    return {
      cycle: false,
      slides: this.company.imgs,
      model: this.index
    }
  },
  methods: {
    carouselClose () {
      this.$emit('carouselClose')
    }
  }
}
</script>
