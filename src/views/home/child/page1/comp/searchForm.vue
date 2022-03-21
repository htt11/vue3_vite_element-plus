<template>
  <div class="form">
    <el-form :inline="true" :model="formInline" class="search-form">
      <el-form-item label="提交时间">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          :shortcuts="shortcuts"
          start-placeholder="全部"
          end-placeholder="全部"
          @change="changeDate"
        />
      </el-form-item>
      <el-form-item label="提交人">
        <el-select v-model="formInline.user" placeholder="全部">
          <el-option label="全部" value="" />
          <el-option label="user" value="user" />
        </el-select>
      </el-form-item>
      <el-form-item label="IOC值">
        <el-input v-model="formInline.ioc" placeholder="全部" />
      </el-form-item>
      <el-form-item label="IOC类型">
        <el-select v-model="formInline.iocType" placeholder="全部">
          <el-option label="全部" value="all" />
        </el-select>
      </el-form-item>
      <el-form-item label="恶意类型">
        <el-input v-model="formInline.maliciousType" placeholder="全部" />
      </el-form-item>
      <el-form-item label="恶意家族">
        <el-input v-model="formInline.maliciousFamily" placeholder="全部" />
      </el-form-item>
      <el-form-item label="TLP">
        <el-input v-model="formInline.tlp" placeholder="全部" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>

      <el-form-item style="float: right;margin-right: 0;">
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import config from '@/config';

export default ({
  setup(props, { emit }) {
    const dateRange = ref('');
    const formInline = reactive({
      startTime: '',
      endTime: '',
      user: '',
      ioc: '',
      iocType: '',
      maliciousType: '',
      maliciousFamily: '',
      tip: '',
      page: 1,
      pageSize: 13
    })

    const shortcuts = config.shortcuts;
    const changeDate = (date) => {
      formInline.startTime = new Date(date[0]).getTime();
      formInline.endTime = new Date(date[1]).getTime();
    }

    const onSearch = () => {
      emit('onSearch', formInline)
    }

    return {
      dateRange,
      formInline,
      shortcuts,
      changeDate,
      onSearch
    }
  }
})
</script>

<style lang="less">
.form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: end;

  .search-form {
    width: 100%;
  }
}
</style>