<template>
  <div class="table">
    <el-table :data="data" v-loading="loading" border @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column 
        v-for="item in columns"
        :prop="item.key"
        :label="item.label"
        :width="item.width"
      />
      <el-table-column label="操作" width="200">
        <template #default>
          <div class="table_handle">
            <el-tooltip effect="light" content="编辑">
              <el-button type="text" icon="Edit" @click="onEdit" />
            </el-tooltip>
            <el-tooltip effect="light" content="删除">
              <el-button type="text" icon="Delete" />
            </el-tooltip>
            <el-tooltip effect="light" content="详情">
              <el-button type="text" icon="Document"/>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <edit ref="editDialog"></edit>
  </div>
</template>

<script>
import { ref } from 'vue';
import Edit from './dialog/edit.vue';

export default ({
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: { Edit },
  setup(props, { emit }) {
    const handleSelectionChange = (val) => {
      const data = val.map(d => d.name);
      emit('changeSelected', data)
    }

    const editDialog = ref(null);
    const onEdit = () => {
      editDialog.value.dialogVisible = true;
    }

    return {
      editDialog,
      onEdit,
      handleSelectionChange
      
    }
  }
})
</script>

<style lang="less">
.table {
  .table_handle i {
    font-size: 20px;
  }
}
</style>