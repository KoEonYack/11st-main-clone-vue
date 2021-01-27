<template>
  <div>
    <l-n-b></l-n-b>
    <my-header></my-header>
    <billboard></billboard>
    <global-banner></global-banner>
  </div>
</template>

<script>
import LNB from '~/src/components/LNB'
import MyHeader from '~/src/components/MyHeader'
import Billboard from '~/src/components/Billboard'
import GlobalBanner from '~/src/components/GlobalBanner'

export default {
  components: {
    LNB,
    MyHeader,
    Billboard,
    GlobalBanner
  }
}
</script>

<style lang="scss"> 
    @import "./scss/main.scss";
</style>