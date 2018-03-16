<template>
  <div id="app">
    <!--<loading v-model="loading"/>-->
    <view-box>
      <router-view/>
      <tabbar>
        <tabbar-item link="/">
          <img slot="icon" src="./assets/btn.png">
          <span slot="label">页面一</span>
        </tabbar-item>
        <tabbar-item link="/p2">
          <img slot="icon" src="./assets/btn.png">
          <span slot="label">页面二</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import { Loading, ViewBox, Tabbar, TabbarItem } from 'vux'
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component({
    components: {
      Loading,
      ViewBox,
      Tabbar,
      TabbarItem
    },
    name: 'App'
  })
  export default class extends Vue {
    get loading () {
      return this.$store.state.loadingCount > 0
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset';
  @import './themes/defatult';

  body {
    background-color: #fbf9fe;
  }
</style>
