<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑"
    width="30%"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue';

export default ({
  setup() {
    const dialogVisible = ref(false);

    return {
      dialogVisible
    }
  }
})
</script>

<style scoped lang="less"></style>