<template>
  <div class="home-page">
    <el-container class="home-container">
      <el-header height="64px" style="padding: 0">
        <top>
          <template v-slot:menu>
            <nav-menu></nav-menu>
          </template>

          <template v-slot:user>
            <user-handle></user-handle>
          </template>          
        </top>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import Top from '@/components/top.vue';
import NavMenu from '@/components/nav-menu.vue';
import UserHandle from '@/components/user-handle.vue';

export default ({
  components: { Top, NavMenu, UserHandle },
  setup() {
    const store = useStore();
    const curUserName = store.state.userName;

    return {
      curUserName
    }
  }
})
</script>

<style lang="less">
.home-page {
  width: 100%;
  height: 100%;
}
</style>