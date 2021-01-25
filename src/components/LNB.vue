<template>
  <div>
    <nav :class="{ show: isShowLNB }">
      <div class="user">
        <a href="javascript:void(0)">로그인</a>
        <div
          class="close-nav"
          @click="offNav"></div>
      </div>
    </nav>

    <!-- BACKGROUND -->
    <div
      v-if="isShowLNB"
      class="nav-bg"
      @click="offNav"></div>
  </div>
</template>

<script>
export default {
  computed: {
    isShowLNB () {
      // this.$store.state.네임스페이스.상태
      return this.$store.state.navigation.isShowLNB
    }
  },
  methods: {
    offNav () {
      this.$stroe.dispatch('navigation/offNav')
    }
  }
}
</script>

<style scoped lang="scss">
  nav {
    width: 300px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: #f6f6f6;
    transition: transform .4s;
    transform: translateX(-300px);
    &.show {
      transform: translateX(0);
    }
    .user {
      .close-nav {
        width: 36px;
        height: 36px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -261px -203px;
        background-size: 363px;
        cursor: pointer;
      }
    }
  }
  .nav-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, .2);
    z-index: 98;
  }
</style>