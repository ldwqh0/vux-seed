<template>
  <div id="app">
    <!--<loading v-model="loading"/>-->
    <router-view/>
  </div>
</template>

<script>
  import Loading from 'vux/src/components/loading/index'
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component({
    components: {Loading},
    name: 'App'
  })
  export default class extends Vue {
    get loading () {
      return this.$store.state.loadingCount > 0
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import './themes/defatult';

  body {
    background-color: #fbf9fe;
  }
</style>
