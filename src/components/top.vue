<template>
  <div class="app-top">
    <div class="top-left">
      <span>
        <img src="../assets/img/logo-small.png" alt="">
      </span>
      <span class="sysName">{{ sysName }}</span>
      <slot name="menu"></slot>
    </div>
    
    <div class="top-right">
      <slot name="user"></slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import config from "/src/config";
// import userHandle from './top/user-handle.vue';

export default ({
  setup() {
    const sysName = ref(config.sysTitle)
    return {
      sysName
    }
  }
})
</script>

<style lang="less">
.app-top {
  width:100%;
  height:100%;
  color: #fff;
  box-sizing: border-box;
  background-color: #090f2d;
  display: flex;
  justify-content: space-between;

  .top-left {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 27px;
    padding-left: 14px;
    
    img {
      width: 30px;
      margin-right: 8px;
      margin-top: 6px;
    }
    .sysName {
      font-family: "langqian";
    }
  }

  .top-right {
    margin-right: 20px;
  }
}
</style>