<template>
  <div>
    <l-n-b></l-n-b>
    <my-header></my-header>
    <billboard></billboard>
  </div>
</template>

<script>
import LNB from '~/src/components/LNB'
import MyHeader from '~/src/components/MyHeader'
import Billboard from '~/src/components/Billboard'

export default {
  components: {
    LNB,
    MyHeader,
    Billboard
  }
}
</script>

<style lang="scss"> 
    @import "./scss/main.scss";
</style>