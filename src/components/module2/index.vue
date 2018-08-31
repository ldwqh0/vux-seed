<template>
  <div>
    <h1>示例页面2</h1>
    <h2>
      <a href="https://vux.li" style="color: red;" target="_blank">Vux资料请点击这里</a>
    </h2>
    <group>
      <x-input title="姓名" :is-type="be1233" v-model="user.name"/>
      <x-input v-model="user.age"/>
    </group>
  </div>
</template>
<script>
  import { Component } from 'vue-property-decorator'
  import { Group, XInput } from 'vux'
  import Vue from 'vue'

  @Component({
    components: {
      Group,
      XInput
    }
  })
  export default class Module2 extends Vue {
    user = {
      name: '张三',
      age: 14
    }

    be1233 (val) {
      return {
        valid: val === '1233',
        msg: 'the value is error'
      }
    }
  }

</script>
<style>

</style>
