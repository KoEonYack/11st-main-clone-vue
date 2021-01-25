<template>
  <div>
    <nav v-if="isShowLNB">
      Navigation!
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    isShowLNB () {
      // this.$store.state.네임스페이스.상태
      return this.$store.state.navigation.isShowLNB
    }
  }
}
</script>