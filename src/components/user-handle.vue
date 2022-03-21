<template>
  <div class="user_handle">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-icon size="22px"><user /></el-icon>
        <span> {{userName}}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="openChangePwd">修改密码</el-dropdown-item>
          <el-dropdown-item @click="outLogin" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <change-pwd ref="changePwd" ></change-pwd>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/user';
import ChangePwd from '@/components/changePwd.vue';

export default ({
  components: { ChangePwd },
  setup() {
    const router = useRouter();
    const userName = ref('testUser');

    const changePwd = ref(null);
    const openChangePwd = () => {
      changePwd.value.dialogVisible = true;
    }
    const outLogin = () => {
      // api.logout();
      router.push('/login');
    }

    return {
      changePwd,
      userName,
      openChangePwd,
      outLogin
    }
  }
})
</script>

<style lang="less">
.user_handle {
  height: 100%;
  // min-width: 120px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.64) ;

    i {
      margin-right: 5px;
    }
  }
}
</style>