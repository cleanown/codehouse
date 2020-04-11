<template>
  <div>
    <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="overlays"
      :z-index="zIndex"
      >
      <v-btn
        color="primary"
        @click="overlays"
      >
        Hide Overlay
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'overlays',
  data () {
    return {
      absolute: false,
      opacity: 0.46,
      zIndex: 5,
      overlays: false
    }
  }
}
</script>

<style>

</style>
