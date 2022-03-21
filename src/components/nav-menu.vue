<template>
  <div class="top-menu">
    <el-menu
      class="el-nav-menu"
      :default-active="activeItem"
      mode="horizontal"
      :ellipsis="false"
      background-color="#090f2d"
      text-color="#909391"
      active-text-color="#63bb90"
      @select="handleSelect"
    >
      <el-menu-item v-for="item in menuList" :key="item.name" :index="item.name">
        <el-icon><odometer /></el-icon>
        {{item.meta.title}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default ({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const parentName = 'home';
    const menuList = ref(router.options.routes.find(d=>d.name == parentName).children.filter(d=>!d.meta.hideInMenu));
  
    let activeItem = ref(route.name);
    watch(
      () => route.name,
      () => {
        handleSelect(route.name)
      }
    )
    const handleSelect = (item) => {
      if (item !== activeItem) {
        activeItem.value = item;
        router.push({name: item});
      }
    }

    return {
      activeItem,
      menuList,
      handleSelect
    }
  }
})
</script>

<style lang="less">
.top-menu {
  height: 100%;
  margin-left: 100px;

  .el-nav-menu {
    height: 100%;
    border: none;

    .el-menu-item {
      font-size: 16px;
      border-width: 3px;

      i{
        font-size: 22px;
        margin-right: 3px;
      }
    }
    .el-menu-item:not(.is-disabled):focus {
      color: #fff;
      // border: ;
    }
  }
}
</style>