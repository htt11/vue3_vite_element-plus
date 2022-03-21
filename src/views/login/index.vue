<template>
  <div class="login-page">
    <loginCom ref="loginCom" 
              title="邮件数据关联分析系统" 
              :default-pwd="defaultPwd" 
              :va-code-url="vaCodeUrl"
              @login="login"
              @updateValidCode="updateValidCode"
    ></loginCom>

    <change-pwd ref="changePwd" ></change-pwd>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import api from '@/api/user';

import loginCom from '@/components/loginCom.vue';
import ChangePwd from '@/components/changePwd.vue';

export default {
  components: { loginCom, ChangePwd },
  setup() {
    const store = useStore();
    let router = useRouter();
    const loginCom = ref(null);
    const defaultPwd = ref('12345678');
    let vaCodeUrl = ref('ws/user/getValidateCode');

    const changePwd = ref(null);
    function login({userId,password,code}) {
      api.login(arguments[0]).then(data => {
        if(data.status == 200){
          if (password == defaultPwd.value) {
            changePwd.value.dialogVisible = true;
          }
          saveUserStatus(data);
        } else {
          loginCom.value.errorMsg = '';
          loginCom.value.loginInfo.validate = '';
          updateValidCode();
        }
      }).finally(() => {
        loginCom.value.loginLoading = false;
      })
    }
    function saveUserStatus(data) {
      localStorage.userName = data.data.username;
      localStorage.userId = data.data.userId;
      localStorage.token = data.token;
      store.commit('getToken',data.token);
      store.commit('getUserInfo',data.data);
      router.push('/home');
    }
    function updateValidCode() {
      const arg = new Date().getTime();
      vaCodeUrl.value = (vaCodeUrl.value).split('?')[0] + '?' + arg;
    }
    return {
      loginCom,
      defaultPwd,
      vaCodeUrl,
      changePwd,
      login,
      updateValidCode
    }
  }
}
</script>

<style lang="less">
.login-page{
  width:100%;
  height:100%;
  background: url("../../assets/img/login-bg.png") no-repeat;
  background-size: 100%;
}
</style>