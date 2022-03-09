<template>
  <div>
    <simu-pannel></simu-pannel>
    <router-view></router-view>
  </div>
</template>

<script>
import Pannel from '@/components/Pannel'

export default {
  name: 'home',
  components: {
    'simu-pannel': Pannel
  }
}
</script>

<style lang="scss" scoped>
</style>
