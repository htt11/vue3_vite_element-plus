<template>
  <div class="home-page1">
    <search-form @onSearch="onSearch">
      <el-button @click="onDeleteSome" :disabled="!isShowDelBut">批量删除</el-button>
      <el-button @click="onAdd" type="primary" plain>新建</el-button>
    </search-form>

    <table-list 
      :columns="columns" 
      :data="tableData" 
      :loading="tableLoading" @changeSelected="changeSelected"></table-list>

    <div class="page">
      <el-pagination 
        layout="prev, pager, next" 
        :page-size="pageSize" 
        :total="total" 
        v-model:current-page="curPage"
        @current-change="changePage" />
    </div>

    <add-dialog ref="addDialog"></add-dialog>
    
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import searchForm from './comp/searchForm.vue';
import TableList from './comp/tableList.vue';
import addDialog from './comp/dialog/add.vue'

export default ({
  components: { searchForm, TableList, addDialog },
  setup() {
    const columns = [
      {key: 'date' , label:'Date', width: 200},
      {key: 'name' , label:'Name'},
      {key: 'address' , label:'Address'}
    ]
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Lili',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04', 
        name: 'Daly',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Bob',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]

    const curPage = ref(1);
    const pageSize = ref(2);
    const total = ref(4);
    const curSearchParams =ref({});
    const tableLoading = ref(false);

    const onSearch = (params) => {
      console.log('发送请求，进行查询......');
      // console.log(params);
      tableLoading.value = true;
      curSearchParams.value = params;
      curPage.value = params.page;
      setTimeout(() => {
        // 请求完成
        tableLoading.value = false;
      }, 2000);
    }

    const changePage = (page) => {
      curSearchParams.value.page = page;
      onSearch(curSearchParams.value);
    }

    
    const selectedIds = ref([]);
    const isShowDelBut = ref(0);
    const changeSelected = (data) => {
      isShowDelBut.value = data.length;
      selectedIds.value = data;
    }
    const onDeleteSome = () => {
      // 删除一些数据
      console.log('需要删除的数据为：' + selectedIds.value);
    }

    const addDialog = ref(null);
    const onAdd = () => {
      addDialog.value.dialogVisible = true;
    }

    return {
      columns,
      tableData,
      curPage,
      pageSize,
      total,
      tableLoading,
      selectedIds,
      isShowDelBut,
      addDialog,
      onSearch,
      changePage,
      changeSelected,
      onDeleteSome,
      onAdd
    }
  }
})
</script>

<style scoped lang="less">
.home-page1 {
  .page {
    display: flex;
    justify-content: flex-end;
  }
}
</style>