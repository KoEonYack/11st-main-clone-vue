<template>
  <div>
    <header>
      <div class="inner">
        <div
          class="open-nav-drawer"
          @click="onNav"></div>
        <a
          href="javascript:void(0)"
          class="logo"></a>
      </div>
    </header>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        onNav() {
            // Open LNB
            this.$store.dispatch('navigation/onNav') // navigation파일 안에 onNav를 실행한다. 
        }
    }
}
</script>

<style scoped lang="scss">
  header {
    .inner {
      .open-nav-drawer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 
          0 2px 6px rgba(#000, .06),
          0 0 1px rgba(#000, .4);
        &::after {
          content: "";
          display: block;
          width: 36px;
          height: 36px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-position: -302px -203px;
          background-size: 363px;
        }
      }
      .logo {
        display: block;
        width: 94px;
        height: 40px;
        // margin: 0 24px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -162px 0;
        background-size: 363px;
        cursor: pointer;
      }
    }
  }
</style>