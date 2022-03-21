<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="30%">
    <div>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" />
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPwd">
          <el-input v-model="form.repeatPwd" type="password" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onOk()" >确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'

export default ({
  props: {
  },
  setup() {
    const store = useStore();
    const dialogVisible = ref(false);
    const form = reactive({
      // userId,
      password:'',
      newPassword:'',
      repeatPwd:''
    })

    const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/;
    const pwdValidate = (rule,value,callback) => {
      if (value) {
        if(reg.test(value)){
          callback();
        }else{
          callback();
          // callback(new Error('密码长度应为8-16位，需含有大小写字母、数字和特殊符号'));
        }
      } else {
        callback(new Error('新密码不能为空'));
      }
    }
    const rptValidate = (rule,value,callback)=>{
      if(value.length){
        if(value == form.newPassword){
          callback();
        }else{
          callback(new Error('重复密码与新密码不一致'));
        }
      }else{
        callback(new Error('请重复输入新密码'));
      }
    }
    const rules = reactive({
      password: [
        { required: true, message: '原密码不能为空', trigger: 'blur' }
      ],
      newPassword: [
        { required: true, validator: pwdValidate, trigger: 'blur' }
      ],
      repeatPwd: [
        { required: true, validator: rptValidate, trigger: 'blur' }
      ]
    })
    
    const ruleFormRef = ref();
    const onOk = () => {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          const query = {
            id: store.state.userId,
            password: form.password,
            newPassword: form.newPassword
          }
          console.log(query);
          api.changePassword(query).then(res => {
            const data = res.data;
            if (data.status == 200) {
              ElMessage({
                message: '密码修改成功',
                type: 'success',
              })
              onCancel();
            } else {
              ElMessage({
                message: '密码修改失败:' + data.msg,
                type: 'success',
              })
            }
          })
        } else {
          console.log('error submit!');
        }
      })
    }
    const onCancel = () => {
      dialogVisible.value = false;
      ruleFormRef.value.resetFields();
    }

    return {
      dialogVisible,
      form,
      rules,
      ruleFormRef,
      onOk,
      onCancel
    }
  }
})
</script>

<style scoped lang="less"></style>