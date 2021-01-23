<template>
  <div class="container">
    <div class="item"></div>
    <!-- <div v-if="message" class="item"></div> -->
  </div>
</template>

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