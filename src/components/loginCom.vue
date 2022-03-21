<template>
  <div class="w-login">
    <div class="login-top">
      <img src="~/@/assets/img/logo_top.png" alt="">
    </div>
    <div class="login-card">
      <div class="login-card-top">
        <span>
          <img src="~/@/assets/img/logo-small.png" alt="" style="width:30px;margin-right:6px;vertical-align: sub">
          {{title}}
        </span>
      </div>
      <div class="login-card-form" @keyup.enter="loginClick">
        <el-row>
          <el-input
            type = 'text'
            v-model="loginInfo.userId"
            placeholder="请输入用户名"
            prefix-icon="user"
          />
        </el-row>
        <el-row>
          <el-input
            type = 'password'
            v-model="loginInfo.password"
            placeholder="请输入密码"
            prefix-icon="lock"
          />
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-input
              v-model="loginInfo.validate"
              placeholder="请输入验证码"
              class="valid-input"
            />
          </el-col>
          <el-col :span="12" >
            <img :src="vaCodeUrl" alt="" style="width: 115px;margin: 7px 14px;" @click="updateVa">
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary" :loading="loginLoading" @click="loginClick">登录</el-button>
        </el-row>
        <el-row>
          <el-col :span="24" class="err-msg">
            {{ errorMsg }}
          </el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';

export default({
  props: {
    vaCodeUrl:{
      default:'',
      type:String
    },
    title:{
      default:'系统名称',
      type:String
    },
    defaultPwd:{
      default:'12345678',
      type:String
    },
  },
  emits: ['login', 'updateValidCode'],
  setup(props, { emit }) {
    const loginInfo = reactive({
      userId: '',
      password: '',
      validate: ''
    })
    let errorMsg = ref('');
    let loginLoading = ref(false);

    onMounted(() => {
      updateVa()
    })

    const regEmpty = (params, msg) => {
      if (params == '') {
        errorMsg.value = msg;
        return false;
      }
      return true;
    }
    const loginClick = () => {
      // 非空校验
      if (!regEmpty(loginInfo.userId, '用户名不能为空！')
          || !regEmpty(loginInfo.password, '密码不能为空！')
          || !regEmpty(loginInfo.validate, '验证码不能为空！')) return
      loginLoading.value = true;
      const params = {
        username: loginInfo.userId,
        password: loginInfo.password,
        code: loginInfo.validate,
      }
      emit('login', params);
    }
    const updateVa = () => {
      if (!props.vaCodeUrl) return
      emit('updateValidCode', 'code')
    }
    return {
      errorMsg,
      loginLoading,
      loginInfo,
      loginClick,
      updateVa
    }
  }
})
</script>

<style lang="less">
.w-login{
  height: 100%;
  width: 100%;

  .login-top {
    position: absolute;
    z-index: 2;
    height: 60px;
    background: rgba(16, 36, 89, 0.90);
    width: 100%;
    text-align: left;
    img{
      margin-top:10px;
      margin-left:20px;
    }
  }

  .login-card{
    width: 360px;
    height: 430px;
    background: rgba(11, 31, 77, 0.90);
    position: relative;
    margin-top: 210px;
    float: right;
    margin-right: 300px;
    border-bottom: 1px solid #00c497;

    .login-card-top{
      height: 76px;
      width: 100%;
      color: #fff;
      font-size: 28px;
      text-align: center;
      line-height: 70px;
      border-bottom: 1px solid #4d4d4d;
      span{
        font-family: langqian;
      }
    }

    .login-card-form{
      padding: 30px;
      input[type = 'text'], input[type = 'password'] {
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid rgba(255, 255, 255, 0.26);
        border-radius: 0;
        color: #fff;
        box-shadow: none;
        width: 100%;
        font-size: 14px;
        height: 42px;
        padding-left: 40px;
        margin: 8px 0;
      }
      .valid-input input{
        padding-left: 20px !important;
      }
      i{
        font-size: 22px;
      }
      button{
        width: 100%;
        height: 45px;
        border-radius: 0;
        margin-top: 25px;
        border:none;
        color: #fff;
        background: linear-gradient(to right, #0086c9, #00c497);
        transition: .3s all;
        &:hover{
          transition: .2s all;
          background: linear-gradient(to right, #19a0e7, #27e5b6);
        }
      }
      .err-msg {
        text-align:left;
        line-height: 30px;
        letter-spacing: 0.03em;
        color: #da2828;
        font-size:14px;
      }
    }
  }
}
</style>