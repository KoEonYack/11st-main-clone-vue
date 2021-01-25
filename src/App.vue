<template>
  <div>
    <l-n-b></l-n-b>
    <my-header></my-header>
  </div>
</template>

<script>
import LNB from '~/src/components/LNB'
import MyHeader from '~/src/components/MyHeader'

export default {
  components: {
    LNB,
    MyHeader
  }
}
</script>

<style lang="scss"> 
    @import "./scss/main.scss";
    
    .container {
        display: flex;
        .item {
            width: 100px;
            height: 100px;
            background-color: red;
        }
    }
</style>